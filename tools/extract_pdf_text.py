from __future__ import annotations

import argparse
import base64
import re
import sys
import zlib
from pathlib import Path


STREAM_RE = re.compile(
    rb"\b(?P<object>\d+)\s+\d+\s+obj\s*(?P<dict>(?:(?!\bendobj\b).)*?)\s*stream\r?\n(?P<data>.*?)(?:\r?\n)?endstream",
    re.DOTALL,
)


def decode_pdf_string(value: bytes) -> str:
    out = bytearray()
    i = 0
    while i < len(value):
        ch = value[i]
        if ch != 0x5C:
            out.append(ch)
            i += 1
            continue

        i += 1
        if i >= len(value):
            break

        esc = value[i]
        i += 1
        if esc in b"nrtbf":
            out.append({ord("n"): 10, ord("r"): 13, ord("t"): 9, ord("b"): 8, ord("f"): 12}[esc])
        elif esc in b"()\\":
            out.append(esc)
        elif 48 <= esc <= 55:
            octal = bytes([esc])
            for _ in range(2):
                if i < len(value) and 48 <= value[i] <= 55:
                    octal += bytes([value[i]])
                    i += 1
            out.append(int(octal, 8))
        elif esc in (10, 13):
            if esc == 13 and i < len(value) and value[i] == 10:
                i += 1
        else:
            out.append(esc)

    try:
        return out.decode("utf-8")
    except UnicodeDecodeError:
        return out.decode("cp1252", errors="replace")


def iter_literal_strings(content: bytes):
    i = 0
    while i < len(content):
        if content[i] != ord("("):
            i += 1
            continue

        start = i + 1
        depth = 1
        i += 1
        escaped = False
        buf = bytearray()
        while i < len(content) and depth:
            ch = content[i]
            if escaped:
                buf.extend(b"\\" + bytes([ch]))
                escaped = False
            elif ch == ord("\\"):
                escaped = True
            elif ch == ord("("):
                depth += 1
                buf.append(ch)
            elif ch == ord(")"):
                depth -= 1
                if depth:
                    buf.append(ch)
            else:
                buf.append(ch)
            i += 1

        if depth == 0 and i > start:
            yield decode_pdf_string(bytes(buf))


def hex_to_text(hex_value: bytes) -> str:
    hex_value = re.sub(rb"\s+", b"", hex_value)
    if not hex_value:
        return ""
    if len(hex_value) % 2:
        hex_value += b"0"
    try:
        raw = bytes.fromhex(hex_value.decode("ascii"))
    except ValueError:
        return ""
    if len(raw) >= 2 and raw[:2] in (b"\xfe\xff", b"\xff\xfe"):
        return raw.decode("utf-16", errors="ignore")
    if len(raw) % 2 == 0 and any(raw[::2]):
        decoded = raw.decode("utf-16-be", errors="ignore")
        if decoded:
            return decoded
    return raw.decode("latin-1", errors="ignore")


def iter_hex_strings(content: bytes, cmap: dict[int, str] | None = None):
    for match in re.finditer(rb"<([0-9A-Fa-f\s]+)>", content):
        hex_value = re.sub(rb"\s+", b"", match.group(1))
        if not hex_value or len(hex_value) < 2:
            continue
        if cmap and len(hex_value) % 4 == 0:
            chars: list[str] = []
            for i in range(0, len(hex_value), 4):
                code = int(hex_value[i : i + 4], 16)
                chars.append(cmap.get(code, chr(code)))
            yield "".join(chars)
        else:
            yield hex_to_text(hex_value)


def decode_stream(stream_dict: bytes, data: bytes) -> bytes:
    decoded = data
    filters = re.findall(rb"/([A-Za-z0-9]+Decode)", stream_dict)
    for name in filters:
        if name == b"ASCII85Decode":
            try:
                decoded = base64.a85decode(decoded, adobe=True)
            except ValueError:
                decoded = base64.a85decode(decoded, adobe=False)
        elif name == b"FlateDecode":
            decoded = zlib.decompress(decoded)
        else:
            return b""
    return decoded


def parse_unicode_value(value: bytes) -> str:
    raw = bytes.fromhex(value.decode("ascii"))
    if len(raw) == 1:
        return chr(raw[0])
    return raw.decode("utf-16-be", errors="ignore")


def parse_cmap(content: bytes) -> dict[int, str]:
    mapping: dict[int, str] = {}

    for block in re.findall(rb"beginbfchar\s*(.*?)\s*endbfchar", content, re.DOTALL):
        for source, dest in re.findall(rb"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>", block):
            mapping[int(source, 16)] = parse_unicode_value(dest)

    for block in re.findall(rb"beginbfrange\s*(.*?)\s*endbfrange", content, re.DOTALL):
        for source_start, source_end, dest in re.findall(
            rb"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*(?:<([0-9A-Fa-f]+)>|\[[^\]]+\])",
            block,
        ):
            if not dest:
                continue
            start = int(source_start, 16)
            end = int(source_end, 16)
            dest_start = int(dest, 16)
            for offset, code in enumerate(range(start, end + 1)):
                mapping[code] = parse_unicode_value(f"{dest_start + offset:04X}".encode("ascii"))

    return mapping


def decoded_streams(raw: bytes):
    for match in STREAM_RE.finditer(raw):
        stream_dict = match.group("dict")
        try:
            decoded = decode_stream(stream_dict, match.group("data"))
        except Exception:
            continue
        yield stream_dict, decoded


def extract_text(path: Path) -> str:
    raw = path.read_bytes()
    pieces: list[str] = []
    cmap: dict[int, str] = {}

    metadata = re.findall(rb"/(?:Title|Author|Subject|Creator)\s*\((.*?)\)", raw, re.DOTALL)
    pieces.extend(decode_pdf_string(item) for item in metadata)

    for _, decoded in decoded_streams(raw):
        if b"beginbfchar" in decoded or b"beginbfrange" in decoded:
            cmap.update(parse_cmap(decoded))

    for stream_dict, decoded in decoded_streams(raw):
        if re.search(rb"/Subtype\s*/Image\b", stream_dict):
            continue
        if b"BT" not in decoded and b"Tj" not in decoded and b"TJ" not in decoded:
            continue

        text_bits = []
        text_bits.extend(iter_literal_strings(decoded))
        text_bits.extend(iter_hex_strings(decoded, cmap))
        if text_bits:
            if len(text_bits) > 20 and sum(len(bit) <= 1 for bit in text_bits) / len(text_bits) > 0.75:
                pieces.append("".join(text_bits))
            else:
                pieces.append("\n".join(text_bits))

    text = "\n".join(pieces)
    text = re.sub(r"\n\((anonymous|unspecified)\n?", "\n", text)
    text = re.sub(r"(?<=\w)(?=[A-Z][a-z]+(?:\s|$))", "\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    parser = argparse.ArgumentParser()
    parser.add_argument("paths", nargs="+", type=Path)
    args = parser.parse_args()

    for path in args.paths:
        print(f"\n{'=' * 24} {path.name} {'=' * 24}")
        print(extract_text(path))
    return 0


if __name__ == "__main__":
    sys.exit(main())

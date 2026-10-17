"use client";

import { useEffect, useRef } from "react";

type Rgb = [number, number, number];

type Star = {
  x: number;
  y: number;
  radius: number;
  phase: number;
  warmth: number;
};

type Meteor = {
  x: number;
  y: number;
  delay: number;
  speed: number;
  length: number;
};

type Flight = {
  y: number;
  delay: number;
  speed: number;
  size: number;
  reverse: boolean;
};

type Building = {
  x: number;
  width: number;
  height: number;
  seed: number;
};

type NodePoint = {
  x: number;
  y: number;
  radius: number;
  phase: number;
  label: string;
};

const labels = ["SQL", "KPI", "DAX", "BI", "PY", "EDA"];

function seededRandom(seed: number) {
  const value = Math.sin(seed * 9321.17) * 10000;
  return value - Math.floor(value);
}

function hexToRgb(value: string, fallback: Rgb): Rgb {
  const normalized = value.trim().replace("#", "");
  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => character + character)
          .join("")
      : normalized;

  if (hex.length !== 6) {
    return fallback;
  }

  const parsed = Number.parseInt(hex, 16);
  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255];
}

function rgba([red, green, blue]: Rgb, alpha: number) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function moonPhase(date: Date) {
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const synodicMonth = 29.530588853;
  const days = (date.getTime() - knownNewMoon) / 86400000;
  return ((days % synodicMonth) + synodicMonth) % synodicMonth / synodicMonth;
}

export function DubaiNightSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phase = moonPhase(new Date());
    let animationFrame = 0;
    let reducedMotion = motionQuery.matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let primary: Rgb = [56, 189, 248];
    let accent: Rgb = [245, 158, 11];
    let scrollProgress = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let flights: Flight[] = [];
    let buildings: Building[] = [];
    let nodes: NodePoint[] = [];

    const syncColors = () => {
      const styles = window.getComputedStyle(document.documentElement);
      primary = hexToRgb(styles.getPropertyValue("--color-primary"), [56, 189, 248]);
      accent = hexToRgb(styles.getPropertyValue("--color-accent"), [245, 158, 11]);
    };

    const createScene = () => {
      const starCount = Math.min(150, Math.max(76, Math.floor((width * height) / 9600)));
      stars = Array.from({ length: starCount }, (_, index) => ({
        x: seededRandom(index + 1),
        y: seededRandom(index + 3) * 0.72,
        radius: 0.55 + seededRandom(index + 9) * 1.55,
        phase: seededRandom(index + 13) * Math.PI * 2,
        warmth: seededRandom(index + 17)
      }));

      meteors = Array.from({ length: width < 760 ? 3 : 5 }, (_, index) => ({
        x: 0.18 + seededRandom(index + 41) * 0.76,
        y: 0.05 + seededRandom(index + 47) * 0.34,
        delay: seededRandom(index + 53) * 7000,
        speed: 5600 + seededRandom(index + 59) * 4200,
        length: 90 + seededRandom(index + 61) * 92
      }));

      flights = [
        { y: 0.18, delay: 0, speed: 34000, size: 1, reverse: false },
        { y: 0.29, delay: 11000, speed: 42000, size: 0.82, reverse: true }
      ];

      let cursor = -0.04;
      let seed = 100;
      buildings = [];

      while (cursor < 1.05) {
        const buildingWidth = 0.018 + seededRandom(seed + 1) * 0.028;
        buildings.push({
          x: cursor,
          width: buildingWidth,
          height: 0.07 + seededRandom(seed + 2) * 0.14,
          seed
        });
        cursor += buildingWidth + 0.004 + seededRandom(seed + 3) * 0.011;
        seed += 7;
      }

      nodes = Array.from({ length: width < 760 ? 12 : 22 }, (_, index) => ({
        x: 0.08 + seededRandom(index + 201) * 0.84,
        y: 0.18 + seededRandom(index + 211) * 0.46,
        radius: 1.1 + seededRandom(index + 223) * 1.8,
        phase: seededRandom(index + 229) * Math.PI * 2,
        label: labels[index % labels.length]
      }));
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createScene();
    };

    const updateScrollProgress = () => {
      const maxScroll = Math.max(window.innerHeight * 2.4, 1);
      scrollProgress = Math.min(window.scrollY / maxScroll, 1);
    };

    const drawMoon = () => {
      const radius = Math.max(28, Math.min(58, width * 0.038)) * (1 + scrollProgress * 0.16);
      const xBase = width < 760 ? width * 0.86 : width * 0.84;
      const yBase = height < 740 ? height * 0.14 : height * 0.16;
      const x = xBase - width * 0.15 * scrollProgress;
      const y = yBase + height * 0.12 * scrollProgress;
      const lit = phase <= 0.5 ? phase / 0.5 : (1 - phase) / 0.5;

      const glow = context.createRadialGradient(x, y, radius * 0.2, x, y, radius * 3.1);
      glow.addColorStop(0, "rgba(255, 239, 184, 0.28)");
      glow.addColorStop(0.35, "rgba(245, 158, 11, 0.08)");
      glow.addColorStop(1, "rgba(245, 158, 11, 0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, radius * 3.1, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.clip();
      context.fillStyle = "rgba(111, 131, 151, 0.26)";
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      context.fillStyle = "rgba(255, 238, 196, 0.9)";

      if (phase <= 0.5) {
        const start = x + radius - lit * radius * 2;
        context.fillRect(start, y - radius, x + radius - start, radius * 2);
      } else {
        const end = x - radius + lit * radius * 2;
        context.fillRect(x - radius, y - radius, end - (x - radius), radius * 2);
      }

      const shade = context.createRadialGradient(x - radius * 0.35, y - radius * 0.35, 1, x, y, radius);
      shade.addColorStop(0, "rgba(255, 255, 255, 0.2)");
      shade.addColorStop(0.58, "rgba(0, 0, 0, 0)");
      shade.addColorStop(1, "rgba(0, 0, 0, 0.34)");
      context.fillStyle = shade;
      context.fillRect(x - radius, y - radius, radius * 2, radius * 2);

      const craters = [
        [-0.28, -0.2, 0.12],
        [0.16, -0.28, 0.08],
        [0.28, 0.12, 0.1],
        [-0.1, 0.24, 0.07],
        [0.02, 0.02, 0.045]
      ];

      craters.forEach(([cx, cy, size]) => {
        const craterX = x + cx * radius;
        const craterY = y + cy * radius;
        const craterRadius = size * radius;
        const crater = context.createRadialGradient(craterX - craterRadius * 0.28, craterY - craterRadius * 0.28, 1, craterX, craterY, craterRadius);
        crater.addColorStop(0, "rgba(255, 255, 255, 0.14)");
        crater.addColorStop(0.62, "rgba(92, 98, 110, 0.18)");
        crater.addColorStop(1, "rgba(10, 14, 22, 0.22)");
        context.fillStyle = crater;
        context.beginPath();
        context.arc(craterX, craterY, craterRadius, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();

      context.strokeStyle = "rgba(255, 240, 202, 0.4)";
      context.lineWidth = 1;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.stroke();
    };

    const drawStars = (time: number) => {
      stars.forEach((star) => {
        const alpha = 0.22 + Math.sin(time * 0.0011 + star.phase) * 0.22 + star.warmth * 0.28;
        const color = star.warmth > 0.78 ? accent : [226, 247, 255] as Rgb;
        context.fillStyle = rgba(color, Math.max(0.08, Math.min(0.85, alpha)));
        context.shadowColor = rgba(color, 0.5);
        context.shadowBlur = star.radius * 5;
        context.beginPath();
        context.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.shadowBlur = 0;
    };

    const drawMeteors = (time: number) => {
      meteors.forEach((meteor) => {
        const cycle = ((time + meteor.delay) % meteor.speed) / meteor.speed;
        const intensity = cycle < 0.16 ? Math.sin((cycle / 0.16) * Math.PI) : 0;

        if (intensity <= 0) {
          return;
        }

        const x = meteor.x * width + cycle * width * 0.38;
        const y = meteor.y * height + cycle * height * 0.22;
        const gradient = context.createLinearGradient(x, y, x - meteor.length, y - meteor.length * 0.34);
        gradient.addColorStop(0, `rgba(255, 246, 214, ${0.8 * intensity})`);
        gradient.addColorStop(0.28, rgba(accent, 0.42 * intensity));
        gradient.addColorStop(1, "rgba(255, 246, 214, 0)");

        context.strokeStyle = gradient;
        context.lineWidth = 1.4;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - meteor.length, y - meteor.length * 0.34);
        context.stroke();
      });
    };

    const drawFlights = (time: number) => {
      flights.forEach((flight, index) => {
        const progress = ((time + flight.delay) % flight.speed) / flight.speed;
        const rawX = -120 + progress * (width + 240);
        const x = flight.reverse ? width - rawX : rawX;
        const y = flight.y * height + Math.sin(progress * Math.PI * 2 + index) * 16;
        const trailLength = 118 * flight.size;
        const direction = flight.reverse ? 1 : -1;

        const trail = context.createLinearGradient(x, y, x + direction * trailLength, y - 5);
        trail.addColorStop(0, "rgba(255, 239, 184, 0.42)");
        trail.addColorStop(1, "rgba(255, 239, 184, 0)");
        context.strokeStyle = trail;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + direction * trailLength, y - 5);
        context.stroke();

        context.save();
        context.translate(x, y);
        context.scale(flight.reverse ? -flight.size : flight.size, flight.size);
        context.fillStyle = "rgba(230, 248, 255, 0.76)";
        context.beginPath();
        context.moveTo(8, 0);
        context.lineTo(-8, -3);
        context.lineTo(-4, 0);
        context.lineTo(-8, 3);
        context.closePath();
        context.fill();
        context.fillStyle = time % 900 < 450 ? rgba(accent, 0.9) : rgba(primary, 0.78);
        context.beginPath();
        context.arc(-9, 0, 2, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });
    };

    const drawDataConstellation = (time: number) => {
      const maxDistance = width < 760 ? 88 : 132;

      for (let index = 0; index < nodes.length; index += 1) {
        const current = nodes[index];
        const cx = current.x * width;
        const cy = current.y * height;

        for (let nextIndex = index + 1; nextIndex < nodes.length; nextIndex += 1) {
          const next = nodes[nextIndex];
          const nx = next.x * width;
          const ny = next.y * height;
          const dx = cx - nx;
          const dy = cy - ny;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            context.strokeStyle = rgba(primary, (1 - distance / maxDistance) * 0.13);
            context.lineWidth = 0.8;
            context.beginPath();
            context.moveTo(cx, cy);
            context.lineTo(nx, ny);
            context.stroke();
          }
        }
      }

      nodes.forEach((node, index) => {
        const x = node.x * width;
        const y = node.y * height;
        const pulse = 0.55 + Math.sin(time * 0.0016 + node.phase) * 0.32;
        context.fillStyle = index % 4 === 0 ? rgba(accent, 0.24 + pulse * 0.28) : rgba(primary, 0.18 + pulse * 0.26);
        context.shadowColor = index % 4 === 0 ? rgba(accent, 0.72) : rgba(primary, 0.58);
        context.shadowBlur = 10;
        context.beginPath();
        context.arc(x, y, node.radius, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

        if (width > 880 && index % 7 === 0) {
          context.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          context.fillStyle = rgba(primary, 0.32);
          context.fillText(node.label, x + 8, y - 8);
        }
      });
    };

    const drawDashboardPanel = (time: number) => {
      if (width < 980 || height < 720) {
        return;
      }

      const x = width * 0.07;
      const y = height * 0.58;
      const panelWidth = 188;
      const panelHeight = 92;

      context.save();
      context.globalAlpha = 0.48 + scrollProgress * 0.4;
      context.fillStyle = "rgba(5, 15, 22, 0.34)";
      context.strokeStyle = rgba(primary, 0.16);
      context.lineWidth = 1;
      context.beginPath();
      context.roundRect(x, y, panelWidth, panelHeight, 14);
      context.fill();
      context.stroke();

      context.font = "10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      context.fillStyle = rgba(accent, 0.7);
      context.fillText("KPI / Dubai Ops", x + 16, y + 22);

      for (let bar = 0; bar < 7; bar += 1) {
        const barHeight = 18 + Math.sin(time * 0.001 + bar * 0.9) * 9 + seededRandom(bar + 301) * 18;
        context.fillStyle = bar % 2 ? rgba(primary, 0.46) : rgba(accent, 0.42);
        context.fillRect(x + 18 + bar * 22, y + panelHeight - 18 - barHeight, 10, barHeight);
      }

      context.strokeStyle = rgba(primary, 0.46);
      context.beginPath();
      for (let point = 0; point <= 18; point += 1) {
        const px = x + 18 + point * 8;
        const py = y + 58 + Math.sin(point * 0.55 + time * 0.0015) * 10;
        if (point === 0) {
          context.moveTo(px, py);
        } else {
          context.lineTo(px, py);
        }
      }
      context.stroke();
      context.restore();
    };

    const drawSkyline = (time: number) => {
      const horizon = height * (0.76 - scrollProgress * 0.035);
      const base = height * 0.93;
      const haze = context.createLinearGradient(0, horizon - 140, 0, height);
      haze.addColorStop(0, "rgba(5, 16, 24, 0)");
      haze.addColorStop(0.48, "rgba(7, 22, 30, 0.5)");
      haze.addColorStop(1, "rgba(2, 5, 8, 0.9)");
      context.fillStyle = haze;
      context.fillRect(0, horizon - 150, width, height - horizon + 150);

      const cityGlow = context.createRadialGradient(width * 0.5, horizon + 120, 20, width * 0.5, horizon + 120, width * 0.58);
      cityGlow.addColorStop(0, rgba(accent, 0.2));
      cityGlow.addColorStop(0.42, rgba(primary, 0.12));
      cityGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = cityGlow;
      context.fillRect(0, horizon - 170, width, height - horizon + 170);

      buildings.forEach((building) => {
        const buildingWidth = Math.max(16, building.width * width);
        const x = building.x * width;
        const buildingHeight = building.height * height;
        const y = horizon - buildingHeight;
        context.fillStyle = "rgba(3, 9, 14, 0.88)";
        context.fillRect(x, y, buildingWidth, buildingHeight + (base - horizon));
        context.strokeStyle = rgba(primary, 0.08);
        context.strokeRect(x, y, buildingWidth, buildingHeight + (base - horizon));

        const windowColumns = Math.max(2, Math.floor(buildingWidth / 12));
        const windowRows = Math.max(2, Math.floor(buildingHeight / 18));
        for (let column = 0; column < windowColumns; column += 1) {
          for (let row = 0; row < windowRows; row += 1) {
            if (seededRandom(building.seed + column * 17 + row * 29) > 0.48) {
              const flicker = 0.4 + Math.sin(time * 0.0012 + column + row) * 0.1;
              context.fillStyle = rgba(accent, flicker + 0.26);
              context.shadowColor = rgba(accent, 0.62);
              context.shadowBlur = 5;
              context.fillRect(x + 5 + column * 11, y + 10 + row * 16, 3, 5);
              context.shadowBlur = 0;
            }
          }
        }
      });

      const bx = (width < 780 ? width * 0.78 : width * 0.73) - width * 0.035 * scrollProgress;
      const towerBase = height * (0.91 - scrollProgress * 0.025);
      const towerHeight = Math.min(height * 0.58, 520);
      const top = towerBase - towerHeight;
      context.save();
      context.shadowColor = rgba(primary, 0.16);
      context.shadowBlur = 22;
      context.fillStyle = "rgba(2, 7, 12, 0.97)";
      context.beginPath();
      context.moveTo(bx - 48, towerBase);
      context.lineTo(bx - 34, towerBase - towerHeight * 0.22);
      context.lineTo(bx - 25, towerBase - towerHeight * 0.38);
      context.lineTo(bx - 18, towerBase - towerHeight * 0.55);
      context.lineTo(bx - 9, towerBase - towerHeight * 0.72);
      context.lineTo(bx - 3, top + 36);
      context.lineTo(bx, top);
      context.lineTo(bx + 4, top + 36);
      context.lineTo(bx + 11, towerBase - towerHeight * 0.72);
      context.lineTo(bx + 21, towerBase - towerHeight * 0.54);
      context.lineTo(bx + 30, towerBase - towerHeight * 0.36);
      context.lineTo(bx + 43, towerBase - towerHeight * 0.2);
      context.lineTo(bx + 54, towerBase);
      context.closePath();
      context.fill();
      context.restore();

      context.save();
      context.shadowColor = rgba(primary, 0.34);
      context.shadowBlur = 16;
      context.strokeStyle = rgba(primary, 0.58);
      context.lineWidth = 1.15;
      for (let line = -3; line <= 3; line += 1) {
        context.beginPath();
        context.moveTo(bx + line * 7, towerBase);
        context.lineTo(bx + line * 1.1, top + 42);
        context.stroke();
      }
      context.restore();

      for (let row = 0; row < 25; row += 1) {
        const y = towerBase - 18 - row * (towerHeight / 29);
        const span = Math.max(8, 42 - row * 1.15);
        context.fillStyle = row % 3 === 0 ? rgba(accent, 0.84) : rgba(primary, 0.48);
        context.shadowColor = row % 3 === 0 ? rgba(accent, 0.62) : rgba(primary, 0.42);
        context.shadowBlur = 6;
        context.fillRect(bx - span * 0.5, y, span, 1.3);
        context.shadowBlur = 0;
      }

      const shoreline = context.createLinearGradient(0, horizon + 20, 0, height);
      shoreline.addColorStop(0, rgba(accent, 0.28));
      shoreline.addColorStop(0.35, "rgba(255, 190, 86, 0.12)");
      shoreline.addColorStop(1, "rgba(255, 190, 86, 0)");
      context.fillStyle = shoreline;
      context.fillRect(0, horizon + 16, width, height - horizon);

      for (let light = 0; light < 70; light += 1) {
        const x = seededRandom(light + 501) * width;
        const y = horizon + 18 + seededRandom(light + 509) * (height - horizon - 24);
        const radius = 0.8 + seededRandom(light + 521) * 2.2;
        context.fillStyle = rgba(light % 4 ? accent : primary, 0.26 + seededRandom(light + 533) * 0.42);
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const sky = context.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "rgba(2, 4, 17, 0.5)");
      sky.addColorStop(0.35, "rgba(3, 17, 29, 0.38)");
      sky.addColorStop(0.68, "rgba(6, 21, 25, 0.44)");
      sky.addColorStop(1, "rgba(2, 5, 7, 0.7)");
      context.fillStyle = sky;
      context.fillRect(0, 0, width, height);

      drawStars(time);
      drawMoon();
      drawMeteors(time);
      drawFlights(time);
      drawDataConstellation(time);
      drawDashboardPanel(time);
      drawSkyline(time);
    };

    const animate = (time: number) => {
      draw(time);

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const handleMotionChange = () => {
      reducedMotion = motionQuery.matches;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const observer = new MutationObserver(syncColors);

    syncColors();
    resize();
    updateScrollProgress();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    motionQuery.addEventListener("change", handleMotionChange);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScrollProgress);
      motionQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="dubai-night-sky" aria-hidden="true" />;
}

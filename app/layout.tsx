import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://shamsudeen-data-analyst.vercel.app"),
  title: "Shamsudeen | Software Developer & Data Analyst Portfolio",
  description:
    "Portfolio of Shamsudeen - Software Developer & Data Analyst with 3.5 years of experience in Web Development, Next.js, React.js, TypeScript, SQL, Python, and Power BI.",
  keywords: [
    "Shamsudeen",
    "Software Developer",
    "Web Developer",
    "Data Analyst",
    "React.js",
    "Next.js",
    "TypeScript",
    "SQL",
    "Python",
    "Power BI",
    "Advanced Excel"
  ],
  authors: [{ name: "Shamsudeen" }],
  creator: "Shamsudeen",
  openGraph: {
    title: "Shamsudeen | Software Developer & Data Analyst Portfolio",
    description:
      "Portfolio of Shamsudeen - Software Developer & Data Analyst with 3.5 years of experience building modern web apps, dashboards, and automated analytics.",
    type: "website",
    images: ["/og-card.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Shamsudeen | Software Developer & Data Analyst Portfolio",
    description: "Software Developer & Data Analyst with 3.5 years of experience in React, Next.js, SQL, and Python.",
    images: ["/og-card.svg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scheme-default" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

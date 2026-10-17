"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileSpreadsheet,
  GraduationCap,
  Lightbulb,
  Mail,
  Menu,
  Moon,
  Palette,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Users,
  X,
  Zap
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FormEvent, MouseEvent as ReactMouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DubaiNightSky } from "@/components/DubaiNightSky";
import NightSky from "@/components/NightSky";
import {
  certifications,
  experience,
  projectGroups,
  skillGroups,
  tools,
  transitionPoints
} from "@/lib/portfolio-data";

type Theme = "dark" | "light";
type ColorScheme =
  | "default"
  | "red"
  | "golden"
  | "emerald"
  | "ocean"
  | "rose"
  | "cyber"
  | "sunset"
  | "arctic"
  | "lavender"
  | "copper"
  | "lime"
  | "blood"
  | "sapphire"
  | "peach";

const colorSchemes: { id: ColorScheme; label: string; primary: string; accent: string }[] = [
  { id: "default", label: "Data Noir", primary: "#14B8A6", accent: "#F59E0B" },
  { id: "red", label: "Crimson Red", primary: "#E5133A", accent: "#FF2D55" },
  { id: "golden", label: "Golden Cinematic", primary: "#D4A017", accent: "#C7944A" },
  { id: "emerald", label: "Emerald Noir", primary: "#00C853", accent: "#69F0AE" },
  { id: "ocean", label: "Deep Ocean", primary: "#0066FF", accent: "#00B4D8" },
  { id: "rose", label: "Rose Quartz", primary: "#E91E8C", accent: "#FF6FB5" },
  { id: "cyber", label: "Cyber Neon", primary: "#00FF9F", accent: "#00E5FF" },
  { id: "sunset", label: "Sunset Blaze", primary: "#FF6B35", accent: "#FFD166" },
  { id: "arctic", label: "Arctic Frost", primary: "#48CAE4", accent: "#ADE8F4" },
  { id: "lavender", label: "Lavender Dream", primary: "#9B5DE5", accent: "#C77DFF" },
  { id: "copper", label: "Burnished Copper", primary: "#B87333", accent: "#E8A87C" },
  { id: "lime", label: "Electric Lime", primary: "#AAFF00", accent: "#D4FF00" },
  { id: "blood", label: "Blood Moon", primary: "#8B0000", accent: "#DC143C" },
  { id: "sapphire", label: "Royal Sapphire", primary: "#0F52BA", accent: "#6495ED" },
  { id: "peach", label: "Peach Blossom", primary: "#FF6F61", accent: "#FFB5A7" }
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "AI Analytics", href: "#ai-analytics" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Approach", href: "#approach" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" }
];

const profile = {
  name: "Shamsudeen",
  shortName: "SD",
  role: "Aspiring Software Developer | Web Developer & Data Analyst",
  badge: "Open for Software Developer, Web Developer & Data Analyst Roles",
  summary:
    "Data Analyst with 3.5 years of professional data operations & analytics experience, actively expanding into Software & Web Development with 1+ year of hands-on self-built modern web projects.",
  techLine: "Next.js | React.js | TypeScript | Tailwind CSS | SQL | Python | Power BI",
  email: "abushamsudeen667@gmail.com",
  linkedin: "https://www.linkedin.com/in/samsuuuuuu",
  github: "https://github.com/",
  location: "Open for Opportunities / Relocation"
};

const aboutStats = [
  { value: "3.5", label: "Years Data Analytics" },
  { value: "1+", label: "Year Self-Built Web Dev" },
  { value: "10K+", label: "Weekly Data Records" },
  { value: "60%", label: "Manual Effort Reduced" }
];

const aiAnalytics = [
  {
    icon: Bot,
    title: "AI-assisted analysis",
    description:
      "Use structured prompts to plan SQL checks, Power BI narratives, and Python EDA steps before building the final analysis."
  },
  {
    icon: Lightbulb,
    title: "Insight framing",
    description:
      "Convert raw metrics into recruiter-friendly business stories around SLA compliance, reconciliation, quality, and productivity."
  },
  {
    icon: Code2,
    title: "Notebook acceleration",
    description:
      "Speed up Python cleaning, visualization ideas, and documentation while keeping the logic readable and reviewable."
  },
  {
    icon: Zap,
    title: "Reporting productivity",
    description:
      "Automate repeatable dashboard, Excel, and Power Query workflows so teams spend less time compiling and more time acting."
  }
];

const analyticsApproach = [
  {
    icon: ShieldCheck,
    title: "Validate first",
    description: "Check duplicates, missing values, outliers, aging buckets, and reconciliation gaps before presenting insights."
  },
  {
    icon: BarChart3,
    title: "Show the KPI story",
    description: "Build dashboards around volume, SLA, quality, aging, productivity, and clear business impact."
  },
  {
    icon: Database,
    title: "Query with intent",
    description: "Use joins, CTEs, aggregations, and window functions to answer real operational questions."
  },
  {
    icon: FileSpreadsheet,
    title: "Automate repeat work",
    description: "Use Advanced Excel, Power Query, and macros where they remove manual reporting friction."
  },
  {
    icon: Users,
    title: "Communicate clearly",
    description: "Translate data findings into concise updates that operations leads, recruiters, and stakeholders can scan."
  },
  {
    icon: Target,
    title: "Build portfolio proof",
    description: "Turn real experience into public SQL, Power BI, Python, and Excel case studies with measurable outcomes."
  }
];

const education = [
  {
    degree: "B.Tech - Information Technology",
    institution: "Engineering background",
    period: "Completed",
    note: "Supports analytics, systems thinking, and technical problem solving."
  },
  {
    degree: "Python Programming",
    institution: "QSpiders",
    period: "2025",
    note: "Core Python, OOP, file handling, exceptions, and automation basics."
  }
];

function SettingsPanel({
  theme,
  toggleTheme,
  colorScheme,
  setColorScheme,
  onOpenChange
}: {
  theme: Theme;
  toggleTheme: () => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  onOpenChange?: (open: boolean) => void;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setSettingsOpen(false);
    setPaletteOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [closeAll]);

  return (
    <div ref={panelRef} className="settings-panel">
      <button
        className="nav-icon-button"
        aria-label="Open settings"
        title="Settings"
        onClick={() => {
          const next = !settingsOpen;
          setSettingsOpen(next);
          setPaletteOpen(false);
          onOpenChange?.(next);
        }}
      >
        <Settings size={18} className={settingsOpen ? "spin-icon" : ""} />
        {colorScheme !== "default" && <span className="active-color-dot" />}
      </button>

      <div className={`settings-actions ${settingsOpen ? "is-open" : ""}`}>
        <button
          className="nav-icon-button"
          aria-label="Toggle theme"
          title="Toggle theme"
          onClick={() => {
            toggleTheme();
            closeAll();
          }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className="nav-icon-button"
          aria-label="Choose color scheme"
          title="Color scheme"
          onClick={() => setPaletteOpen((value) => !value)}
        >
          <Palette size={18} />
        </button>
      </div>

      {paletteOpen && (
        <div className="palette-menu" data-scroll-allow>
          <span className="palette-title">Color Scheme</span>
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.id}
              className={`palette-option ${scheme.id === colorScheme ? "is-selected" : ""}`}
              onClick={() => {
                setColorScheme(scheme.id);
                closeAll();
              }}
            >
              <span className="palette-swatches">
                <span style={{ background: scheme.primary }} />
                <span style={{ background: scheme.accent }} />
              </span>
              {scheme.label}
              {scheme.id === colorScheme && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.02, ease: "none" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.02, ease: "none" });
    const moveGlowX = gsap.quickTo(glow, "x", { duration: 0.12, ease: "power2.out" });
    const moveGlowY = gsap.quickTo(glow, "y", { duration: 0.12, ease: "power2.out" });
    const trailTweens = trailRefs.current
      .filter((element): element is HTMLSpanElement => Boolean(element))
      .map((element, index) => ({
        x: gsap.quickTo(element, "x", { duration: 0.06 + index * 0.02, ease: "power2.out" }),
        y: gsap.quickTo(element, "y", { duration: 0.06 + index * 0.02, ease: "power2.out" })
      }));

    const onMove = (event: MouseEvent) => {
      moveDotX(event.clientX);
      moveDotY(event.clientY);
      moveGlowX(event.clientX);
      moveGlowY(event.clientY);
      trailTweens.forEach((tween) => {
        tween.x(event.clientX);
        tween.y(event.clientY);
      });
    };

    const onEnter = () => glowRef.current?.classList.add("is-hovering");
    const onLeave = () => glowRef.current?.classList.remove("is-hovering");

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, input, textarea").forEach((element) => {
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.querySelectorAll("a, button, input, textarea").forEach((element) => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="custom-cursor-glow" />
      <div ref={dotRef} className="custom-cursor-dot" />
      <span ref={(element) => { trailRefs.current[0] = element; }} className="custom-cursor-trail trail-one" />
      <span ref={(element) => { trailRefs.current[1] = element; }} className="custom-cursor-trail trail-two" />
      <span ref={(element) => { trailRefs.current[2] = element; }} className="custom-cursor-trail trail-three" />
    </>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>("default");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const pageRef = useRef<HTMLElement | null>(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const resumeHref = `${basePath}/resume/Shamsudeen-Data-Analyst-Resume.pdf`;

  const projects = useMemo(
    () =>
      projectGroups.flatMap((group) =>
        group.projects.map((project) => ({
          ...project,
          organization: group.title,
          icon: group.icon
        }))
      ),
    []
  );

  const skillCards = useMemo(
    () => [
      {
        title: "Web & Frontend Development",
        icon: Code2,
        skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5 / CSS3", "Tailwind CSS", "REST APIs", "Git"]
      },
      ...skillGroups.map((group) => ({
        title: group.title,
        icon: group.icon,
        skills: group.items
      })),
      {
        title: "Tools & Platforms",
        icon: FileSpreadsheet,
        skills: tools
      },
      {
        title: "Developer & Analyst Workflow",
        icon: Target,
        skills: ["Component Architecture", "API Integration", "Data Validation", "SLA Reporting", "Process Automation"]
      }
    ],
    []
  );

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme") as Theme | null;
    const storedScheme = window.localStorage.getItem("portfolio-color-scheme") as ColorScheme | null;
    if (storedTheme) setTheme(storedTheme);
    if (storedScheme && colorSchemes.some((scheme) => scheme.id === storedScheme)) {
      setColorSchemeState(storedScheme);
    }
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    colorSchemes.forEach((scheme) => root.classList.remove(`scheme-${scheme.id}`));
    root.classList.add(`scheme-${colorScheme}`);
    window.localStorage.setItem("portfolio-color-scheme", colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    let frame = 0;

    const updateSceneProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const root = document.documentElement;
        const maxScroll = Math.max(window.innerHeight * 2.4, 1);
        const progress = Math.min(window.scrollY / maxScroll, 1);
        root.style.setProperty("--scene-progress", progress.toFixed(4));
        root.style.setProperty("--scene-scale", (1.04 + progress * 0.18).toFixed(4));
        root.style.setProperty("--scene-y", `${Math.round(progress * -56)}px`);
        root.style.setProperty("--scene-brightness", (0.82 + progress * 0.13).toFixed(3));
      });
    };

    updateSceneProgress();
    window.addEventListener("scroll", updateSceneProgress, { passive: true });
    window.addEventListener("resize", updateSceneProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateSceneProgress);
      window.removeEventListener("resize", updateSceneProgress);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", ...navLinks.map((link) => link.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === "hero" ? "" : entry.target.id);
          }
        });
      },
      { rootMargin: "-22% 0px -58% 0px" }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(".site-nav", { y: -12 }, { y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".dubai-night-sky", { opacity: 0, scale: 1.035 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" });
      // gsap.fromTo(".dubai-photo-bg", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" });
      gsap.fromTo(".hero-grid", { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out", delay: 0.15 });
      gsap.fromTo(
        ".hero-hud span",
        { y: 18, scale: 0.94, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 0.78, stagger: 0.08, ease: "power3.out", delay: 0.55, clearProps: "opacity,visibility,transform" }
      );

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero.to(".hero-scroll", { opacity: 1, y: 0, duration: 0.75, delay: 2.35 });

      gsap.to(".hud-chip", { y: -7, duration: 3.8, repeat: -1, yoyo: true, stagger: 0.38, ease: "sine.inOut" });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 72, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 82%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
      gsap.to(".orb-1", {
        y: -30,
        x: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(".orb-2", {
        y: 25,
        x: -15,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(".orb-3", {
        y: -20,
        x: -25,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (mobileOpen || mobileSettingsOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen, mobileSettingsOpen]);

  const toggleTheme = () => setTheme((value) => (value === "dark" ? "light" : "dark"));

  const handleProjectMove = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    gsap.to(card, {
      rotationY: ((x - centerX) / centerX) * 5,
      rotationX: -((y - centerY) / centerY) * 5,
      duration: 0.25,
      ease: "power2.out",
      transformPerspective: 900
    });
  }, []);

  const handleProjectLeave = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.45,
      ease: "power2.out"
    });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio contact from ${name || "visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setMessageSent(true);
    form.reset();
    window.setTimeout(() => setMessageSent(false), 3200);
  };

  return (
    <main ref={pageRef} className={`portfolio-shell ${introReady ? "intro-ready" : ""}`}>
      <CustomCursor />

      <div className="night-sky" aria-hidden="true">
        <NightSky />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb-1 absolute top-1/4 left-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full bg-primary/10 blur-[60px] sm:blur-[120px]" />
          <div className="orb-2 absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent/10 blur-[50px] sm:blur-[100px]" />
          <div className="orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-purple-500/5 blur-[70px] sm:blur-[140px]" />
        </div>
        <div className="sky-vignette" />
      </div>

      <nav className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-inner">
          <a className="nav-brand gradient-text" href="#hero" aria-label="Portfolio home">
            &lt;{profile.shortName} /&gt;
          </a>

          <div className="nav-links">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              return (
                <a key={link.href} href={link.href} className={activeSection === id ? "is-active" : ""}>
                  {link.label}
                </a>
              );
            })}
            <SettingsPanel
              theme={theme}
              toggleTheme={toggleTheme}
              colorScheme={colorScheme}
              setColorScheme={setColorSchemeState}
            />
          </div>

          <div className="mobile-controls">
            <SettingsPanel
              theme={theme}
              toggleTheme={toggleTheme}
              colorScheme={colorScheme}
              setColorScheme={setColorSchemeState}
              onOpenChange={setMobileSettingsOpen}
            />
            <button
              className="menu-button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? "is-open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={activeSection === link.href.slice(1) ? "is-active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>

      <section id="hero" className="hero-section">
        <div className="hero-content sky-text">
          <p className="hero-badge glass-card">
            <span />
            {profile.badge}
          </p>
          <h1 className="hero-title">
            <span>Hi, I&apos;m </span>
            <span className="hero-name-gradient">{profile.name}</span>
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-lede">{profile.summary}</p>
          <p className="hero-techline">{profile.techLine}</p>

          <div className="hero-actions">
            <a className="button primary" href="#projects">
              <ArrowRight size={19} />
              View Projects
            </a>
            <a className="button outline" href={resumeHref} target="_blank" rel="noreferrer">
              <Download size={19} />
              View Resume
            </a>
            <a className="button outline" href="#contact">
              Contact Me
            </a>
          </div>

          <div className="hero-socials" aria-label="Profile links">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub">
              <Code2 size={21} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
              <BriefcaseBusiness size={21} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email Shamsudeen" title="Email">
              <Mail size={21} />
            </a>
          </div>
        </div>

        <a className="hero-scroll" href="#about" aria-label="Scroll to about section">
          <ChevronDown size={21} />
          <ChevronDown size={21} />
          <ChevronDown size={21} />
        </a>
      </section>

      <section id="about" className="section-shell section-about">
        <div className="section-title reveal">
          <p>{"// ABOUT ME"}</p>
          <h2>
            Get to know <span className="gradient-text">me</span>
          </h2>
        </div>

        <div className="about-layout">
          <article className="about-card glass-card hover-glow reveal">
            <p>
              I am a <strong>Data Analyst with 3.5 years of industry experience</strong> in healthcare operations,
              SLA reporting, reconciliation accuracy, and dashboard automation. Alongside my data background,
              I am an <strong>Aspiring Software Developer / Web Developer</strong> with <strong>1+ year of intensive self-directed learning</strong> and real-world project building.
            </p>
            <p>
              Through self-driven development, I have engineered full-stack web applications including <strong>TradingPilot AI</strong> (algorithmic trading signals and AI copilot) and <strong>zamss.in</strong> (dropshipping e-commerce platform). I combine strong analytical problem-solving with modern frontend web technologies like React.js, Next.js, and TypeScript.
            </p>
            <div className="chip-row">
              {["Next.js", "React.js", "TypeScript", "Tailwind CSS", "SQL", "Python", "Power BI", "Advanced Excel"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <div className="stats-grid reveal">
            {aboutStats.map((stat) => (
              <article key={stat.label} className="stat-card glass-card glass-hover">
                <strong className="gradient-text">{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section-shell">
        <div className="section-title reveal">
          <p>{"// SKILLS"}</p>
          <h2>
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </div>

        <div className="skill-grid">
          {skillCards.map((category) => {
            const Icon = category.icon;
            return (
              <article key={category.title} className="skill-card glass-card glass-hover hover-glow reveal">
                <div className="card-heading">
                  <span>
                    <Icon size={24} />
                  </span>
                  <h3>{category.title}</h3>
                </div>
                <div className="chip-row compact">
                  {category.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="ai-analytics" className="section-shell">
        <div className="section-title reveal">
          <p>{"// AI ASSISTED ANALYTICS"}</p>
          <h2>
            AI-powered <span className="gradient-text">productivity</span>
          </h2>
          <span>
            Responsible AI support for faster analysis planning, dashboard thinking, documentation,
            and code debugging while keeping the logic understandable.
          </span>
        </div>

        <div className="feature-grid">
          {aiAnalytics.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="feature-card glass-card glass-hover hover-glow reveal">
                <span className="feature-icon">
                  <Icon size={24} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>

        <article className="note-card glass-card reveal">
          <Sparkles size={22} />
          <p>
            AI helps speed up the workflow, but the portfolio focus stays on real analyst proof:
            datasets, queries, dashboards, metrics, and business explanations.
          </p>
        </article>
      </section>

      <section id="experience" className="section-shell narrow">
        <div className="section-title reveal">
          <p>{"// EXPERIENCE"}</p>
          <h2>
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="timeline">
          <span className="timeline-line" />
          {experience.map((role) => (
            <article key={role.title} className="timeline-entry reveal">
              <span className="timeline-dot" />
              <div className="glass-card glass-hover hover-glow timeline-card">
                <div className="timeline-top">
                  <div>
                    <h3>{role.title}</h3>
                    <p className="text-primary">{role.company}</p>
                  </div>
                  <p>{role.period}</p>
                </div>
                <ul>
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>
                      <span />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section-shell">
        <div className="section-title reveal">
          <p>{"// PROJECTS"}</p>
          <h2>
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <article
                key={`${project.organization}-${project.title}`}
                className="project-card glass-card hover-glow reveal"
                onMouseMove={handleProjectMove}
                onMouseLeave={handleProjectLeave}
              >
                <div className="project-bar" />
                <div className="project-body">
                  <div className="project-head">
                    <span className="project-icon">
                      <Icon size={25} />
                    </span>
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.organization} - {project.status}</p>
                    </div>
                  </div>
                  <p>{project.summary}</p>
                  <div className="chip-row compact accent">
                    {project.stack.split(",").map((stack) => (
                      <span key={stack.trim()}>{stack.trim()}</span>
                    ))}
                  </div>
                  <ul>
                    {project.points.map((point) => (
                      <li key={point}>
                        <Check size={16} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="approach" className="section-shell">
        <div className="section-title reveal">
          <p>{"// ANALYTICS APPROACH"}</p>
          <h2>
            How I <span className="gradient-text">analyze</span>
          </h2>
          <span>
            A simple path from operations data to verified insight, automation, and clear
            reporting.
          </span>
        </div>

        <div className="feature-grid three">
          {analyticsApproach.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="feature-card glass-card glass-hover hover-glow reveal">
                <span className="feature-icon">
                  <Icon size={23} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="education" className="section-shell narrow">
        <div className="section-title reveal">
          <p>{"// EDUCATION"}</p>
          <h2>
            My <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="education-grid">
          {education.map((item) => (
            <article key={item.degree} className="education-card glass-card glass-hover hover-glow reveal">
              <span className="feature-icon">
                <GraduationCap size={25} />
              </span>
              <h3>{item.degree}</h3>
              <p className="text-primary">{item.institution}</p>
              <div>
                <span>{item.period}</span>
                <small>{item.note}</small>
              </div>
            </article>
          ))}
          {certifications.map((cert) => (
            <article key={cert.title} className="education-card glass-card glass-hover hover-glow reveal">
              <span className="feature-icon">
                <FileSpreadsheet size={25} />
              </span>
              <h3>{cert.title}</h3>
              <p className="text-primary">{cert.provider}</p>
              <div>
                <span>{cert.date}</span>
                <small>Certification and learning signal for analytics roles.</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell contact-shell">
        <div className="section-title centered reveal">
          <p>{"// CONTACT"}</p>
          <h2>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <span>
            Open for Software Developer, Web Developer, Full-Stack Frontend, and Data Analyst opportunities.
          </span>
        </div>

        <div className="contact-layout">
          <div className="contact-list">
            <a className="contact-card glass-card glass-hover hover-glow reveal" href={`mailto:${profile.email}`}>
              <span>
                <Mail size={22} />
              </span>
              <div>
                <small>Email</small>
                <strong>{profile.email}</strong>
              </div>
            </a>
            <a className="contact-card glass-card glass-hover hover-glow reveal" href={profile.linkedin} target="_blank" rel="noreferrer">
              <span>
                <BriefcaseBusiness size={22} />
              </span>
              <div>
                <small>LinkedIn</small>
                <strong>linkedin.com/in/samsuuuuuu</strong>
              </div>
              <ExternalLink size={16} />
            </a>
            <div className="contact-card glass-card glass-hover hover-glow reveal">
              <span>
                <Target size={22} />
              </span>
              <div>
                <small>Location Preference</small>
                <strong>{profile.location}</strong>
              </div>
            </div>
          </div>

          <form className="contact-form glass-card reveal" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" required placeholder="you@example.com" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={4} required placeholder="Your message..." />
            </label>
            <button className="button primary full" type="submit">
              {messageSent ? (
                <>
                  <Check size={19} />
                  Message Ready
                </>
              ) : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <p>
          Copyright 2026 <span className="gradient-text">{profile.name}</span>. All rights reserved.
        </p>
        <p>Built with Next.js, TypeScript and GSAP</p>
      </footer>
    </main>
  );
}

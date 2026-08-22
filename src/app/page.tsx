// app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";

/* =========================================================================
   THEME — "Live API" portfolio for a .NET backend engineer
   Palette (syntax-highlighting logic):
     void    #070B14  page base          panel  #0D1420  cards
     line    #1E2A3D  borders            raised #141E2E  elevated
     purple  #7C5CFF  keywords / actions (.NET brand family)
     amber   #F5B759  strings / highlights
     green   #3DDC97  status 200 / success
     text    #E6EBF4  primary            muted  #8B98AD
   Type: Space Grotesk (display) · Inter (body) · JetBrains Mono (code)
   ========================================================================= */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

    :root {
      --void:   #070B14;
      --panel:  #0D1420;
      --raised: #141E2E;
      --line:   #1E2A3D;
      --purple: #7C5CFF;
      --purple-deep: #512BD4;
      --amber:  #F5B759;
      --green:  #3DDC97;
      --text:   #E6EBF4;
      --muted:  #8B98AD;
    }

    html { scroll-behavior: smooth; }

    body, .font-body { font-family: 'Inter', system-ui, sans-serif; }
    .font-display    { font-family: 'Space Grotesk', system-ui, sans-serif; }
    .font-mono       { font-family: 'JetBrains Mono', ui-monospace, monospace; }

    .bg-void   { background-color: var(--void); }
    .bg-panel  { background-color: var(--panel); }
    .bg-raised { background-color: var(--raised); }
    .border-line { border-color: var(--line); }

    .text-main   { color: var(--text); }
    .text-muted  { color: var(--muted); }
    .text-purple { color: var(--purple); }
    .text-amber  { color: var(--amber); }
    .text-green  { color: var(--green); }

    /* subtle grid backdrop — engineering paper */
    .grid-bg {
      background-image:
        linear-gradient(rgba(124, 92, 255, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124, 92, 255, 0.045) 1px, transparent 1px);
      background-size: 44px 44px;
    }

    .glow-purple { box-shadow: 0 0 0 1px rgba(124,92,255,.35), 0 0 42px rgba(124,92,255,.16); }
    .card-hover  { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
    .card-hover:hover {
      transform: translateY(-4px);
      border-color: rgba(124,92,255,.55);
      box-shadow: 0 12px 40px rgba(0,0,0,.45), 0 0 24px rgba(124,92,255,.10);
    }

    @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
    .cursor-block {
      display: inline-block; width: .6em; height: 1.1em;
      background: var(--amber); vertical-align: text-bottom;
      margin-left: 2px; animation: blink 1s step-end infinite;
    }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
    .fade-up   { animation: fadeUp .7s ease both; }
    .fade-up-1 { animation: fadeUp .7s ease .12s both; }
    .fade-up-2 { animation: fadeUp .7s ease .24s both; }

    @media (prefers-reduced-motion: reduce) {
      .fade-up, .fade-up-1, .fade-up-2 { animation: none; }
      .cursor-block { animation: none; }
      html { scroll-behavior: auto; }
    }

    ::selection { background: rgba(124,92,255,.4); }

    /* thin scrollbars for code panes */
    .scroll-thin::-webkit-scrollbar { height: 6px; width: 6px; }
    .scroll-thin::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
  `}</style>
);

/* ---------- Section header rendered as an API endpoint ---------- */
const EndpointHeader: React.FC<{ method?: string; path: string; title: string; sub?: string }> = ({
  method = "GET",
  path,
  title,
  sub,
}) => (
  <div className="mb-12 text-center">
    <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm bg-raised border border-line rounded-full px-4 py-1.5 mb-4">
      <span className="text-green font-semibold">{method}</span>
      <span className="text-muted">{path}</span>
      <span className="text-muted">·</span>
      <span className="text-green">200 OK</span>
    </div>
    <h2 className="font-display text-3xl sm:text-4xl font-bold text-main">{title}</h2>
    {sub && <p className="text-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">{sub}</p>}
  </div>
);

/* ============================== NAVBAR ============================== */
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "home", href: "#" },
    { name: "about", href: "#about" },
    { name: "experience", href: "#experience" },
    { name: "projects", href: "#projects" },
    { name: "awards", href: "#awards" },
    { name: "contact", href: "#contact" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#" || href === "#home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
      return;
    }
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-line ${
        isScrolled ? "py-2 backdrop-blur-md bg-[#070B14]/90 shadow-lg" : "py-4 bg-[#070B14]/70 backdrop-blur"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo — terminal prompt */}
          <a
            href="#"
            onClick={(e) => handleSmoothScroll(e, "#")}
            aria-label="Scroll to top"
            className="font-mono text-lg sm:text-xl font-semibold text-main hover:text-purple transition-colors"
          >
            <span className="text-purple">~/</span>shihab
            <span className="text-amber">_</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="font-mono text-sm text-muted hover:text-main transition-colors"
              >
                <span className="text-purple">.</span>
                {link.name}
                <span className="text-muted">()</span>
              </a>
            ))}
            <a
              href="/resume/Md. Sikhul Islam Shihab_CV.pdf"
              download
              className="font-mono text-sm font-semibold px-4 py-2 rounded-md bg-[#7C5CFF] text-white hover:bg-[#8f74ff] transition-colors shadow-[0_0_18px_rgba(124,92,255,.35)]"
            >
              resume.pdf ↓
            </a>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/resume/Md. Sikhul Islam Shihab_CV.pdf"
              download
              className="font-mono text-xs font-semibold px-3 py-2 rounded-md bg-[#7C5CFF] text-white"
            >
              resume ↓
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-main focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] rounded p-1"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-line">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="font-mono text-base text-muted hover:text-main transition-colors"
                >
                  <span className="text-purple">.</span>
                  {link.name}()
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

/* ============================== HERO ============================== */
const Hero: React.FC = () => {
  const roles = ["Backend Engineer", ".NET Developer", "API Architect", "Problem Solver"];
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 65);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
    } else if (deleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 350);
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, deleting, roleIndex]);

  return (
    <section className="grid-bg pt-32 pb-16 md:pt-40 md:pb-24 border-b border-line relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(124,92,255,.16), transparent)" }}
      />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — intro */}
          <div className="w-full lg:w-1/2 text-center lg:text-left fade-up">
            <p className="font-mono text-sm text-green mb-4">
              <span className="text-muted">$</span> whoami{" "}
              <span className="text-muted">— Assalamualaikum, hello!</span>
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-main leading-tight mb-5">
              Md. Sikhul Islam{" "}
              <span className="text-purple">Shihab</span>
            </h1>
            <p className="font-mono text-base sm:text-lg mb-8 min-h-[2rem]">
              <span className="text-purple">const</span>{" "}
              <span className="text-main">role</span>{" "}
              <span className="text-muted">=</span>{" "}
              <span className="text-amber">
                &quot;{displayText}
                <span className="cursor-block" aria-hidden />
                &quot;
              </span>
              <span className="text-muted">;</span>
            </p>
            <p className="text-muted max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              I design and ship reliable backend systems with{" "}
              <span className="text-main font-medium">.NET Core</span>,{" "}
              <span className="text-main font-medium">SQL Server</span> and{" "}
              <span className="text-main font-medium">REST APIs</span> — currently
              engineering enterprise solutions at Symphony Softtech Ltd.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href="https://github.com/Sikhul007?tab=repositories"
                target="_blank"
                className="inline-flex items-center gap-2 font-mono text-sm font-semibold px-6 py-3 rounded-md bg-[#7C5CFF] text-white hover:bg-[#8f74ff] transition-colors shadow-[0_0_24px_rgba(124,92,255,.35)]"
              >
                <FaGithub /> view_work()
              </Link>
              <Link
                href="https://www.linkedin.com/in/md-sikhul-islam-shihab/"
                target="_blank"
                className="inline-flex items-center gap-2 font-mono text-sm font-semibold px-6 py-3 rounded-md border border-line bg-panel text-main hover:border-[#7C5CFF] transition-colors"
              >
                <FaLinkedin /> connect()
              </Link>
            </div>
          </div>

          {/* Right — terminal card with photo + API response */}
          <div className="w-full lg:w-1/2 fade-up-1">
            <div className="bg-panel border border-line rounded-xl overflow-hidden glow-purple max-w-lg mx-auto">
              {/* window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-raised border-b border-line">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="font-mono text-xs text-muted ml-3">shihab@backend: ~</span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-5">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden border border-line">
                    <Image
                      src="/images/shihab.jpg"
                      alt="Md. Sikhul Islam Shihab"
                      fill
                      className="object-cover"
                      quality={100}
                      priority
                    />
                  </div>
                  <pre className="font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto scroll-thin flex-1">
                    <code>
                      <span className="text-muted">$ </span>
                      <span className="text-main">curl -X </span>
                      <span className="text-green">GET</span>
                      <span className="text-main"> /api/profile</span>
                      {"\n"}
                      <span className="text-muted">{"{"}</span>
                      {"\n  "}
                      <span className="text-purple">&quot;status&quot;</span>
                      <span className="text-muted">: </span>
                      <span className="text-green">200</span>
                      <span className="text-muted">,</span>
                      {"\n  "}
                      <span className="text-purple">&quot;stack&quot;</span>
                      <span className="text-muted">: [</span>
                      <span className="text-amber">&quot;.NET Core&quot;</span>
                      <span className="text-muted">, </span>
                      <span className="text-amber">&quot;C#&quot;</span>
                      <span className="text-muted">,</span>
                      {"\n            "}
                      <span className="text-amber">&quot;SQL Server&quot;</span>
                      <span className="text-muted">, </span>
                      <span className="text-amber">&quot;NestJS&quot;</span>
                      <span className="text-muted">],</span>
                      {"\n  "}
                      <span className="text-purple">&quot;cgpa&quot;</span>
                      <span className="text-muted">: </span>
                      <span className="text-green">3.87</span>
                      <span className="text-muted">,</span>
                      {"\n  "}
                      <span className="text-purple">&quot;open_to_work&quot;</span>
                      <span className="text-muted">: </span>
                      <span className="text-green">true</span>
                      {"\n"}
                      <span className="text-muted">{"}"}</span>
                    </code>
                  </pre>
                </div>
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between font-mono text-[11px] sm:text-xs">
                  <span className="text-muted">response_time: <span className="text-green">42ms</span></span>
                  <span className="text-muted">location: <span className="text-amber">&quot;Dhaka, BD&quot;</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================== ABOUT ============================== */
const AboutSection: React.FC = () => {
  const skillGroups: { label: string; color: string; items: string[] }[] = [
    {
      label: "backend",
      color: "text-purple",
      items: ["C#", "ASP.NET MVC", ".NET Core", "Node.js", "Express.js", "Nest.js", "PHP", "Python", "REST APIs"],
    },
    {
      label: "databases",
      color: "text-green",
      items: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB"],
    },
    {
      label: "frontend",
      color: "text-amber",
      items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap", "HTML", "CSS", "Responsive Design"],
    },
    {
      label: "tools_and_soft_skills",
      color: "text-purple",
      items: ["Git", "GitHub", "Postman", "Figma", "UI/UX Principles", "Problem Solving", "Critical Thinking", "Teamwork", "Communication"],
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 border-b border-line bg-void">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader path="/api/about" title="About Me" />

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 max-w-5xl mx-auto">
          <div className="md:w-3/5 text-muted leading-relaxed space-y-4 text-base">
            <p>
              I&apos;m a Computer Science graduate from{" "}
              <a
                href="https://www.aiub.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple font-medium hover:underline underline-offset-4"
              >
                American International University-Bangladesh (AIUB)
              </a>{" "}
              and a Software Engineer Intern at{" "}
              <a
                href="https://www.symphonysofttech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple font-medium hover:underline underline-offset-4"
              >
                Symphony Softtech Ltd.
              </a>
              , where I build backend systems that enterprise clients depend on every day.
            </p>
            <p>
              My focus is the server side: designing RESTful APIs with{" "}
              <span className="text-main">.NET Core</span>, securing them with role-based
              authentication, and tuning <span className="text-main">SQL Server</span> queries
              until they&apos;re fast and reliable. I also work comfortably across the full
              stack with TypeScript, React and Next.js when a project calls for it.
            </p>
            <p>
              Beyond the code, I&apos;m enthusiastic about teaching and mentoring future tech
              professionals. My goal is simple: build efficient, user-centric systems that make
              a tangible difference — and keep learning at every step.
            </p>
          </div>
          <div className="md:w-2/5 flex items-center justify-center">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-xl overflow-hidden border border-line glow-purple">
              <Image
                src="/images/shihab2.jpg"
                alt="Md. Sikhul Islam Shihab"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-panel border border-line rounded-xl p-6 sm:p-8 card-hover">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
              <h3 className="font-display text-xl font-bold text-main">
                BSc in Computer Science &amp; Engineering
              </h3>
              <span className="font-mono text-xs bg-raised border border-line text-green px-3 py-1 rounded-full w-fit">
                2022 — 2025
              </span>
            </div>
            <p className="text-purple font-medium mb-2">
              American International University-Bangladesh (AIUB)
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Focused on software engineering, web development and software requirement
              analysis. Graduated with a CGPA of{" "}
              <span className="text-main font-semibold">3.87 / 4.00</span> and five Dean&apos;s
              Awards for academic excellence.
            </p>
          </div>
        </div>

        {/* Skills as namespaces */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-main text-center mb-8">
            Tech Stack
          </h3>
          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.label} className="bg-panel border border-line rounded-xl p-5 sm:p-6">
                <p className="font-mono text-sm mb-4">
                  <span className="text-purple">namespace</span>{" "}
                  <span className={group.color}>{group.label}</span>{" "}
                  <span className="text-muted">{"{"}</span>
                </p>
                <div className="flex flex-wrap gap-2.5 pl-4">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs sm:text-sm bg-raised border border-line text-main px-3 py-1.5 rounded-md hover:border-[#7C5CFF] hover:text-purple transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-sm text-muted mt-3">{"}"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================== EXPERIENCE ============================== */
const ExperienceSection: React.FC = () => {
  const logs = [
    "Built and maintained RESTful APIs and backend services using .NET Core.",
    "Optimized SQL Server databases, improving query performance and reliability.",
    "Implemented role-based authentication and security features.",
    "Contributed to system design, debugging and testing for scalable solutions.",
    "Collaborated with senior engineers on efficient backend architecture.",
  ];
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-line bg-void grid-bg">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader path="/api/experience" title="Experience" />

        <div className="max-w-3xl mx-auto bg-panel border border-line rounded-xl overflow-hidden card-hover">
          <div className="flex items-center gap-2 px-4 py-3 bg-raised border-b border-line">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="font-mono text-xs text-muted ml-3">experience.log</span>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-main">
                  Software Engineer Intern
                </h3>
                <a
                  href="https://www.symphonysofttech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple font-medium hover:underline underline-offset-4 text-sm"
                >
                  Symphony Softtech Ltd. ↗
                </a>
              </div>
              <span className="font-mono text-xs bg-raised border border-line text-green px-3 py-1 rounded-full w-fit">
                Jul 2025 — Present
              </span>
            </div>
            <ul className="space-y-3">
              {logs.map((log, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed">
                  <span className="font-mono text-green flex-shrink-0 mt-0.5">[OK]</span>
                  <span>{log}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================== PROJECTS ============================== */
const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "Hotel Amin International",
      tags: ["Next.js", "NestJS", "PostgreSQL", "Tailwind"],
      description:
        "Full-stack hotel management platform with booking flows, an admin dashboard and a PostgreSQL-backed NestJS API.",
      imageUrl: "/images/pro_1.png",
      projectUrl: "https://github.com/Sikhul007/Hotel-Amin-Adv.-Web",
    },
    {
      title: "Land Digitalization & Fraud Prevention",
      tags: ["AI", "Blockchain", "System Design"],
      description:
        "Integrated land and real-estate digitalization system using AI for fraud detection and blockchain for immutable transactions.",
      imageUrl: "/images/diagram.png",
      projectUrl: "https://github.com/Sikhul007/Land-digitalization-sre",
    },
    {
      title: ".NET Movie Backend",
      tags: ["C#", "ASP.NET", "3-Tier Architecture"],
      description:
        "Backend built on a clean 3-tier architecture with separated data, business and presentation layers.",
      imageUrl: "/images/pro_4.png",
      projectUrl: "https://github.com/Sikhul007/Dot-Net/tree/main/Movie",
    },
    {
      title: "Travel Agency Platform",
      tags: ["PHP", "MySQL", "JavaScript"],
      description:
        "Booking platform with validated front-end forms, PHP business logic and secure database-backed storage.",
      imageUrl: "/images/pro_2.png",
      projectUrl: "https://github.com/Sikhul007/Land-digitalization-sre",
    },
    {
      title: "Travel Agency (Desktop)",
      tags: ["C#", "WinForms", "SQL Server"],
      description:
        "Desktop travel management app covering UI, database management, and full documentation of the build process.",
      imageUrl: "/images/pro_3.png",
      projectUrl: "https://github.com/Sikhul007/Travel-agency-C-sharp",
    },
    {
      title: "Amazon Homepage Clone",
      tags: ["HTML", "CSS", "Responsive"],
      description:
        "Pixel-close, fully responsive recreation of the Amazon homepage across desktop, tablet and mobile breakpoints.",
      imageUrl: "/images/pro_5.png",
      projectUrl: "https://github.com/Sikhul007/Land-digitalization-sre",
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-line bg-void">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader
          path="/api/projects"
          title="Projects"
          sub="Selected builds — from enterprise-style backends to full-stack products."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-panel border border-line rounded-xl overflow-hidden card-hover flex flex-col focus-visible:ring-2 focus-visible:ring-[#7C5CFF] outline-none"
            >
              <div className="relative w-full h-44 bg-raised border-b border-line overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold text-main mb-2 group-hover:text-purple transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-wide bg-raised border border-line text-amber px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-muted text-sm leading-relaxed flex-1">{project.description}</p>
                <p className="font-mono text-xs text-green mt-4">
                  view_source() <span className="text-muted">→ GitHub</span>
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================== AWARDS ============================== */
const AwardsSection: React.FC = () => {
  const awards = [
    {
      title: "Dean's Award",
      issuer: "AIUB — Faculty of Science and Technology",
      date: "Fall 2022-23",
      description: "GPA 3.91 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/fall-22-23.jpg",
    },
    {
      title: "Dean's Award",
      issuer: "AIUB — Faculty of Science and Technology",
      date: "Spring 2022-23",
      description: "Perfect GPA 4.00 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/spring-22-23.jpg",
    },
    {
      title: "Dean's Award",
      issuer: "AIUB — Faculty of Science and Technology",
      date: "Fall 2023-24",
      description: "GPA 3.85 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/fall-23-24.jpg",
    },
    {
      title: "Dean's Award",
      issuer: "AIUB — Faculty of Science and Technology",
      date: "Spring 2023-24",
      description: "GPA 3.80 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/spring-23-24.jpg",
    },
    {
      title: "Dean's Award",
      issuer: "AIUB — Faculty of Science and Technology",
      date: "Fall 2024-25",
      description: "GPA 3.85 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/fall-24-25.jpg",
    },
    {
      title: "Poster Presentation Certificate",
      issuer: "AIUB Computer Club",
      date: "2024",
      description:
        "Excellent performance in the Science Poster Contest (Senior Group), organized by the Department of Physics and ACC.",
      imageUrl: "/images/poster-presentation.jpg",
    },
  ];

  return (
    <section id="awards" className="py-16 md:py-24 border-b border-line bg-void grid-bg">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader
          path="/api/awards"
          title="Awards & Certificates"
          sub="Five Dean's Awards across consecutive semesters — consistency, compiled."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-panel border border-line rounded-xl overflow-hidden card-hover flex flex-col"
            >
              <div className="relative w-full h-44 bg-raised border-b border-line group overflow-hidden">
                <Image
                  src={award.imageUrl}
                  alt={award.title}
                  fill
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-display text-lg font-bold text-main">🏅 {award.title}</h3>
                  <span className="font-mono text-[10px] bg-raised border border-line text-green px-2 py-1 rounded-full whitespace-nowrap">
                    {award.date}
                  </span>
                </div>
                <p className="font-mono text-xs text-purple mb-2">{award.issuer}</p>
                <p className="text-muted text-sm leading-relaxed">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================== CONTACT ============================== */
const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("https://formsubmit.co/ajax/sikhulshihab@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: "New Portfolio Contact Message",
          _captcha: "false",
        }),
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-raised border border-line rounded-md px-4 py-2.5 text-main placeholder:text-[#4A5568] font-body text-sm focus:outline-none focus:border-[#7C5CFF] focus:ring-1 focus:ring-[#7C5CFF] transition-colors";

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-line bg-void">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader
          method="POST"
          path="/api/contact"
          title="Get In Touch"
          sub="Have a project, a role, or just a question? Send a request — I respond fast."
        />

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <div className="w-full lg:w-3/5">
            <div className="bg-panel border border-line rounded-xl p-6 sm:p-8 h-full">
              <p className="font-mono text-sm text-muted mb-6">
                <span className="text-green">POST</span> /api/contact{" "}
                <span className="text-muted">— body:</span>
              </p>
              {status === "sent" ? (
                <div className="text-center py-12">
                  <p className="font-mono text-green text-lg mb-2">201 Created ✓</p>
                  <p className="text-muted">
                    Thank you for your message! I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block font-mono text-xs text-purple mb-2">
                        &quot;name&quot;:
                      </label>
                      <input
                        type="text" id="name" name="name" required
                        value={form.name} onChange={handleChange}
                        className={inputClass} placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-mono text-xs text-purple mb-2">
                        &quot;email&quot;:
                      </label>
                      <input
                        type="email" id="email" name="email" required
                        value={form.email} onChange={handleChange}
                        className={inputClass} placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block font-mono text-xs text-purple mb-2">
                      &quot;subject&quot;:
                    </label>
                    <input
                      type="text" id="subject" name="subject" required
                      value={form.subject} onChange={handleChange}
                      className={inputClass} placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-mono text-xs text-purple mb-2">
                      &quot;message&quot;:
                    </label>
                    <textarea
                      id="message" name="message" rows={5} required
                      value={form.message} onChange={handleChange}
                      className={inputClass} placeholder="Your message here..."
                    />
                  </div>
                  {status === "error" && (
                    <p className="font-mono text-xs text-[#FF5F57]">
                      500 — something went wrong. Try again or email me directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full font-mono text-sm font-semibold px-6 py-3 rounded-md bg-[#7C5CFF] text-white hover:bg-[#8f74ff] disabled:opacity-60 transition-colors shadow-[0_0_18px_rgba(124,92,255,.3)]"
                  >
                    {status === "sending" ? "sending..." : "send_message()"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="w-full lg:w-2/5">
            <div className="bg-panel border border-line rounded-xl p-6 sm:p-8 h-full flex flex-col gap-6">
              <div>
                <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
                  // direct contact
                </p>
                <div className="space-y-3 text-sm">
                  <a href="mailto:sikhulshihab@gmail.com" className="flex items-center gap-3 text-muted hover:text-purple transition-colors">
                    <span className="text-amber font-mono">@</span> sikhulshihab@gmail.com
                  </a>
                  <a href="tel:+8801889031522" className="flex items-center gap-3 text-muted hover:text-purple transition-colors">
                    <span className="text-amber font-mono">☎</span> +88 01889 031522
                  </a>
                  <p className="flex items-center gap-3 text-muted">
                    <span className="text-amber font-mono">⌖</span> Shyampur, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
              <div className="border-t border-line pt-6">
                <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
                  // social
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { name: "GitHub", href: "https://github.com/Sikhul007" },
                    { name: "LinkedIn", href: "https://www.linkedin.com/in/md-sikhul-islam-shihab/" },
                    { name: "Twitter", href: "https://twitter.com/sikhulshihab" },
                    { name: "Facebook", href: "https://www.facebook.com/shihab.sikhul" },
                    { name: "Instagram", href: "https://www.instagram.com/sikhulshihab/" },
                    { name: "YouTube", href: "https://www.youtube.com/@sikhulshihab" },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-muted hover:text-purple transition-colors"
                    >
                      <span className="text-purple">→</span> {s.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-auto bg-raised border border-line rounded-lg p-4 font-mono text-xs">
                <p className="text-muted">
                  <span className="text-green">$</span> status --current
                </p>
                <p className="text-main mt-1">
                  <span className="text-green">●</span> Open to backend / .NET roles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================== PAGE ============================== */
const PortfolioPage: React.FC = () => {
  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <div className="bg-void text-main min-h-screen font-body">
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <footer className="bg-panel py-8 text-center">
        <p className="font-mono text-xs text-muted">
          <span className="text-purple">©</span> {currentYear} Md. Sikhul Islam Shihab{" "}
          <span className="text-muted">·</span> built with Next.js{" "}
          <span className="text-muted">·</span>{" "}
          <span className="text-green">all systems operational</span>
        </p>
      </footer>
    </div>
  );
};

export default PortfolioPage;



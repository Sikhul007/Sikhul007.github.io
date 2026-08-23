"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { roles } from "@/data/site";

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!roles || roles.length === 0) {
      console.warn("roles array is empty or undefined:", roles);
      return;
    }

    const currentRole = roles[roleIndex] ?? "";
    if (!currentRole) {
      setRoleIndex(0);
      setDisplayText("");
      setDeleting(false);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const isFullyTyped = !deleting && displayText === currentRole;
    const isFullyDeleted = deleting && displayText.length === 0;

    if (isFullyTyped) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (isFullyDeleted) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 350);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) => {
          if (deleting) {
            return currentRole.slice(0, Math.max(prev.length - 1, 0));
          }
          return currentRole.slice(0, prev.length + 1);
        });
      }, deleting ? 35 : 65);
    }

    return () => clearTimeout(timeout);
  }, [deleting, displayText, roleIndex]);

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
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden border border-line bg-raised">
                    <Image
                      src="/images/shihab.png"
                      alt="Md. Sikhul Islam Shihab"
                      fill
                      sizes="(max-width: 640px) 96px, 112px"
                      className="object-contain"
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

export default Hero;

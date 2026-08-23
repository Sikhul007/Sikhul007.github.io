import React from "react";
import Image from "next/image";
import EndpointHeader from "@/components/ui/EndpointHeader";
import { skillGroups } from "@/data/skills";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-line bg-void">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader path="/api/about" title="About Me" />

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 max-w-5xl mx-auto">
          <div className="md:w-3/5 text-muted leading-relaxed space-y-4 text-base font-cavolini text-justify">
            <p>
              I&apos;m a{" "}
              <a
                href="https://gakktechnology.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                Backend Engineer (.NET) at Gakk Media Ltd.
              </a>,
              focused on building reliable, secure, and business-driven backend systems. I work
              primarily with <span className="text-amber font-medium">ASP.NET Core, REST APIs, JWT/RBAC authentication,
              and SQL Server, MySQL &amp; PostgreSQL</span>.
            </p>
            <p>
              At{" "}
              <a
                href="https://gakktechnology.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                Gakk Media
              </a>{" "}
              I&apos;ve integrated <span className="text-amber font-medium">Pathao Pay, City Bank, and PayWall</span>,
              while developing CMS features for <span className="text-amber font-medium">products, vouchers, regions, partners,
              and catalogue operations</span>. Previously, I worked at{" "}
              <a
                href="https://snowtex.com.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                Snowtex Group
              </a>{" "}
              and{" "}
              <a
                href="https://symphonysoftt.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                Symphony Softtech Ltd.
              </a>,
              building authentication, refresh-token flows, CAPTCHA protection, documentation systems,
              and payroll-related solutions.
            </p>
            <p>
              I&apos;m a <span className="text-amber font-medium"> Computer Science graduate </span> from{" "}
              <a
                href="https://www.aiub.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber font-medium hover:underline underline-offset-4"
              >
                AIUB
              </a>{" "}
              with a <span className="text-amber font-medium">CGPA of 3.87</span>,
              and I&apos;m interested in designing software that is secure, maintainable, scalable,
              and useful.
            </p>
          </div>
          <div className="md:w-2/5 flex items-center justify-center">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-xl overflow-hidden border border-line glow-purple">
              <Image
                src="/images/shihab2.jpg"
                alt="Md. Sikhul Islam Shihab"
                fill
                sizes="(max-width: 768px) 240px, 288px"
                className="object-contain"
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
              <span className="text-amber font-semibold">3.87 / 4.00</span> and five Dean&apos;s
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

export default AboutSection;

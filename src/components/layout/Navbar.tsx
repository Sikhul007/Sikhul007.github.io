"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { navLinks, resumePath } from "@/data/site";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#");
  const clickTargetRef = useRef<string | null>(null);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const renderNavLabel = (name: string, isActive: boolean) => {
    const prefix = `.${name.slice(0, 3)}`;
    const suffix = `${name.slice(3)}()`;

    return (
      <>
        <span
          className={`inline-block border-b-2 pb-[1px] transition-all duration-200 ${
            isActive ? "text-amber border-amber" : "text-purple border-transparent"
          }`}
        >
          {prefix}
        </span>
        <span className="text-main font-semibold">{suffix}</span>
      </>
    );
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setActiveHref(href);
    clickTargetRef.current = href;

    if (settleTimeoutRef.current) {
      clearTimeout(settleTimeoutRef.current);
    }
    settleTimeoutRef.current = setTimeout(() => {
      clickTargetRef.current = null;
    }, 1200);

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
    const sectionHrefs = navLinks.map((link) => link.href).filter((href) => href.startsWith("#") && href.length > 1);

    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);

      const lockedTarget = clickTargetRef.current;
      if (lockedTarget) {
        if (lockedTarget === "#" || lockedTarget === "#home") {
          if (y > 60) {
            setActiveHref("#");
            return;
          }
          clickTargetRef.current = null;
        } else {
          const lockedSection = document.getElementById(lockedTarget.slice(1));
          if (lockedSection) {
            const reachedTarget = y + 140 >= lockedSection.offsetTop;
            if (!reachedTarget) {
              setActiveHref(lockedTarget);
              return;
            }
          }
          clickTargetRef.current = null;
        }
      }

      if (y < 120) {
        setActiveHref("#");
        return;
      }

      const scrollPosition = y + 140;
      let currentHref = "#";

      for (const href of sectionHrefs) {
        const id = href.slice(1);
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }

        if (section.offsetTop <= scrollPosition) {
          currentHref = href;
        }
      }

      setActiveHref(currentHref);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-line ${
        isScrolled ? "py-2 backdrop-blur-md bg-void/90 shadow-lg" : "py-4 bg-void/70 backdrop-blur"
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
                className={`font-mono text-sm font-semibold transition-colors ${
                  activeHref === link.href ? "text-main" : "text-main hover:text-amber"
                }`}
              >
                {renderNavLabel(link.name, activeHref === link.href)}
              </a>
            ))}
            <a
              href={resumePath}
              download
              className="font-mono text-sm font-semibold px-4 py-2 rounded-md bg-[#B2967D] text-main hover:bg-[#C4AE99] transition-colors shadow-lg"
            >
              resume.pdf ↓
            </a>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href={resumePath}
              download
              className="font-mono text-xs font-semibold px-3 py-2 rounded-md bg-[#B2967D] text-main hover:bg-[#C4AE99] transition-colors"
            >
              resume ↓
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-main focus:outline-none focus-visible:ring-2 focus-visible:ring-purple rounded p-1"
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
                  className={`font-mono text-base font-semibold transition-colors ${
                    activeHref === link.href ? "text-main" : "text-main hover:text-amber"
                  }`}
                >
                  {renderNavLabel(link.name, activeHref === link.href)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

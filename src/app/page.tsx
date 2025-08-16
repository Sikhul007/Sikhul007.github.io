// app/page.tsx
"use client";

import React, { useState, useEffect } from "react"; // Added useEffect for scroll handling
import Image from "next/image";
import {
  // FaExternalLinkAlt,
  // FaChevronDown,
  // FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";

// --- Navbar Component ---
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Awards", href: "#awards" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-800 shadow-md py-2" : "bg-gray-800 py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xxl sm:text-2xl font-bold text-white">
              <a href="#">SHIHAB</a>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white hover:text-gray-300 font-medium text-sm transition-colors underline-offset-4 hover:underline"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/resume/Md. Sikhul Islam Shihab_CV.pdf"
              download
              className="bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors border border-black "
            >
              Download Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white hover:text-gray-300 font-medium text-base transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/resume/Md. SIkhul Islam Shihab(CV).pdf"
                download
                className="bg-white text-gray-800 px-4 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors border border-black w-fit"
                onClick={() => setIsOpen(false)}
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// --- Header Component (receives animation state as props) ---
interface HeaderProps {
  displayText: string;
  phase: string;
  partIndex: number;
  setDisplayText: React.Dispatch<React.SetStateAction<string>>;
  setPhase: React.Dispatch<React.SetStateAction<string>>;
  setPartIndex: React.Dispatch<React.SetStateAction<number>>;
  charIndex: number;
  setCharIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Header: React.FC<HeaderProps> = ({
  displayText,
  phase,
  partIndex,
  setDisplayText,
  setPhase,
  setPartIndex,
  charIndex,
  setCharIndex,
}) => {
  const roles = [
    "Software Engineer",
    "Web Developer",
    "Business Analyst",
    "Computer Science",
  ];
  const fullTagline = roles.join(" | ");

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    const speed = 40;
    const pause = 900;
    if (phase === "cumulativeLetter") {
      let current = "";
      if (partIndex > 0) {
        current = roles.slice(0, partIndex).join(" | ") + " | ";
      }
      const currentPart = roles[partIndex];
      if (charIndex < currentPart.length) {
        setDisplayText(current + currentPart.slice(0, charIndex + 1));
        timeout = setTimeout(() => {
          setCharIndex((c) => c + 1);
        }, speed);
      } else {
        setDisplayText(current + currentPart);
        if (partIndex < roles.length - 1) {
          timeout = setTimeout(() => {
            setPartIndex((i) => i + 1);
            setCharIndex(0);
          }, pause);
        } else {
          timeout = setTimeout(() => {
            setPhase("full");
          }, pause);
        }
      }
    } else if (phase === "full") {
      setDisplayText(fullTagline);
      timeout = setTimeout(() => {
        setPhase("erasing");
      }, 1200);
    } else if (phase === "erasing") {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText((t) => t.slice(0, -1));
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setPartIndex(0);
          setCharIndex(0);
          setPhase("cumulativeLetter");
        }, 400);
      }
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [phase, partIndex, charIndex, displayText, roles, fullTagline]);

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24 border-b-2 border-black overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 gap-10">
        {/* Text Content */}
        <div className="text-gray-800 text-center md:text-left w-full md:w-1/2 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Assalamualaikum... Hello!
            <br className="hidden sm:inline" /> I&apos;m Md. Sikhul Islam Shihab
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 max-w-md mx-auto md:mx-0 min-h-[2.5rem]">
            <span
              className={`inline-block transition-opacity duration-300 opacity-100`}
            >
              {displayText}
              {phase === "full" && <span className="text-black">.</span>}
            </span>
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              href="https://github.com/Sikhul007?tab=repositories"
              className="bg-gray-800 text-white px-6 sm:px-8 py-3 rounded-md shadow-md hover:bg-gray-700 transition-colors border-2 border-black text-sm sm:text-base font-semibold"
              target="_blank"
            >
              My Works
            </Link>
            <Link
              href="https://www.linkedin.com/in/md-sikhul-islam-shihab/"
              className="bg-gray-800 text-white px-6 sm:px-8 py-3 rounded-md shadow-md hover:bg-gray-700 transition-colors border-2 border-black text-sm sm:text-base font-semibold ml-4"
              target="_blank"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 flex-shrink-0 mx-auto animate-fade-in flex items-center justify-center bg-gray-50 border-2 border-black rounded-lg">
          <Image
            src="/images/shihab.jpg"
            alt="Profile Photo"
            layout="fill"
            objectFit="contain"
            className="rounded-lg p-1"
            quality={100}
            priority
          />
        </div>
      </div>
    </section>
  );
};

// --- About Me Section Component (No change) ---
const AboutMeSection: React.FC = () => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Bootstrap",
    "PHP",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Node.js",
    "Express.js",
    "Nest.js",
    "Python",
    "ASP.NET MVC",
    "C#",
    "SQL Server",
    "Git",
    "GitHub",
    "REST APIs",
    "Postman",
    "Figma",
    "Responsive Design",
    "UI/UX Principles",
    "Problem Solving",
    "Critical Thinking",
    "Teamwork",
    "Communication",
  ];

  return (
    <section
      id="about"
      className="bg-gray-100 py-12 md:py-16 border-b-2 border-black"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="md:w-1/2 text-gray-700 text-justify">
            <p className="text-base md:text-lg mb-4 leading-relaxed">
              Hello! I&apos;m Md. Sikhul Islam Shihab, a passionate Computer
              Science student at
              <a
                href="https://www.aiub.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 font-semibold hover:underline"
              >
                {" "}
                American International University-Bangladesh (AIUB)
              </a>{" "}
              and a Software Engineer Intern at
              <a
                href="https://www.symphonysofttech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 font-semibold hover:underline"
              >
                {" "}
                Symphony Softtech Ltd.
              </a>
              . My journey in tech is driven by a deep interest in Web
              Development, Software Engineering, and scalable backend solutions.
              I thrive on bringing ideas to life through code and constantly
              seek to expand my knowledge in various technologies.
            </p>
            <p className="text-base md:text-lg mb-4 leading-relaxed">
              My expertise spans across foundational web technologies like HTML,
              CSS, and JavaScript, extending to modern frameworks. I also have
              experience with PHP for backend development, and hands-on exposure
              to ASP.NET MVC and Postman API for robust development and testing
              practices.
              <br />
              During my internship at Symphony Softtech Ltd., I worked with
              experienced engineers to deliver robust backend solutions for
              enterprise clients, focusing on RESTful APIs, secure
              authentication, and database optimization.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Beyond the lines of code, I&apos;m enthusiastic about teaching and
              nurturing future tech professionals. My goal is to craft
              efficient, user-centric, and semi-automated digital solutions that
              make a tangible difference. I&apos;m always eager to connect with
              fellow enthusiasts and collaborators!
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex-shrink-0 flex items-center justify-center bg-gray-50 border-2 border-black rounded-lg">
              <Image
                src="/images/shihab2.jpg"
                alt="About Me Illustration"
                layout="fill"
                objectFit="contain"
                quality={100}
                priority
                className="rounded-lg p-2"
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            Education
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-black shadow-md max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
              <h4 className="text-xl font-bold text-gray-800">
                BSc in Computer Science and Engineering
              </h4>
              <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full mt-2 md:mt-0">
                2022 - 2025
              </span>
            </div>
            <p className="text-gray-600 font-medium">
              American International University-Bangladesh (AIUB)
            </p>
            <p className="text-gray-700 mt-2">
              Focused on software engineering, web development, and software
              requrirement analysis. Maintained excellent academic standing with
              a CGPA of 3.87/4.0.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            My Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-800 text-white text-sm sm:text-base px-4 py-2 rounded-full shadow-md border border-black transform hover:scale-105 transition-transform duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection: React.FC = () => {
  // You can update this link as needed
  const companyUrl = "https://www.symphonysofttech.com/";
  return (
    <section
      id="experience"
      className="bg-white py-12 md:py-16 border-b-2 border-black"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
          Experience
        </h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          <div className="bg-gray-100 rounded-lg border-2 border-black overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full max-w-3xl mx-auto flex flex-col">
            <div className="p-8 flex flex-col h-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
                  Software Engineer Intern
                </h3>
                <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                  July 2025 – Present
                </span>
              </div>
              <div className="text-gray-700 text-sm mb-2 font-semibold flex items-center text-justify">
                {companyUrl && (
                  <a
                    href={companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded bg-gray-800 text-white text-xs font-semibold border border-black hover:bg-gray-700 transition-colors"
                  >
                    Symphony Softtech Ltd.
                  </a>
                )}
              </div>
              <div className="text-gray-700 text-sm mb-4 text-justify">
                During my internship at Symphony Softtech Ltd., I worked closely
                with a team of experienced engineers to deliver robust backend
                solutions for enterprise clients. My responsibilities included
                designing and developing RESTful APIs using .NET Core,
                implementing secure role-based authentication, and optimizing
                SQL Server queries for high performance. I also participated in
                code reviews, contributed to architectural decisions, and
                collaborated across teams to ensure seamless integration of
                backend services with frontend applications. This experience
                enhanced my skills in scalable backend development, database
                management, and teamwork in a professional software environment.
              </div>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 pl-2 mb-2 text-justify">
                <li>
                  Developed REST APIs and backend services using .NET Core.
                </li>
                <li>
                  Collaborated with senior engineers to manage SQL Server
                  databases.
                </li>
                <li>
                  Implemented role-based authentication and optimized query
                  performance.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title:
        "Hotel Amin International (Next.js, Tailwind CSS, Next.js and PostgreSQL)",
      description:
        "Led the redesign of an e-commerce platform focusing on improved user experience, faster load times, and mobile responsiveness. Implemented a new payment gateway and enhanced product catalog features.",
      imageUrl: "/images/pro_1.png",
      projectUrl: "https://github.com/Sikhul007/Hotel-Amin-Adv.-Web",
    },
    {
      title: "Travel Agency (Html, CSS, Js, Php)",
      description:
        "The front-end focuses on designing and validation to ensure a seamless user experience, while the backend handles all feature logic and operations. Additionally, efficient database management ensures secure storage and retrieval of data.",
      imageUrl: "/images/pro_2.png",
      projectUrl: "https://github.com/Sikhul007/Land-digitalization-sre",
    },
    {
      title: "Amazon (Front-end)",
      description:
        "Replicated the Amazon homepage using HTML and CSS, creating a responsive layout that closely mirrors the original design for an optimal user experience across different devices.",
      imageUrl: "/images/pro_5.png",
      projectUrl: "https://github.com/Sikhul007/Land-digitalization-sre",
    },
    {
      title: ".Net Framework (Backend using 3 tier architecture)",
      description:
        "Created an automated testing suite for a web application using Selenium and Python. Improved testing efficiency by 40% and reduced manual testing time.",
      imageUrl: "/images/pro_4.png",
      projectUrl: "https://github.com/Sikhul007/Dot-Net/tree/main/Movie",
    },
    {
      title: "Travel Agency (C#)",
      description:
        "The project involves front-end development for a seamless user interface, database management for efficient data storage, presentation to showcase the work effectively, and report writing to document the process and findings comprehensively.",
      imageUrl: "/images/pro_3.png",
      projectUrl: "https://github.com/Sikhul007/Travel-agency-C-sharp",
    },
    {
      title:
        "Integrated Land and Real Estate Digitalization and Fraud Prevention System",
      description:
        "Developed an integrated land and real estate digitalization and fraud prevention system leveraging AI for fraud detection and Blockchain for immutable transactions. Focused on enhancing transparency and security in property management.",
      imageUrl: "/images/diagram.png",
      projectUrl: "https://github.com/Sikhul007/Land-digitalization-sre",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-white py-12 md:py-16 border-b-2 border-black"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
          Projects
        </h2>

        <div className="flex flex-wrap justify-center lg:justify-between gap-4 lg:gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg border-2 border-black overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] mx-auto lg:mx-0 flex flex-col h-[500px]"
            >
              <div className="relative w-full h-52 flex items-center justify-center group flex-shrink-0">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="contain"
                  className="border-b-2 border-black p-2 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col flex-1 p-6 min-h-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {project.title}
                  </h3>
                </div>
                <div
                  className="text-gray-700 overflow-y-auto mb-2"
                  style={{ maxHeight: "90px" }}
                >
                  {project.description}
                </div>
                {project.projectUrl && (
                  <div className="mt-auto text-center">
                    <button
                      className={`inline-block px-5 py-2 rounded-md shadow-sm border-2 border-black text-sm font-semibold transition-colors ${
                        project.projectUrl && project.projectUrl !== "#"
                          ? "bg-gray-800 text-white hover:bg-gray-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      type="button"
                      disabled={
                        !project.projectUrl || project.projectUrl === "#"
                      }
                      onClick={() => {
                        if (project.projectUrl && project.projectUrl !== "#") {
                          window.open(
                            project.projectUrl,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                    >
                      View on GitHub
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact Section Component ---
const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="bg-gray-100 py-12 md:py-16 border-b-2 border-black"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
          Get In Touch
        </h2>

        {/* Two-part layout: Contact Form on Left, Contact Info & Social Media on Right */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left Side - Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-black h-full">
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                Send Me a Message
              </h3>
              <form
                action="https://formsubmit.co/sikhulshihab@gmail.com"
                method="POST"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New Portfolio Contact Message"
                />
                <input
                  type="hidden"
                  name="_next"
                  value={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                />
                <input type="hidden" name="_captcha" value="false" />
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-800 placeholder-gray-300 text-gray-800"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-800 placeholder-gray-300 text-gray-800"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-800 placeholder-gray-300 text-gray-800"
                    placeholder="Subject of your message"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-800 placeholder-gray-300 text-gray-800"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-8 py-3 rounded-md shadow-md hover:bg-gray-700 transition-colors border-2 border-black text-base font-semibold"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Connect With Me */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-black h-full">
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                Connect With Me
              </h3>

              {/* Direct Contact */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">
                  Direct Contact
                </h4>
                <div className="flex flex-col space-y-4">
                  <a
                    href="mailto:sikhulshihab@gmail.com"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    title="Send an Email"
                    aria-label="Send an email to Sikhul Shihab"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    sikhulshihab@gmail.com
                  </a>
                  <a
                    href="tel:+8801889031522"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    title="Call Me"
                    aria-label="Call Sikhul Shihab"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +88 01889031522
                  </a>
                  <div className="flex items-center text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Shaympur, Dhaka, Bangladesh
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">
                  Social Media
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://github.com/Sikhul007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    title="GitHub Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/md-sikhul-islam-shihab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    title="LinkedIn Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com/sikhulshihab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    title="Twitter Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </a>
                  <a
                    href="https://www.facebook.com/shihab.sikhul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    title="Facebook Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/sikhulshihab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    title="Instagram Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                      <path d="M12 6.865c-2.841 0-5.144 2.303-5.144 5.144s2.303 5.144 5.144 5.144 5.144-2.303 5.144-5.144-2.303-5.144-5.144-5.144zm0 8.485c-1.842 0-3.341-1.499-3.341-3.341s1.499-3.341 3.341-3.341 3.341 1.499 3.341 3.341-1.499 3.341-3.341 3.341z" />
                      <path d="M19.825 6.575c0 .665-.54 1.205-1.205 1.205s-1.205-.54-1.205-1.205.54-1.205 1.205-1.205 1.205.54 1.205 1.205z" />
                    </svg>
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com/@sikhulshihab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    title="YouTube Channel"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Awards Section Component ---
const AwardsSection: React.FC = () => {
  const awards = [
    {
      title: "🏅 Dean's Award",
      issuer: "American International University-Bangladesh",
      date: "Fall 2022-2023",
      description:
        "Awarded by AIUB’s Faculty of Science and Technology to me for earning a perfect GPA of 3.91 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/fall-22-23.jpg",
    },
    {
      title: "🏅 Dean's Award",
      issuer: "American International University-Bangladesh",
      date: "Spring 2022-2023",
      description:
        "Awarded by AIUB’s Faculty of Science and Technology to me for earning a perfect GPA of 4.00 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/spring-22-23.jpg",
    },
    {
      title: "🏅 Dean's Award",
      issuer: "American International University-Bangladesh",
      date: "Fall 2023-2024",
      description:
        "Awarded by AIUB’s Faculty of Science and Technology to me for earning a perfect GPA of 3.85 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/fall-23-24.jpg",
    },
    {
      title: "Poster Presentation Certificate",
      issuer: "AIUB Compurter Club",
      date: "2024",
      description:
        "Presented to Md. Sikhul Islam Shihab for excellent performance in the 2022 Science Poster Contest (Senior Group), organized by the Department of Physics and AIUB Computer Club (ACC).",
      imageUrl: "/images/poster-presentation.jpg",
    },
    {
      title: "🏅 Dean's Award",
      issuer: "American International University-Bangladesh",
      date: "Spring 2023-2024",
      description:
        "Awarded by AIUB’s Faculty of Science and Technology to me for earning a perfect GPA of 3.80 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/spring-23-24.jpg",
    },
    {
      title: "🏅 Dean's Award",
      issuer: "American International University-Bangladesh",
      date: "Fall 2024-2025",
      description:
        "Awarded by AIUB’s Faculty of Science and Technology to me for earning a perfect GPA of 3.85 in the CSE program, recognizing outstanding academic achievement.",
      imageUrl: "/images/fall-24-25.jpg",
    },
  ];

  return (
    <section
      id="awards"
      className="bg-white py-12 md:py-16 border-b-2 border-black"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">
          Awards & Certificates
        </h2>

        <div className="flex flex-wrap justify-center lg:justify-between gap-4 lg:gap-6 max-w-6xl mx-auto">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg border-2 border-black overflow-hidden shadow-md hover:shadow-lg transition-shadow w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] mx-auto lg:mx-0"
            >
              <div className="relative w-full h-52 flex items-center justify-center group">
                <Image
                  src={award.imageUrl}
                  alt={award.title}
                  layout="fill"
                  objectFit="contain"
                  className="border-b-2 border-black p-2 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {award.title}
                  </h3>
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                    {award.date}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Issued by: {award.issuer}
                </p>
                <p className="text-gray-700">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main Portfolio Page (Updated for dynamic background) ---
const PortfolioPage: React.FC = () => {
  const [currentYear, setCurrentYear] = useState("");

  // Animation state for Header
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("cumulativeLetter");
  const [partIndex, setPartIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  // Determine background class based on partIndex (odd/even)
  // Only alternate during typing/erasing, not during full display
  let bgClass = "bg-gray-50";
  if (phase === "cumulativeLetter" || phase === "erasing") {
    bgClass =
      partIndex % 2 === 0
        ? "bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50"
        : "bg-gradient-to-br from-yellow-100 via-pink-100 to-pink-50";
  } else if (phase === "full") {
    bgClass = "bg-gradient-to-br from-green-100 via-green-50 to-white";
  }

  return (
    <div
      className={`${bgClass} min-h-screen font-sans transition-colors duration-700`}
    >
      <Navbar />
      <div className="pt-16">
        <Header
          displayText={displayText}
          phase={phase}
          partIndex={partIndex}
          setDisplayText={setDisplayText}
          setPhase={setPhase}
          setPartIndex={setPartIndex}
          charIndex={charIndex}
          setCharIndex={setCharIndex}
        />
        <AboutMeSection />
        <ExperienceSection />
        <ProjectsSection />
        <AwardsSection />
        <ContactSection />
        <footer className="bg-gray-800 text-white text-center py-6 border-t-2 border-black">
          <p className="text-sm sm:text-base">
            &copy; {currentYear} Md. Sikhul Islam Shihab. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PortfolioPage;

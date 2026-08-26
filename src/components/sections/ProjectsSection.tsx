import React from "react";
import Image from "next/image";
import EndpointHeader from "@/components/ui/EndpointHeader";
import { projects } from "@/data/projects";

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 border-b border-line bg-void">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader
          path="/api/projects"
          title="Projects"
          sub="Selected builds — from enterprise-style backends to full-stack products."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-panel border border-line rounded-xl overflow-hidden card-hover flex flex-col focus-visible:ring-2 focus-visible:ring-purple outline-none"
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
                <h3 className="font-cavolini text-lg font-bold text-main mb-2 group-hover:text-purple transition-colors">
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

export default ProjectsSection;

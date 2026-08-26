import React from "react";
import Image from "next/image";
import EndpointHeader from "@/components/ui/EndpointHeader";
import { awards } from "@/data/awards";

const AwardsSection: React.FC = () => {
  return (
    <section id="awards" className="py-16 md:py-24 border-b border-line bg-void grid-bg">
      <div className="container mx-auto px-4 sm:px-6">
        <EndpointHeader
          path="/api/awards"
          title="Awards & Certificates"
          sub="Five Dean's Awards across consecutive semesters — consistency, compiled."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                  <h3 className="font-cavolini text-lg font-bold text-main">🏅 {award.title}</h3>
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

export default AwardsSection;

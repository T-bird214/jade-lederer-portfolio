/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { PROJECTS } from "../content/projects";

interface ProjectsCarouselProps {
  onOpenAiAssistant: () => void;
  onScrollToContact: () => void;
}

export default function ProjectsCarousel({ onOpenAiAssistant, onScrollToContact }: ProjectsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      scroll("left");
    } else if (e.key === "ArrowRight") {
      scroll("right");
    }
  };

  return (
    <section
      id="proyectos"
      className="bg-travertine-50 py-24 border-b border-travertine-200"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Catálogo de Proyectos"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header with Nav Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 text-left">
            <span className="font-mono text-xs text-copper-600 uppercase tracking-widest block font-semibold">
              Portafolio Exclusivo
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal-900 leading-tight">
              Proyectos Residenciales <br />
              <span className="font-serif italic text-copper-600 font-normal">Destacados</span>
            </h2>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              className="p-3 bg-white border border-travertine-200 hover:border-copper-400 text-charcoal-700 transition-all duration-300 cursor-pointer"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 bg-white border border-travertine-200 hover:border-copper-400 text-charcoal-700 transition-all duration-300 cursor-pointer"
              aria-label="Proyecto siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          ref={scrollContainerRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-copper-500"
          id="projects-carousel-container"
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              onClick={onOpenAiAssistant}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] aspect-[3/4] bg-white border border-travertine-200 p-4 snap-start hover:border-copper-400 transition-all duration-300 flex flex-col justify-between cursor-pointer group select-none"
              id={`project-card-${idx}`}
            >
              {/* Image Frame */}
              <div className="h-2/3 w-full overflow-hidden relative border border-travertine-100">
                <img
                  src={`/projects/${project.image}`}
                  alt={project.name}
                  loading="lazy"
                  width={300}
                  height={220}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter contrast-[0.95]"
                />
                <div className="absolute inset-0 bg-copper-500/5 mix-blend-multiply group-hover:bg-transparent transition-all" />
              </div>

              {/* Title & Accent */}
              <div className="pt-4 flex-1 flex flex-col justify-between">
                <div className="h-[1px] w-full bg-travertine-200 mb-2" />
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-[15px] font-semibold text-charcoal-900 tracking-wide uppercase">
                    {project.name}
                  </h3>
                  <span className="font-mono text-[9px] tracking-widest text-copper-500 uppercase font-semibold">
                    Descubrir
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Fixed "Más opciones disponibles" card */}
          <div
            onClick={onScrollToContact}
            className="min-w-[280px] sm:min-w-[320px] max-w-[320px] aspect-[3/4] bg-transparent border border-dashed border-travertine-300 hover:border-copper-400 transition-all duration-300 snap-start p-8 flex flex-col justify-center items-center text-center cursor-pointer group"
            id="project-card-more"
          >
            <div className="w-12 h-12 rounded-full border border-travertine-200 flex items-center justify-center text-copper-500 bg-white group-hover:bg-copper-500 group-hover:text-white group-hover:border-copper-500 transition-all duration-300 mb-4">
              <Plus size={20} />
            </div>
            <h3 className="font-serif text-lg font-light text-charcoal-950 mb-2">
              Más opciones disponibles
            </h3>
            <p className="font-sans text-xs text-charcoal-600 font-light max-w-[200px] leading-relaxed mb-4">
              Jade tiene acceso a proyectos exclusivos en planos y construcción en todo el país.
            </p>
            <span className="font-mono text-[9px] tracking-widest text-copper-600 uppercase font-bold group-hover:text-copper-700 transition-colors">
              Contactar Asesora &rarr;
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

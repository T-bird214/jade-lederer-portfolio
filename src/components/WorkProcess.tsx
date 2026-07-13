/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WORK_STEPS } from "../data";
import { ArrowRight } from "lucide-react";

export default function WorkProcess() {
  return (
    <section id="proceso" className="bg-travertine-50 py-24 border-b border-travertine-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mb-16">
          <span className="font-mono text-xs text-copper-600 uppercase tracking-widest block font-semibold">
            Metodología de Trabajo
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal-900 leading-tight">
            El Camino Hacia tu Nuevo Hogar, <br />
            <span className="font-serif italic text-copper-600 font-normal">Paso a Paso.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            Un proceso consultivo y blindado donde Jade asume la carga administrativa, bancaria y de negociación, asegurando que tomes decisiones informadas y sin estrés.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="proceso-grid">
          {WORK_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-travertine-200 p-8 rounded-none relative overflow-hidden group hover:border-copper-400 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
            >
              {/* Giant Serif Step Number */}
              <div className="absolute top-4 right-6 font-serif text-5xl font-extralight text-travertine-200/80 select-none group-hover:text-copper-200 transition-colors">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="space-y-4 relative z-10">
                <div className="font-mono text-[9px] tracking-[0.2em] text-copper-500 uppercase font-bold">
                  Fase de Acompañamiento
                </div>
                <h3 className="font-serif text-lg font-light text-charcoal-950 pr-8">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-charcoal-700 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom connecting visual line */}
              {idx < WORK_STEPS.length - 1 && (
                <div className="hidden lg:flex items-center space-x-1 text-travertine-400 group-hover:text-copper-500 transition-colors pt-4 mt-auto">
                  <span className="text-[10px] font-mono tracking-widest uppercase">Siguiente paso</span>
                  <ArrowRight size={12} />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

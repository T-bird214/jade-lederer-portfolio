/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EXPERIENCES } from "../data";
import { Calendar, Sparkles, Building2 } from "lucide-react";
import { motion } from "motion/react";

export default function Timeline() {
  return (
    <section id="experiencia" className="bg-travertine-100 py-24 border-b border-travertine-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-copper-600 uppercase tracking-widest block font-semibold">
            Trayectoria Profesional
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal-900">
            Experiencia Comercial e Inmobiliaria
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal-600 font-light max-w-md mx-auto leading-relaxed">
            Un historial sólido y de alto nivel en corretaje inmobiliario, con un enfoque consultivo de principio a fin.
          </p>
        </div>

        {/* Timeline Content */}
        <div className="max-w-3xl mx-auto relative pl-6 md:pl-10 border-l border-travertine-300 space-y-12" id="timeline-list">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline node icon */}
              <div className="absolute -left-[30px] md:-left-[46px] top-4 w-3 h-3 rotate-45 bg-travertine-50 border border-travertine-400 group-hover:border-copper-500 group-hover:bg-copper-500 transition-all duration-300 z-10" />

              <div className="bg-white border border-travertine-200 p-8 rounded-none hover:border-copper-400 transition-all duration-300">
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-travertine-100">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-lg md:text-xl font-light text-charcoal-950">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-widest text-white bg-copper-600">
                          Proyecto Actual
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-copper-600 font-semibold uppercase tracking-wider">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-travertine-700 bg-travertine-100 px-3 py-1.5 rounded-none border border-travertine-200/50 self-start sm:self-center uppercase tracking-widest">
                    <Calendar size={11} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="space-y-3 font-sans text-xs leading-relaxed font-light text-charcoal-700">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <Sparkles size={13} className="text-copper-500 flex-shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

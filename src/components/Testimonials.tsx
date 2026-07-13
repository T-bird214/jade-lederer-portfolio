/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TESTIMONIALS } from "../data";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-travertine-50 py-24 border-b border-travertine-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-copper-600 uppercase tracking-widest block font-semibold">
            Casos de Éxito y Reseñas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal-900">
            Familias e Inversionistas que Confían en Jade
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal-600 font-light max-w-md mx-auto leading-relaxed">
            La mejor prueba del estándar de servicio premium de Jade es la voz de quienes compraron su vivienda de forma segura y transparente.
          </p>
        </div>

        {/* Bento Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonios-grid">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-travertine-200 p-8 rounded-none relative flex flex-col justify-between hover:border-copper-400 transition-all duration-300 group"
            >
              {/* Corner quote mark */}
              <div className="absolute top-6 right-6 text-travertine-100 group-hover:text-copper-200 transition-colors">
                <Quote size={40} className="stroke-[1.5px]" />
              </div>

              {/* Quote Content */}
              <div className="space-y-4 relative z-10">
                {/* Visual Stars */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={11} className="fill-copper-500 text-copper-500" />
                  ))}
                </div>

                <p className="font-sans text-xs sm:text-sm text-charcoal-700 italic leading-relaxed font-light">
                  "{test.quote}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center space-x-4 border-t border-travertine-100 pt-6 mt-8">
                {/* Initials square box */}
                <div className="w-9 h-9 bg-travertine-100 border border-travertine-200 rounded-none flex items-center justify-center font-serif text-xs font-semibold text-copper-600 uppercase">
                  {test.avatarInitials}
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-xs text-charcoal-950">
                    {test.name}
                  </h4>
                  <p className="font-mono text-[9px] text-travertine-600 tracking-wider uppercase font-semibold">
                    {test.role} {test.project ? `· ${test.project}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

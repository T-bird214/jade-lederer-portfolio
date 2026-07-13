/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PARTNERS, CAPO_PARTNER } from "../content/partners";
import { Sparkles, ExternalLink } from "lucide-react";

export default function PartnersSection() {
  return (
    <section id="aliados" className="bg-travertine-100 py-24 border-b border-travertine-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mb-16 text-left">
          <span className="font-mono text-xs text-copper-600 uppercase tracking-widest block font-semibold">
            Red de Confianza
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal-900 leading-tight">
            Servicios Complementarios <br />
            <span className="font-serif italic text-copper-600 font-normal">Aliados de Jade</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            Una selección exclusiva de proveedores estratégicos con estándares premium para complementar la adquisición de tu nuevo hogar.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" id="partners-grid">
          
          {/* Main 3 Partners */}
          {PARTNERS.map((partner, idx) => {
            const isPlaceholder = partner.isPlaceholderLink;
            
            return (
              <div
                key={idx}
                className="bg-white border border-travertine-200 p-6 rounded-none flex flex-col justify-between group hover:border-copper-400 transition-all duration-300"
                id={`partner-card-${idx}`}
              >
                <div className="space-y-4">
                  {/* Partner Cover Image with logo overlay */}
                  <div className="h-40 w-full overflow-hidden relative border border-travertine-100 bg-travertine-50">
                    {/* Placeholder image representation with elegant gradient / text until assets exist */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-travertine-200/80 to-travertine-100/30 flex items-center justify-center font-serif text-xl font-light italic text-copper-700/60 select-none">
                      {partner.name}
                    </div>
                    {/* ReferrerPolicy is required on images */}
                    <img
                      src={`/partners/${partner.image}`}
                      alt={partner.name}
                      loading="lazy"
                      onError={(e) => {
                        // Suppress console broken image icon and fallback to styled placeholder
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                      className="absolute inset-0 w-full h-full object-cover filter contrast-[0.95] group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-copper-500/5 mix-blend-multiply" />
                  </div>

                  {/* Logo / Brand Name and Description */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-[15px] font-semibold text-charcoal-950 uppercase tracking-wide">
                      {partner.name}
                    </h3>
                    <p className="font-sans text-xs text-charcoal-700 font-light leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>

                {/* CTA with Link checking */}
                <div className="pt-6 border-t border-travertine-100 mt-6">
                  {isPlaceholder ? (
                    <div
                      title="Enlace próximamente disponible"
                      className="text-[10px] font-mono tracking-widest text-travertine-400 uppercase font-semibold cursor-help block text-center"
                    >
                      Presiona la imagen para comunicarte con un asesor.
                    </div>
                  ) : (
                    <a
                      href={partner.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono tracking-widest text-copper-600 hover:text-charcoal-950 uppercase font-semibold block text-center transition-colors"
                    >
                      Presiona la imagen para comunicarte con un asesor.
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {/* 4th Card: CAPO (Style-Differentiated, Smaller) */}
          <div
            className="bg-transparent border border-dashed border-travertine-300 p-6 rounded-none flex flex-col justify-between hover:border-copper-400 transition-all duration-300"
            id="partner-card-capo"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-1.5 text-copper-600 font-mono text-[9px] uppercase tracking-widest font-bold">
                <Sparkles size={11} />
                <span>Integración Futura</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-[15px] font-semibold text-charcoal-900 tracking-wide uppercase">
                  {CAPO_PARTNER.name}
                </h3>
                <p className="font-sans text-xs text-charcoal-600 font-light leading-relaxed">
                  Automatización integral y CRM avanzado para corredores independientes de élite.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-travertine-200 mt-6">
              <a
                href={CAPO_PARTNER.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1 text-[10px] font-mono tracking-widest text-charcoal-900 hover:text-copper-600 uppercase font-bold transition-colors"
              >
                <span>{CAPO_PARTNER.label}</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

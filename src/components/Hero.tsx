/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowDown, Award, MapPin, Building2, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenAiAssistant: () => void;
  onScrollToContact: () => void;
}

export default function Hero({ onOpenAiAssistant, onScrollToContact }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-travertine-50 border-b border-travertine-200 flex flex-col justify-between pt-20"
    >
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 w-full max-w-7xl mx-auto px-6 md:px-12 gap-8 lg:gap-12 items-center py-12">
        
        {/* Left Column: Premium Editorial Typography & Content */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left" id="hero-left-col">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 text-copper-500 font-mono text-[11px] uppercase tracking-[0.3em] font-bold"
            id="hero-badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-copper-500" />
            <span>Asesoría Inmobiliaria Consultiva</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Massive Serif Headings styled like the mockup */}
            <h1 className="font-serif text-[60px] sm:text-[80px] lg:text-[90px] leading-[0.9] font-light -ml-1 tracking-tighter text-charcoal-900" id="hero-title">
              Jade <br />
              <span className="font-serif italic text-copper-500 font-light">Lederer.</span>
            </h1>
            
            <p className="font-serif text-lg sm:text-xl italic text-travertine-800 max-w-lg leading-relaxed" id="hero-tagline">
              "La confianza de comprar tu hogar, acompañado de principio a fin, con absoluto rigor técnico."
            </p>

            <p className="text-travertine-700 text-xs sm:text-sm max-w-md font-light leading-relaxed font-sans" id="hero-description">
              Portafolio profesional de una consejera de alto nivel. Con años de experiencia guiando con transparencia, ética y un servicio premium en las zonas residenciales de mayor plusvalía de Guatemala.
            </p>
          </motion.div>

          {/* Clean Flat Rectangular Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            id="hero-actions"
          >
            <button
              onClick={onScrollToContact}
              className="px-8 py-4 bg-charcoal-900 text-travertine-50 hover:bg-copper-500 transition-all font-mono text-[11px] uppercase tracking-[0.2em] font-semibold cursor-pointer text-center"
            >
              Iniciar Consulta
            </button>
            <button
              onClick={onOpenAiAssistant}
              className="px-6 py-4 border border-travertine-200 text-charcoal-900 bg-transparent hover:bg-travertine-100 transition-all font-mono text-[11px] uppercase tracking-[0.2em] font-semibold cursor-pointer text-center flex items-center justify-center space-x-2"
            >
              <span>Consultor IA</span>
              <Sparkles size={12} className="text-copper-500" />
            </button>
          </motion.div>

          {/* Operative Details list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-travertine-200 text-[10px] font-mono text-travertine-600 uppercase tracking-widest"
            id="hero-meta-coverage"
          >
            <div className="flex items-center space-x-2">
              <MapPin size={13} className="text-copper-500" />
              <span>Zonas: 2, 5, 6, 10, 11, 14, 15, 16, 17, 18</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 size={13} className="text-copper-500" />
              <span>Todo tipo de inversión inmobiliaria</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Architectural Display & Floating stats */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[400px] lg:min-h-0 bg-travertine-100 border border-travertine-200/60 p-8 rounded-3xl overflow-hidden group shadow-xs" id="hero-right-col">
          {/* Subtle design grid lines */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#A68A64_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          {/* Decorative rotated label like mockup */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[0.4em] text-travertine-500 whitespace-nowrap select-none font-mono hidden lg:block">
            Architectural Excellence
          </div>

          {/* Majestic Aspect Card Frame */}
          <div className="w-11/12 max-w-sm aspect-[3/4] bg-travertine-50 border border-travertine-200 p-4 shadow-xl relative overflow-hidden flex flex-col justify-between" id="hero-aspect-card">
            
            {/* Visual Frame Image */}
            <div className="h-2/5 w-full overflow-hidden relative border border-travertine-200">
              <img
                src="/images/hero-arquitectura.webp"
                alt="Arquitectura moderna minimalista con acabados en travertino"
                width={400}
                height={300}
                loading="eager"
                className="w-full h-full object-cover filter contrast-[0.95]"
                referrerPolicy="no-referrer"
                id="hero-frame-img"
              />
              <div className="absolute inset-0 bg-copper-500/10 mix-blend-multiply" />
            </div>

            {/* Bottom Section with solid lines and stats */}
            <div className="space-y-4 pt-4 flex-1 flex flex-col justify-end">
              <div className="h-[1px] w-full bg-charcoal-900 mb-2 opacity-80" />
              
              <div className="space-y-4" id="hero-aspect-stats">
                {/* Real stat 1 */}
                <div className="flex items-start space-x-3">
                  <div className="p-1 text-copper-500">
                    <Award size={14} />
                  </div>
                  <div>
                    <span className="block text-[14px] font-serif font-semibold text-charcoal-900">100+ Proyectos</span>
                    <span className="block text-[10px] text-travertine-700 font-sans font-light">Asesorados y canalizados con éxito</span>
                  </div>
                </div>

                {/* Real stat 2 */}
                <div className="flex items-start space-x-3">
                  <div className="p-1 text-copper-500">
                    <Building2 size={14} />
                  </div>
                  <div>
                    <span className="block text-[14px] font-serif font-semibold text-charcoal-900">9 Cierres Récord</span>
                    <span className="block text-[10px] text-travertine-700 font-sans font-light">Cerrados en un solo fin de semana en Palo Blanco</span>
                  </div>
                </div>
              </div>

              {/* Minimalist rotated/footer signature */}
              <div className="pt-2 border-t border-travertine-200 flex justify-between items-center text-[8px] font-mono text-travertine-600 tracking-wider uppercase">
                <span>Guatemala City</span>
                <span>Experience & Trust</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer statistics ribbon styled like the mockup footer */}
      <div className="w-full border-t border-travertine-200 bg-travertine-100/50 py-6" id="hero-ribbon">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-16">
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-travertine-500 mb-1 font-mono">Respaldo Profesional</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-900">Asesoría Bancaria Completa</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-travertine-500 mb-1 font-mono">Efectividad de Cierres</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-900">Inversión y FHA Certificado</span>
            </div>
          </div>
          
          <button
            onClick={() => {
              const el = document.getElementById("perfil");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-copper-600 hover:text-charcoal-900 transition-colors group cursor-pointer"
          >
            <span>Descubrir Más</span>
            <ArrowDown size={12} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}

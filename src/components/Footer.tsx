/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Mail, MapPin, Building, ShieldCheck, ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal-950 text-travertine-100 py-16 border-t border-white/10" id="portfolio-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand details (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-col items-start">
              <span className="font-serif text-xl tracking-tighter font-bold uppercase text-white">
                JADE LEDERER<span className="text-copper-500">.</span>
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-copper-400 uppercase font-semibold block mt-1">
                Asesora Inmobiliaria · Guatemala
              </span>
            </div>
            <p className="text-xs text-travertine-400 leading-relaxed font-light font-sans max-w-xs">
              Servicios de corretaje y asesoría consultiva residencial, proyectos de inversión e inmuebles residenciales en las zonas de mayor plusvalía de la Ciudad de Guatemala.
            </p>
          </div>

          {/* Col 2: Fast Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-sans font-semibold text-xs text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Secciones
            </h4>
            <ul className="space-y-2.5 text-xs text-travertine-400 font-light">
              {[
                { label: "Perfil Profesional", id: "perfil" },
                { label: "Experiencia & Cierres", id: "experiencia" },
                { label: "Proceso de Trabajo", id: "proceso" },
                { label: "Especialidades Técnicas", id: "especialidades" },
                { label: "Testimonios", id: "testimonios" },
                { label: "Preguntas Frecuentes", id: "faq" }
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-copper-400 transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Operations & Zonas (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-sans font-semibold text-xs text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Zonas de Enfoque
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[9px] font-mono text-travertine-400">
              {["Zona 2", "Zona 5", "Zona 6", "Zona 10", "Zona 11", "Zona 14", "Zona 15", "Zona 16", "Zona 17", "Zona 18"].map((zone, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-none bg-white/5 border border-white/10"
                >
                  {zone}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-copper-400 pt-2 font-mono">
              <MapPin size={12} />
              <span>Ciudad de Guatemala, GT</span>
            </div>
          </div>

          {/* Col 4: Action / Top button (2 cols) */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-between">
            <button
              onClick={handleScrollToTop}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-none text-travertine-300 hover:text-white transition-all duration-300 cursor-pointer self-start md:self-end"
              title="Ir al inicio"
              id="footer-back-to-top"
            >
              <ArrowUp size={16} />
            </button>
            <div className="flex items-center space-x-1.5 text-[9px] font-mono text-travertine-500 uppercase font-semibold mt-4 md:mt-0">
              <ShieldCheck size={12} className="text-copper-400" />
              <span>Código Seguro</span>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer and Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px] font-light text-travertine-500 font-sans">
          <div>
            &copy; {new Date().getFullYear()} Jade Lederer. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4">
            <span>Guatemala City, Centroamérica</span>
            <span>&middot;</span>
            <span>Asesoría Inmobiliaria Certificada</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

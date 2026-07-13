/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JADE_PROFILE, VALUES } from "../data";
import { CheckCircle2, ShieldAlert, MapPin, Globe } from "lucide-react";

export default function Profile() {
  return (
    <section id="perfil" className="bg-travertine-50 py-24 border-b border-travertine-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Biography, Languages and Zones (5 cols) */}
          <div className="lg:col-span-5 space-y-10" id="perfil-info">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal-900 leading-tight">
                Asesoría con <br />
                <span className="font-serif italic text-copper-600 font-normal">Sello Humano</span> y Rigor Corporativo.
              </h2>
            </div>

            <p className="font-sans text-sm text-charcoal-700 leading-relaxed font-light">
              {JADE_PROFILE.bio}
            </p>

            {/* Coverage Zones */}
            <div className="space-y-4 border-t border-travertine-200 pt-8">
              <h4 className="font-sans font-semibold text-xs text-charcoal-800 uppercase tracking-wider flex items-center space-x-2">
                <MapPin size={14} className="text-copper-600" />
                <span>Zonas de Cobertura Preferente (GT)</span>
              </h4>
              <div className="flex flex-wrap gap-2" id="perfil-zones-list">
                {JADE_PROFILE.zones.map((zone, idx) => {
                  const isLast = idx === JADE_PROFILE.zones.length - 1;
                  return (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all duration-300 ${
                        isLast
                          ? "bg-transparent border-dashed border-copper-300 text-copper-600 font-normal opacity-80"
                          : "bg-travertine-100 border-travertine-200 text-charcoal-900"
                      }`}
                    >
                      {zone}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2 pt-6 border-t border-travertine-200">
              <h5 className="font-sans font-semibold text-xs text-charcoal-800 uppercase tracking-wider flex items-center space-x-1.5">
                <Globe size={13} className="text-copper-600" />
                <span>Idiomas</span>
              </h5>
              <div className="flex flex-wrap gap-x-8 gap-y-1">
                {JADE_PROFILE.languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-light">
                    <span className="text-charcoal-600">{lang.name}</span>
                    <span className="font-mono font-medium text-copper-700">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Personal Values (7 cols) */}
          <div className="lg:col-span-7 space-y-8" id="perfil-valores">
            <div className="space-y-2 mb-4">
              <span className="font-mono text-xs text-copper-600 uppercase tracking-widest block font-semibold">
                Filosofía de Trabajo
              </span>
              <h3 className="font-serif text-2xl font-light text-charcoal-900">
                Los Pilares que Aseguran tu Inversión
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES.map((val) => (
                <div
                  key={val.id}
                  className="bg-white border border-travertine-200 p-6 rounded-none hover:border-copper-400 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-copper-500">
                      <CheckCircle2 size={14} />
                      <h4 className="font-sans font-semibold text-[11px] uppercase tracking-widest text-charcoal-900">
                        {val.title}
                      </h4>
                    </div>
                    <p className="font-sans text-xs text-charcoal-700 font-light leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust banner */}
            <div className="bg-travertine-100 border border-travertine-200 p-6 rounded-none flex items-start space-x-4">
              <ShieldAlert size={16} className="text-copper-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-xs font-semibold text-charcoal-900 uppercase tracking-widest">
                  Garantía de Acompañamiento Directo
                </h5>
                <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                  En el mercado inmobiliario actual de Guatemala, muchas agencias subcontratan el servicio. Jade Lederer asume la responsabilidad completa de tu expediente de forma personal, gestionando directamente las negociaciones y pre-calificaciones para blindar tu patrimonio.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

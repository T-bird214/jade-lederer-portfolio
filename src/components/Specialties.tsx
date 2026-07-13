/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Target, Check } from "lucide-react";

export default function Specialties() {
  const coreSpecialties = [
    {
      title: "Proyectos en Construcción",
      desc: "Especialista en coordinar lanzamientos, estructurar planes de enganche fraccionado y analizar la rentabilidad de proyectos desde planos preliminares."
    },
    {
      title: "Gestión de Crédito Hipotecario",
      desc: "Estructura expedientes óptimos y gestiona la pre-calificación directamente con todos los bancos del país, agilizando aprobaciones del FHA o financiamiento directo."
    },
    {
      title: "Marketing Digital Profesional",
      desc: "Configura, pauta y optimiza campañas de marketing digital para garantizar un flujo continuo de interesados calificados."
    },
    {
      title: "Venta Consultiva Personalizada",
      desc: "Perfilamiento ágil de clientes internacionales y locales basado en empatía, discreción y una profunda ética profesional de servicio."
    }
  ];

  return (
    <section id="especialidades" className="bg-travertine-100 py-24 border-b border-travertine-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Grid Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs text-copper-600 uppercase tracking-widest block font-semibold">
              Competencias de Vanguardia
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal-900 leading-tight">
              Especialidades Comerciales e <br />
              <span className="font-serif italic text-copper-600 font-normal">Inversión Estratégica</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
              Jade Lederer rompe con el esquema del corredor tradicional. Acompaña a sus clientes de principio a fin, estructurando análisis financieros profundos y asesorando la toma de decisiones con datos reales para blindar el ciclo de inversión.
            </p>
          </div>
        </div>

        {/* Split Specialties and Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Core Specialties (7 cols) */}
          <div className="lg:col-span-7 space-y-6" id="specialties-cards">
            <h3 className="font-mono text-[10px] tracking-widest text-charcoal-500 uppercase font-semibold">
              Áreas de Enfoque Estratégico:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreSpecialties.map((spec, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-travertine-200 p-6 rounded-none hover:border-copper-400 transition-all duration-300"
                >
                  <div className="w-6 h-6 bg-travertine-100 border border-travertine-200 flex items-center justify-center text-copper-500 mb-4">
                    <Check size={12} />
                  </div>
                  <h4 className="font-serif text-[14px] font-semibold text-charcoal-950 mb-2">
                    {spec.title}
                  </h4>
                  <p className="font-sans text-xs text-charcoal-700 font-light leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Commercial Specialties Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-travertine-200 p-8 rounded-none space-y-8" id="specialties-bento-card">
            <h3 className="font-mono text-[10px] tracking-widest text-charcoal-500 uppercase font-semibold border-b border-travertine-100 pb-3">
              Enfoque Comercial y Portafolio
            </h3>
            
            <div className="space-y-6">
              <p className="font-sans text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed">
                Jade Lederer centra su asesoría en cuatro segmentos clave del mercado inmobiliario guatemalteco, asegurando un acompañamiento estratégico según el perfil de cada cliente:
              </p>
              
              <div className="space-y-4">
                {[
                  { name: "Vivienda de Alta Gama", desc: "Propiedades premium con acabados de primera en ubicaciones exclusivas." },
                  { name: "Primera Vivienda", desc: "Asesoría empática para jóvenes y familias en su primera adquisición." },
                  { name: "Inversión Residencial", desc: "Análisis de plusvalía y retorno de inversión para perfiles inversores." },
                  { name: "Proyectos en Construcción", desc: "Opciones de compra en planos con facilidades de enganche fraccionado." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-travertine-100 border border-travertine-200 flex items-center justify-center text-copper-500 mt-0.5 flex-shrink-0">
                      <span className="text-[9px] font-mono font-bold">0{idx+1}</span>
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-charcoal-900 uppercase tracking-wider">
                        {item.name}
                      </h4>
                      <p className="font-sans text-[11px] text-charcoal-600 font-light mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-travertine-100 border border-travertine-200 rounded-none">
              <p className="text-[10px] text-charcoal-800 leading-normal font-light">
                <strong>Enfoque integral:</strong> Desde el análisis financiero inicial hasta la firma de tu escritura, Jade garantiza un proceso ágil y estructurado para tu total tranquilidad.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ACHIEVEMENTS } from "../data";
import { Building, TrendingUp, Users } from "lucide-react";

export default function Achievements() {
  const getIcon = (id: string) => {
    switch (id) {
      case "ach-1":
        return <Building className="text-copper-600" size={24} />;
      case "ach-2":
        return <TrendingUp className="text-copper-600" size={24} />;
      case "ach-3":
        return <Users className="text-copper-600" size={24} />;
      default:
        return <Building className="text-copper-600" size={24} />;
    }
  };

  return (
    <section className="bg-travertine-50 py-16 border-b border-travertine-200" id="logros-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="logros-grid">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className="bg-travertine-50 border border-travertine-200 p-8 rounded-none relative overflow-hidden group hover:bg-white hover:border-copper-400 transition-all duration-300"
            >
              {/* Corner accent decorative lines */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-travertine-200 opacity-60 group-hover:border-copper-400 group-hover:opacity-100 transition-colors" />

              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-travertine-100 border border-travertine-200 text-copper-500 group-hover:border-copper-200 transition-colors">
                  {getIcon(ach.id)}
                </div>
                <span className="font-mono text-[9px] text-travertine-600 uppercase tracking-[0.2em] font-semibold">
                  Métrica de Éxito
                </span>
              </div>

              <div className="space-y-2">
                <div className="font-serif text-4xl lg:text-5xl font-light text-charcoal-900 tracking-tight flex items-baseline">
                  {ach.metric}
                </div>
                <h4 className="font-sans font-semibold text-[11px] uppercase tracking-widest text-charcoal-900">
                  {ach.label}
                </h4>
                <p className="font-sans text-xs text-charcoal-600 font-light leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

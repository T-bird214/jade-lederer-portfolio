/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-travertine-50 py-24 border-b border-travertine-200">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-copper-600 uppercase tracking-widest block font-semibold">
            Resolución de Dudas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal-900">
            Preguntas Frecuentes
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal-600 font-light max-w-md mx-auto leading-relaxed">
            Las respuestas clave que necesitas saber antes de iniciar tu búsqueda de vivienda, compra en fase de construcción o solicitud de financiamiento bancario en Guatemala.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4" id="faq-accordion-list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-travertine-200 rounded-none overflow-hidden hover:border-copper-400 transition-all duration-300"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                  id={`faq-trigger-${faq.id}`}
                >
                  <div className="flex items-start space-x-3.5 pr-4">
                    <HelpCircle size={16} className="text-copper-500 mt-0.5 flex-shrink-0" />
                    <h3 className="font-sans font-semibold text-[11px] uppercase tracking-wider text-charcoal-900">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="text-travertine-600">
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-travertine-100/50 text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, MessageSquareText } from "lucide-react";

interface NavbarProps {
  onOpenAiAssistant: () => void;
}

export default function Navbar({ onOpenAiAssistant }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-travertine-50/90 backdrop-blur-md border-b border-travertine-200 shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Branding Title */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-start text-left cursor-pointer group"
          id="nav-logo"
        >
          <span className="font-serif text-xl tracking-tighter font-bold uppercase text-charcoal-900 group-hover:text-copper-500 transition-colors">
            JADE LEDERER<span className="text-copper-500">.</span>
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-travertine-600 uppercase">
            Asesoría Inmobiliaria · GT
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-semibold" id="nav-desktop-links">
          {[
            { label: "Perfil", id: "perfil" },
            { label: "Trayectoria", id: "experiencia" },
            { label: "Proceso", id: "proceso" },
            { label: "Especialidades", id: "especialidades" },
            { label: "Testimonios", id: "testimonios" },
            { label: "Preguntas", id: "faq" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-travertine-700 hover:text-charcoal-900 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4" id="nav-actions">
          {/* AI Advisor Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center space-x-2 text-xs font-mono px-4 py-2 rounded-full border border-copper-200 text-copper-700 bg-copper-50 hover:bg-copper-100/60 transition-all duration-200 cursor-pointer"
            id="nav-ai-btn"
          >
            <MessageSquareText size={14} className="text-copper-500 animate-pulse" />
            <span>Asistente Virtual IA</span>
          </button>

          {/* Contact CTA */}
          <button
            onClick={() => scrollToSection("contacto")}
            className="flex items-center space-x-2 text-xs font-medium px-5 py-2.5 rounded-full bg-charcoal-900 text-travertine-50 hover:bg-copper-700 hover:shadow-md transition-all duration-300 cursor-pointer"
            id="nav-contact-btn"
          >
            <span>Iniciar Asesoría</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex items-center space-x-2 lg:hidden" id="nav-mobile-trigger-container">
          <button
            onClick={onOpenAiAssistant}
            className="p-2 text-copper-700 bg-copper-50 rounded-full border border-copper-100"
            title="Asistente Virtual"
            id="nav-mobile-ai-btn"
          >
            <MessageSquareText size={16} />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-charcoal-800 hover:text-copper-600 transition-colors"
            aria-label="Toggle Menu"
            id="nav-mobile-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-[70px] bg-travertine-50 border-b border-travertine-200 shadow-lg px-6 py-8 flex flex-col space-y-6 z-40 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
          id="nav-mobile-panel"
        >
          <div className="flex flex-col space-y-4 text-center">
            {[
              { label: "Perfil Profesional", id: "perfil" },
              { label: "Trayectoria y Cierres", id: "experiencia" },
              { label: "Proceso de Trabajo", id: "proceso" },
              { label: "Especialidades y Herramientas", id: "especialidades" },
              { label: "Testimonios", id: "testimonios" },
              { label: "Preguntas Frecuentes", id: "faq" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-base text-charcoal-700 hover:text-copper-600 transition-colors font-medium py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-travertine-200 pt-6 flex flex-col space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAiAssistant();
              }}
              className="flex items-center justify-center space-x-2 font-mono text-sm py-3 rounded-xl border border-copper-200 text-copper-700 bg-copper-50 hover:bg-copper-100 transition-colors cursor-pointer"
              id="nav-mobile-ai-action"
            >
              <MessageSquareText size={16} />
              <span>Chatear con Asistente IA</span>
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="flex items-center justify-center space-x-2 font-medium py-3 rounded-xl bg-charcoal-900 text-travertine-50 hover:bg-copper-700 transition-colors cursor-pointer"
              id="nav-mobile-contact-action"
            >
              <span>Iniciar Asesoría</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

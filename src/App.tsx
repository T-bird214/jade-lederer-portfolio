/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Achievements from "./components/Achievements";
import Profile from "./components/Profile";
import Specialties from "./components/Specialties";
import ProjectsCarousel from "./components/ProjectsCarousel";
import PartnersSection from "./components/PartnersSection";
import Timeline from "./components/Timeline";
import WorkProcess from "./components/WorkProcess";
import AiAssistant from "./components/AiAssistant";
import Testimonials from "./components/Testimonials";
import FaqSection from "./components/FaqSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { MessageSquareText } from "lucide-react";

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);

  const handleOpenAi = () => {
    setIsAiOpen(true);
  };

  const handleScrollToContact = () => {
    const el = document.getElementById("contacto");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-travertine-50 flex flex-col font-sans" id="app-root">
      {/* Sticky top premium header */}
      <Navbar onOpenAiAssistant={handleOpenAi} />

      {/* Main layout contents */}
      <main className="flex-grow">
        {/* Architectural Hero intro */}
        <Hero onOpenAiAssistant={handleOpenAi} onScrollToContact={handleScrollToContact} />

        {/* Dynamic highlighted stats cards */}
        <Achievements />

        {/* Profile, bio, operation zones and values */}
        <Profile />

        {/* Multi-tier timeline switcher: Real Estate vs. Corporate */}
        <Timeline />

        {/* 5-step sequential buying accompaniment guide */}
        <WorkProcess />

        {/* Digital infrastructure & specialist skills bento */}
        <Specialties />

        {/* Featured projects catalog */}
        <ProjectsCarousel onOpenAiAssistant={handleOpenAi} onScrollToContact={handleScrollToContact} />

        {/* Red de aliados y servicios complementarios */}
        <PartnersSection />

        {/* Client & investor social proof reviews */}
        <Testimonials />

        {/* FAQ hipotecario y de compra en fase de construcción */}
        <FaqSection />

        {/* Pre-qualification and contact CRM engine */}
        <ContactForm />
      </main>

      {/* Bottom high-contrast clean footer */}
      <Footer />

      {/* Persistent floating AI Consult Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block" id="app-floating-ai-trigger">
        <button
          onClick={handleOpenAi}
          className="group relative flex items-center justify-center p-4 rounded-full bg-charcoal-900 hover:bg-copper-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/10"
          title="Consultar Asistente Inmobiliario Virtual"
        >
          {/* Pulsing ring outline */}
          <span className="absolute inset-0 rounded-full border border-copper-400 animate-ping opacity-60" />
          
          <MessageSquareText size={20} className="relative z-10" />
          
          {/* Hover tooltips */}
          <span className="absolute right-14 bg-charcoal-950 text-travertine-100 text-[10px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md border border-white/5">
            Asistente IA Jade
          </span>
        </button>
      </div>

      {/* Concierge Side Drawer chatbot model */}
      <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}

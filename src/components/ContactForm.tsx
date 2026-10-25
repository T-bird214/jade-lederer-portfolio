/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, CheckCircle2, Phone, Mail, Clock, ShieldCheck, Landmark, Linkedin, MessageCircle } from "lucide-react";
import { JADE_PROFILE } from "../data";
import { sendContact } from "../lib/contact";
import { whatsappUrl } from "../lib/whatsapp";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Comprar Apartamento / Casa",
    zone: "Zona 10",
    step: "Explorando opciones iniciales",
    message: "",
    website: "" // Honeypot spam field
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const zones = [
    "Zona 2",
    "Zona 5",
    "Zona 6",
    "Zona 10",
    "Zona 11",
    "Zona 14",
    "Zona 15",
    "Zona 16",
    "Zona 17",
    "Zona 18"
  ];

  const steps = [
    "Explorando opciones iniciales",
    "Listo para pre-calificar crédito bancario",
    "Listo para realizar reserva inmediata"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMessage("Por favor, introduce tu nombre y correo electrónico.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await sendContact(formData);

      if (data.success) {
        setSuccessMessage(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "Comprar Apartamento / Casa",
          zone: "Zona 10",
          step: "Explorando opciones iniciales",
          message: "",
          website: ""
        });
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error en submit de contacto:", error);
      setErrorMessage("No se pudo conectar con el servidor. Por favor intenta más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const waContactUrl = whatsappUrl();
  const waFormUrl = whatsappUrl(
    [
      `Hola Jade, soy ${formData.name || "…"}.`,
      `Me interesa: ${formData.interest} en ${formData.zone}.`,
      `Etapa: ${formData.step}.`,
      formData.message
    ].filter(Boolean).join(" ")
  );

  return (
    <section id="contacto" className="bg-travertine-100 py-24 border-b border-travertine-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left info column (5 cols) */}
          <div className="lg:col-span-5 space-y-10" id="contacto-info-col">
            <div className="space-y-4">
              <span className="font-mono text-xs text-copper-600 uppercase tracking-widest block font-semibold">
                Iniciar Proceso
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-charcoal-900 leading-tight">
                Agenda tu Sesión de <br />
                <span className="font-serif italic text-copper-600 font-normal">Perfilación Inmobiliaria</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Da el primer paso con absoluta seguridad. Completa el formulario con tus preferencias básicas de zona e inversión y Jade preparará una selección curada antes de llamarte.
              </p>
            </div>

            {/* Direct contact info */}
            <div className="space-y-6 border-t border-travertine-200 pt-8" id="contacto-direct-details">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-white border border-travertine-200 text-copper-500">
                  <Phone size={14} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[10px] text-charcoal-800 uppercase tracking-[0.15em]">
                    Llamada Directa
                  </h4>
                  <a
                    href={`tel:+${JADE_PROFILE.phone.replace(/[^0-9]/g, "")}`}
                    className="font-serif text-base text-charcoal-950 hover:text-copper-500 transition-colors"
                  >
                    {JADE_PROFILE.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              {waContactUrl && (
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white border border-travertine-200 text-copper-500">
                    <MessageCircle size={14} />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-[10px] text-charcoal-800 uppercase tracking-[0.15em]">
                      WhatsApp
                    </h4>
                    <a
                      href={waContactUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-base text-charcoal-950 hover:text-copper-500 transition-colors"
                    >
                      Escribir por WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-white border border-travertine-200 text-copper-500">
                  <Mail size={14} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[10px] text-charcoal-800 uppercase tracking-[0.15em]">
                    Correo de Atención Profesional
                  </h4>
                  <a
                    href={`mailto:${JADE_PROFILE.email}`}
                    className="font-serif text-base text-charcoal-950 hover:text-copper-500 transition-colors"
                  >
                    {JADE_PROFILE.email}
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-white border border-travertine-200 text-copper-500">
                  <Linkedin size={14} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[10px] text-charcoal-800 uppercase tracking-[0.15em]">
                    Perfil Profesional
                  </h4>
                  <a
                    href={JADE_PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-base text-charcoal-950 hover:text-copper-500 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Response rate */}
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-white border border-travertine-200 text-copper-500">
                  <Clock size={14} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-[10px] text-charcoal-800 uppercase tracking-[0.15em]">
                    Tiempo de Respuesta Garantizado
                  </h4>
                  <p className="font-serif text-sm text-charcoal-950 font-light">
                    Menos de 24 horas en días hábiles
                  </p>
                </div>
              </div>
            </div>

            {/* Security stamp */}
            <div className="bg-white border border-travertine-200 p-6 rounded-none flex items-center space-x-3.5 shadow-sm">
              <ShieldCheck size={24} className="text-copper-500 flex-shrink-0" />
              <div className="space-y-0.5">
                <h5 className="text-[11px] font-semibold text-charcoal-900 uppercase tracking-widest">
                  Tratamiento de Datos Confidencial
                </h5>
                <p className="text-[10px] text-charcoal-700 leading-normal font-light">
                  Toda tu información financiera, números de teléfono y presupuestos están protegidos bajo estricto secreto profesional. Jamás compartiremos tu información con terceros sin tu consentimiento.
                </p>
              </div>
            </div>
          </div>

          {/* Right form column (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-travertine-200 p-8 sm:p-10 rounded-none relative overflow-hidden" id="contacto-form-col">
            {/* Fine line highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-charcoal-900" />

            {successMessage ? (
              /* Success Panel */
              <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300" id="contact-success-state">
                <div className="w-16 h-16 bg-travertine-100 border border-travertine-200 rounded-none flex items-center justify-center text-copper-500 mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-light text-charcoal-950">
                    ¡Asesoría Solicitada con Éxito!
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-charcoal-700 font-light max-w-md mx-auto leading-relaxed">
                    {successMessage}
                  </p>
                </div>
                <div className="bg-travertine-50 border border-travertine-200 p-5 rounded-none flex items-start space-x-3.5 text-left max-w-md mx-auto">
                  <Landmark size={16} className="text-copper-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-charcoal-700 leading-normal font-light">
                    <strong>Siguiente paso:</strong> Jade analizará los proyectos disponibles en la zona seleccionada y verificará las tasas hipotecarias vigentes para agilizar tu perfilamiento en nuestra primera llamada.
                  </p>
                </div>
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="px-6 py-3 border border-travertine-300 text-xs font-mono text-charcoal-700 hover:text-charcoal-900 hover:bg-travertine-100 transition-colors cursor-pointer rounded-none uppercase tracking-[0.15em] font-semibold"
                >
                  Enviar otro formulario
                </button>
              </div>
            ) : (
              /* Standard Form */
              <form onSubmit={handleSubmit} className="space-y-6" id="real-contact-form">
                <h3 className="font-serif text-xl font-light text-charcoal-950 mb-4 pb-3 border-b border-travertine-100">
                  Formulario de Pre-Calificación y Contacto
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-charcoal-600 uppercase font-semibold">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ej. Roberto Monterroso"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-travertine-50 border border-travertine-200 rounded-none px-4 py-3 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-copper-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-charcoal-600 uppercase font-semibold">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Ej. correo@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-travertine-50 border border-travertine-200 rounded-none px-4 py-3 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-copper-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-charcoal-600 uppercase font-semibold">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Ej. +502 4112 3456"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-travertine-50 border border-travertine-200 rounded-none px-4 py-3 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-copper-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Interest */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-charcoal-600 uppercase font-semibold">
                      Tipo de Inversión
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full bg-travertine-50 border border-travertine-200 rounded-none px-4 py-3 text-xs text-charcoal-900 focus:outline-none focus:border-copper-500 focus:bg-white transition-all"
                    >
                      <option>Comprar Apartamento / Casa</option>
                      <option>Inversión Residencial para Plusvalía</option>
                      <option>Alquiler Residencial Premium</option>
                      <option>Asesoría en Crédito Bancario</option>
                    </select>
                  </div>

                  {/* Honeypot field - website URL (invisible to humans) */}
                  <div className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none select-none h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Website (Do NOT fill)</label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Zone Preference */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-charcoal-600 uppercase font-semibold">
                      Zona de Preferencia (Guatemala)
                    </label>
                    <select
                      name="zone"
                      value={formData.zone}
                      onChange={handleChange}
                      className="w-full bg-travertine-50 border border-travertine-200 rounded-none px-4 py-3 text-xs text-charcoal-900 focus:outline-none focus:border-copper-500 focus:bg-white transition-all"
                    >
                      {zones.map((z, idx) => (
                        <option key={idx} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Purchase Step */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-charcoal-600 uppercase font-semibold">
                      Etapa de Compra Actual
                    </label>
                    <select
                      name="step"
                      value={formData.step}
                      onChange={handleChange}
                      className="w-full bg-travertine-50 border border-travertine-200 rounded-none px-4 py-3 text-xs text-charcoal-900 focus:outline-none focus:border-copper-500 focus:bg-white transition-all"
                    >
                      {steps.map((st, idx) => (
                        <option key={idx} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono tracking-widest text-charcoal-600 uppercase font-semibold">
                    Comentarios / Requerimientos Específicos
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Cuéntanos un poco sobre el número de habitaciones, presupuesto estimado, enganche acumulado, etc."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-travertine-50 border border-travertine-200 rounded-none px-4 py-3 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-copper-500 focus:bg-white transition-all resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="text-xs text-red-700 bg-red-50 border border-red-200 p-3.5 rounded-none">
                    {errorMessage}
                    {waFormUrl && (
                      <>
                        {" "}También puedes{" "}
                        <a href={waFormUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                          enviarle tu solicitud por WhatsApp
                        </a>.
                      </>
                    )}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-charcoal-900 hover:bg-copper-500 disabled:bg-travertine-300 text-white rounded-none transition-all duration-300 font-mono text-[11px] uppercase tracking-[0.2em] font-semibold cursor-pointer"
                  id="submit-contact-btn"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Solicitar Perfilamiento y Selección Curada</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

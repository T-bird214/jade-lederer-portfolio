/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles, AlertCircle, MessageSquare } from "lucide-react";
import { JADE_PROFILE } from "../data";

interface Message {
  sender: "user" | "assistant";
  text: string;
}

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiAssistant({ isOpen, onClose }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hola, soy el Asistente Virtual de Jade Lederer. Estoy aquí para resolver tus dudas sobre el mercado inmobiliario en Guatemala, requisitos de créditos hipotecarios, plusvalía de las zonas 5, 6, 10, 14, 15, 16, 17 y 18, u orientarte sobre el proceso de compra. ¿Cómo puedo ayudarte hoy?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setError(null);
    const newMessages = [...messages, { sender: "user", text: trimmed } as Message];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener respuesta del consejero virtual.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: data.reply }
      ]);
    } catch (err: any) {
      console.error("Error en chat virtual:", err);
      setError("No logré conectarme con el servidor. Por favor intenta de nuevo.");
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: `Lo lamento, experimenté una pequeña interrupción técnica. Puedes comunicarte directamente con Jade Lederer al ${JADE_PROFILE.phone} o escribir a ${JADE_PROFILE.email} para recibir tu asesoría personalizada.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "¿Qué papeles piden para pre-calificar a un crédito?",
    "¿En qué zonas de Guatemala opera Jade?",
    "¿Cuáles son las ventajas de comprar en fase de construcción?",
    "¿Tiene costo su asesoría para compradores?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="ai-assistant-wrapper">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-charcoal-950/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        id="ai-backdrop"
      />

      {/* Drawer Container */}
      <div
        className="relative w-full max-w-md h-full bg-travertine-50 border-l border-travertine-200 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
        id="ai-sidebar-drawer"
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-travertine-100 flex items-center justify-between" id="ai-header">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-copper-50 border border-copper-100 rounded-full flex items-center justify-center text-copper-600 shadow-inner">
              <Bot size={20} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-charcoal-900 tracking-wide flex items-center space-x-1.5">
                <span>Asistente de Jade</span>
                <Sparkles size={12} className="text-copper-500" />
              </h3>
              <p className="font-mono text-[9px] tracking-widest text-copper-600 uppercase font-bold">
                Módulo Consultivo IA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-charcoal-400 hover:text-charcoal-900 hover:bg-travertine-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar chat"
            id="ai-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-travertine-50/50" id="ai-chat-history">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse space-x-reverse" : ""
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 border shadow-sm ${
                  msg.sender === "user"
                    ? "bg-charcoal-900 text-white border-charcoal-800"
                    : "bg-white text-copper-600 border-travertine-200"
                }`}
              >
                {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl text-xs font-light leading-relaxed shadow-xs ${
                  msg.sender === "user"
                    ? "bg-charcoal-900 text-white rounded-tr-none"
                    : "bg-white text-charcoal-800 border border-travertine-200 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Thinking / Loading state */}
          {isLoading && (
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-white text-copper-600 border border-travertine-200 flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                <Bot size={14} className="animate-spin" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-white text-charcoal-400 border border-travertine-200 text-xs flex items-center space-x-2 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-copper-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-copper-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-copper-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center space-x-2 text-xs text-red-700 bg-red-50 border border-red-200 p-3.5 rounded-xl">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion list */}
        {messages.length === 1 && (
          <div className="px-6 py-4 bg-white border-t border-travertine-100 space-y-2.5" id="ai-suggestions">
            <p className="font-mono text-[9px] tracking-wider text-charcoal-500 uppercase font-semibold">
              Preguntas de sugerencia rápida:
            </p>
            <div className="flex flex-col space-y-2">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sug)}
                  className="w-full text-left p-3 rounded-xl border border-travertine-200 hover:border-copper-300 hover:bg-copper-50/40 text-xs text-charcoal-700 transition-all duration-200 cursor-pointer flex items-center space-x-2"
                >
                  <MessageSquare size={12} className="text-copper-500 flex-shrink-0" />
                  <span className="truncate">{sug}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Footer */}
        <div className="p-6 bg-white border-t border-travertine-100" id="ai-input-footer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta..."
              disabled={isLoading}
              className="flex-1 bg-travertine-100/70 border border-travertine-200 rounded-xl px-4 py-3.5 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-copper-400 focus:bg-white transition-colors"
              id="ai-text-input"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3.5 bg-charcoal-900 hover:bg-copper-600 disabled:bg-travertine-200 text-white rounded-xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
              id="ai-submit-btn"
            >
              <Send size={14} />
            </button>
          </form>
          <p className="text-[10px] text-charcoal-400 text-center font-light mt-3 leading-relaxed">
            Asistente virtual de pre-calificación entrenada con los estándares de Jade Lederer.
          </p>
        </div>
      </div>
    </div>
  );
}

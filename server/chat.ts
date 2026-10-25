/**
 * Lógica del asistente virtual (Gemini), compartida por:
 * - api/chat.ts  → función de Vercel (producción)
 * - server.ts    → Express (desarrollo local)
 *
 * Variables: GEMINI_API_KEY (obligatoria para respuestas con IA), GEMINI_MODEL (opcional).
 */

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { JADE_PROFILE, EXPERIENCES, WORK_STEPS, TESTIMONIALS, FAQS, VALUES } from "../src/data.js";
import { PROJECTS } from "../src/content/projects.js";
import { PARTNERS } from "../src/content/partners.js";
import type { ApiResult } from "./types.js";

const DEFAULT_MODEL = "gemini-3.5-flash";

// Límites para evitar abuso de la cuota gratuita de Gemini
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

const BUSINESS_CONTEXT = {
  profile: JADE_PROFILE,
  experiences: EXPERIENCES,
  workSteps: WORK_STEPS,
  testimonials: TESTIMONIALS,
  faqs: FAQS,
  values: VALUES,
  projects: PROJECTS,
  partners: PARTNERS
};

const SYSTEM_INSTRUCTION = `
Actúa como la Asistente Virtual Inteligente de Jade Lederer, Asesora Inmobiliaria de alta gama en Guatemala.
Tu tono debe ser extremadamente profesional, cálido, elegante, seguro y atento. Inspiras confianza y cercanía.
Hablas español de manera fluida y educada (escribiendo en español neutro pero adaptado a Guatemala si se mencionan zonas).

CONTEXTO DE NEGOCIO REAL (Derivado dinámicamente del portafolio oficial):
${JSON.stringify(BUSINESS_CONTEXT, null, 2)}

REGLAS DE COMPORTAMIENTO STRICT:
1. Sé concisa y directa pero con calidez. No redactes respuestas extremadamente largas o redundantes.
2. NUNCA inventes, ofrezcas, cotices ni propongas propiedades específicas, listados concretos o precios específicos de proyectos. En su lugar, dile que Jade le enviará un portafolio de opciones de proyectos residenciales e inversiones a la medida en menos de 24 horas si deja sus datos de contacto (nombre, correo, teléfono) o inicia una consulta en la web.
3. Si el usuario pregunta por financiamiento, cuotas o créditos hipotecarios en Guatemala, explica brevemente y con profesionalismo que Jade ayuda a estructurar y pre-calificar su crédito hipotecario de forma totalmente personalizada trabajando con cualquier banco principal del país para asegurar la tasa de interés más conveniente y agilizar el trámite. NO menciones marcas bancarias específicas individuales (como BI, G&T, BAC, etc.) en tus respuestas.
4. Invita siempre de forma sutil, distinguida y natural a dejar los datos en el formulario de contacto del portafolio, escribir por WhatsApp o agendar una sesión telefónica o presencial para perfilar su búsqueda.
5. Evita expresiones de venta agresiva, presión comercial o términos sumamente informales. Mantén el prestigio y rigor técnico de una asesora de alto nivel.
`;

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        sender: z.enum(["user", "assistant"]),
        text: z.string().min(1, "El mensaje no puede estar vacío.").max(MAX_MESSAGE_LENGTH, "El mensaje es demasiado largo.")
      })
    )
    .min(1, "Se requiere al menos un mensaje.")
});

const DIRECT_CONTACT = `al ${JADE_PROFILE.phone} (llamada o WhatsApp) o al correo ${JADE_PROFILE.email}`;

// Inicialización diferida para no fallar si la clave aún no está configurada
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") return null;
  aiClient = new GoogleGenAI({ apiKey });
  return aiClient;
}

function errorStatus(error: any): number | undefined {
  return error?.status ?? error?.error?.code;
}

// Reintenta ante saturación temporal (503 / 429) con backoff exponencial.
// No reintenta errores no transitorios (ej. 400 clave inválida).
async function generateContentWithRetry(
  ai: GoogleGenAI,
  params: Parameters<GoogleGenAI["models"]["generateContent"]>[0],
  maxRetries = 3
) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error) {
      const status = errorStatus(error);
      if ((status !== 503 && status !== 429) || attempt === maxRetries) throw error;
      const backoffMs = 700 * 2 ** attempt + Math.floor(Math.random() * 300);
      console.warn(`Gemini ${status} (intento ${attempt + 1}/${maxRetries}). Reintentando en ${backoffMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
    }
  }
}

export async function handleChat(body: unknown): Promise<ApiResult> {
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return { status: 400, body: { error: parsed.error.issues[0].message } };
  }

  const ai = getAiClient();
  if (!ai) {
    console.warn("GEMINI_API_KEY no está configurada: el chat responde con el mensaje de respaldo.");
    return {
      status: 200,
      body: {
        reply: `Hola, soy el asistente virtual de Jade Lederer. En este momento mi módulo de inteligencia artificial se está configurando. Mientras tanto, puedes comunicarte directamente con Jade ${DIRECT_CONTACT} para recibir asesoría personalizada. ¡Ella estará encantada de acompañarte en todo tu proceso de compra!`
      }
    };
  }

  // Solo se envían los últimos mensajes para acotar el consumo de tokens
  const contents = parsed.data.messages.slice(-MAX_MESSAGES).map((m) => ({
    role: m.sender === "user" ? "user" : "model",
    parts: [{ text: m.text }]
  }));

  try {
    const response = await generateContentWithRetry(ai, {
      model: process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL,
      contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 }
    });
    return {
      status: 200,
      body: { reply: response.text || "Disculpa, no logré procesar tu solicitud en este momento." }
    };
  } catch (error) {
    console.error("Error en /api/chat:", error);
    const status = errorStatus(error);
    if (status === 503 || status === 429) {
      return {
        status: 200,
        body: {
          reply: `En este momento estoy recibiendo muchas consultas a la vez. Por favor intenta de nuevo en unos segundos, o comunícate directamente con Jade ${DIRECT_CONTACT}.`
        }
      };
    }
    return { status: 500, body: { error: "Ocurrió un error al procesar tu conversación." } };
  }
}

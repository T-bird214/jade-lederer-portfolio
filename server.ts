import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";

// Import real-time business data as source of truth for backend & AI Assistant
import { JADE_PROFILE, EXPERIENCES, WORK_STEPS, TESTIMONIALS, FAQS, VALUES } from "./src/data";
import { PROJECTS } from "./src/content/projects";
import { PARTNERS } from "./src/content/partners";

dotenv.config();

const app = express();
const PORT = 3000;

// Assemble dynamic backend context to keep AI updated automatically with any data changes
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

// Security middleware: Use helmet to protect headers (and disable CSP to prevent breaking iframes)
app.use(helmet({
  contentSecurityPolicy: false,
}));

// Body parsing middleware
app.use(express.json());

// API rate limiters
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Demasiadas peticiones desde esta dirección IP. Por favor intenta de nuevo en 15 minutos."
  }
});

// Zod validation schemas
const contactSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),
  email: z.string().email("El correo electrónico no es válido."),
  phone: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  interest: z.string().optional().nullable(),
  zone: z.string().optional().nullable(),
  step: z.string().optional().nullable(),
  // Honeypot field - invisible to humans, must be empty
  website: z.string().optional().nullable()
});

const chatMessageSchema = z.object({
  sender: z.enum(["user", "assistant"]),
  text: z.string().min(1, "El mensaje no puede estar vacío.")
});

const chatSchema = z.object({
  messages: z.array(chatMessageSchema).min(1, "Se requiere al menos un mensaje.")
});

// API routes - MUST be declared before Vite middlewares
app.post("/api/contact", apiLimiter, (req, res) => {
  try {
    // Validate request body
    const validationResult = contactSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.error.issues[0].message
      });
    }

    const { name, email, phone, message, interest, zone, step, website } = validationResult.data;

    // Honeypot spam filter check
    if (website && website.trim() !== "") {
      console.warn("Honeypot trigger detected (Spam Filter). Discarding submission from bot.");
      // Respond with success so the bot is fooled into thinking it worked, but don't process
      return res.status(200).json({
        success: true,
        message: "¡Gracias! Tu mensaje ha sido recibido con éxito. Jade se pondrá en contacto contigo en las próximas horas."
      });
    }

    // Process valid non-spam lead
    console.log("=== NUEVO CONTACTO RECIBIDO (SANO) ===");
    console.log(`Nombre: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Teléfono: ${phone || "No proporcionado"}`);
    console.log(`Área de interés: ${interest || "No especificada"}`);
    console.log(`Zona de preferencia: ${zone || "No especificada"}`);
    console.log(`Etapa de compra: ${step || "No especificada"}`);
    console.log(`Mensaje: ${message || "Sin mensaje"}`);
    console.log("======================================");

    return res.status(200).json({
      success: true,
      message: "¡Gracias! Tu mensaje ha sido recibido con éxito. Jade se pondrá en contacto contigo en las próximas horas."
    });
  } catch (error) {
    console.error("Error en endpoint /api/contact:", error);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al procesar tu solicitud. Por favor intenta de nuevo."
    });
  }
});

// Lazy initialisation of GoogleGenAI to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;

// Reintenta llamadas a Gemini ante saturación temporal (503 UNAVAILABLE / 429 RESOURCE_EXHAUSTED)
// con backoff exponencial. NO reintenta errores no transitorios (ej. 400 clave inválida).
async function generateContentWithRetry(
  ai: GoogleGenAI,
  params: Parameters<InstanceType<typeof GoogleGenAI>["models"]["generateContent"]>[0],
  maxRetries = 3
) {
  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error: any) {
      lastError = error;
      const status = error?.status ?? error?.error?.code;
      const isRetryable = status === 503 || status === 429;

      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      const backoffMs = 700 * Math.pow(2, attempt) + Math.floor(Math.random() * 300);
      console.warn(`Gemini ${status} (intento ${attempt + 1}/${maxRetries}). Reintentando en ${backoffMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
    }
  }
  throw lastError;
}

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      throw new Error("GEMINI_API_KEY no está configurada o es inválida.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// Chat with Jade's Virtual Advisor powered by Gemini 3.5 Flash
app.post("/api/chat", apiLimiter, async (req, res) => {
  try {
    // Validate request body
    const validationResult = chatSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: validationResult.error.issues[0].message
      });
    }

    const { messages } = validationResult.data;

    let ai;
    try {
      ai = getAiClient();
    } catch (keyError: any) {
      console.warn("Gemini API Key missing or default:", keyError.message);
      // Return a graceful fallback response if API key is not configured yet, using JADE_PROFILE data
      return res.json({
        reply: `Hola, soy el asistente virtual de Jade Lederer. Actualmente mi módulo de inteligencia artificial se está configurando en el servidor de demostración. Sin embargo, puedes comunicarte directamente con Jade al teléfono ${JADE_PROFILE.phone} o al correo ${JADE_PROFILE.email} para recibir asesoría personalizada. ¡Ella estará encantada de acompañarte en todo tu proceso de compra!`
      });
    }

    // Build standard, dynamic system instruction restricting spec-proposals & credit brand naming
    const systemInstruction = `
Actúa como la Asistente Virtual Inteligente de Jade Lederer, Asesora Inmobiliaria de alta gama en Guatemala.
Tu tono debe ser extremadamente profesional, cálido, elegante, seguro y atento. Inspiras confianza y cercanía.
Hablas español de manera fluida y educada (escribiendo en español neutro pero adaptado a Guatemala si se mencionan zonas).

CONTEXTO DE NEGOCIO REAL (Derivado dinámicamente del portafolio oficial):
${JSON.stringify(BUSINESS_CONTEXT, null, 2)}

REGLAS DE COMPORTAMIENTO STRICT:
1. Sé concisa y directa pero con calidez. No redactes respuestas extremadamente largas o redundantes.
2. NUNCA inventes, ofrezcas, cotices ni propongas propiedades específicas, listados concretos o precios específicos de proyectos. En su lugar, dile que Jade le enviará un portafolio de opciones de proyectos residenciales e inversiones a la medida en menos de 24 horas si deja sus datos de contacto (nombre, correo, teléfono) o inicia una consulta en la web.
3. Si el usuario pregunta por financiamiento, cuotas o créditos hipotecarios en Guatemala, explica brevemente y con profesionalismo que Jade ayuda a estructurar y pre-calificar su crédito hipotecario de forma totalmente personalizada trabajando con cualquier banco principal del país para asegurar la tasa de interés más conveniente y agilizar el trámite. NO menciones marcas bancarias específicas individuales (como BI, G&T, BAC, etc.) en tus respuestas.
4. Invita siempre de forma sutil, distinguida y natural a dejar los datos en el formulario de contacto del portafolio o a agendar una sesión telefónica o presencial para perfilar su búsqueda.
5. Evita expresiones de venta agresiva, presión comercial o términos sumamente informales. Mantén el prestigio y rigor técnico de una asesora de alto nivel.
`;

    // Map message history to Gemini content structure
    const geminiContents = messages.map(m => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.5-flash",
      contents: geminiContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Disculpa, no logré procesar tu solicitud en este momento.";
    return res.json({ reply: replyText });

  } catch (error: any) {
    console.error("Error en endpoint /api/chat:", error);

    const status = error?.status ?? error?.error?.code;
    if (status === 503 || status === 429) {
      return res.json({
        reply: `En este momento estoy recibiendo muchas consultas a la vez. Por favor intenta de nuevo en unos segundos, o si prefieres, comunícate directamente con Jade al ${JADE_PROFILE.phone} o ${JADE_PROFILE.email}.`
      });
    }

    return res.status(500).json({
      error: "Ocurrió un error al procesar tu conversación.",
      details: error.message
    });
  }
});

// Vite middleware and static asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Iniciando en modo de desarrollo con Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Iniciando en modo de producción...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor full-stack corriendo en http://localhost:${PORT}`);
  });
}

startServer();
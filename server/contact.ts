/**
 * Envío del formulario de contacto desde el servidor, compartido por:
 * - api/contact.ts → función de Vercel (producción)
 * - server.ts      → Express (desarrollo local)
 *
 * Hoy el formulario envía con Web3Forms directamente desde el navegador (src/lib/contact.ts),
 * porque el plan gratis de Web3Forms no acepta envíos desde servidor. Esta ruta queda lista
 * para cuando haya dominio propio y se use Resend:
 *   RESEND_API_KEY      → clave de Resend
 *   CONTACT_TO_EMAIL    → correo que recibe los mensajes
 *   CONTACT_FROM_EMAIL  → remitente verificado en Resend (opcional; por defecto onboarding@resend.dev)
 */

import { z } from "zod";
import type { ApiResult } from "./types.js";

export const SUCCESS_MESSAGE =
  "¡Gracias! Tu mensaje ha sido recibido con éxito. Jade se pondrá en contacto contigo en las próximas horas.";

const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio.").max(120),
  email: z.string().trim().email("El correo electrónico no es válido."),
  phone: z.string().max(40).optional().nullable(),
  message: z.string().max(4000).optional().nullable(),
  interest: z.string().max(120).optional().nullable(),
  zone: z.string().max(60).optional().nullable(),
  step: z.string().max(120).optional().nullable(),
  // Honeypot: invisible para personas, debe llegar vacío
  website: z.string().optional().nullable()
});

type ContactData = z.infer<typeof contactSchema>;

function formatLead(d: ContactData): string {
  return [
    `Nombre: ${d.name}`,
    `Email: ${d.email}`,
    `Teléfono: ${d.phone || "No proporcionado"}`,
    `Área de interés: ${d.interest || "No especificada"}`,
    `Zona de preferencia: ${d.zone || "No especificada"}`,
    `Etapa de compra: ${d.step || "No especificada"}`,
    "",
    d.message || "Sin mensaje"
  ].join("\n");
}

async function sendWithResend(d: ContactData, apiKey: string, to: string): Promise<boolean> {
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "Portafolio Jade Lederer <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: d.email,
      subject: `Nuevo contacto desde el portafolio: ${d.name}`,
      text: formatLead(d)
    })
  });
  if (!response.ok) {
    console.error(`Resend respondió ${response.status}`);
  }
  return response.ok;
}

export async function handleContact(body: unknown): Promise<ApiResult> {
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return { status: 400, body: { success: false, message: parsed.error.issues[0].message } };
  }
  const data = parsed.data;

  // El bot cree que funcionó, pero no se procesa
  if (data.website?.trim()) {
    return { status: 200, body: { success: true, message: SUCCESS_MESSAGE } };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!apiKey || !to) {
    console.warn("RESEND_API_KEY o CONTACT_TO_EMAIL no configuradas: /api/contact no puede enviar correos.");
    return {
      status: 503,
      body: { success: false, message: "El envío por formulario no está disponible en este momento." }
    };
  }

  try {
    if (await sendWithResend(data, apiKey, to)) {
      return { status: 200, body: { success: true, message: SUCCESS_MESSAGE } };
    }
  } catch (error) {
    console.error("Error en /api/contact:", error);
  }
  return {
    status: 502,
    body: { success: false, message: "Ocurrió un error al enviar tu mensaje. Por favor intenta de nuevo." }
  };
}

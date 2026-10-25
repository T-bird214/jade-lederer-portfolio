/**
 * Envío del formulario de contacto.
 *
 * - Con VITE_WEB3FORMS_ACCESS_KEY: envía directo desde el navegador a Web3Forms
 *   (el plan gratis solo acepta envíos desde el navegador) y llega al correo de la cuenta.
 * - Sin ella: usa /api/contact (server/contact.ts), preparado para Resend cuando haya dominio propio.
 */

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  interest: string;
  zone: string;
  step: string;
  message: string;
  website: string; // honeypot
}

export interface ContactResult {
  success: boolean;
  message: string;
}

const SUCCESS_MESSAGE =
  "¡Gracias! Tu mensaje ha sido recibido con éxito. Jade se pondrá en contacto contigo en las próximas horas.";

async function sendWithWeb3Forms(data: ContactPayload, accessKey: string): Promise<ContactResult> {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Nuevo contacto desde el portafolio: ${data.name}`,
      from_name: "Portafolio Jade Lederer",
      replyto: data.email,
      botcheck: data.website,
      "Nombre": data.name,
      "Email": data.email,
      "Teléfono": data.phone || "No proporcionado",
      "Área de interés": data.interest,
      "Zona de preferencia": data.zone,
      "Etapa de compra": data.step,
      "Mensaje": data.message || "Sin mensaje"
    })
  });
  const result = await response.json().catch(() => null);
  if (response.ok && result?.success) {
    return { success: true, message: SUCCESS_MESSAGE };
  }
  return { success: false, message: "Ocurrió un error al enviar el formulario." };
}

async function sendWithApi(data: ContactPayload): Promise<ContactResult> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json().catch(() => null);
  return {
    success: Boolean(response.ok && result?.success),
    message: result?.message || "Ocurrió un error al enviar el formulario."
  };
}

export async function sendContact(data: ContactPayload): Promise<ContactResult> {
  // Honeypot lleno: se simula éxito sin enviar nada
  if (data.website.trim()) {
    return { success: true, message: SUCCESS_MESSAGE };
  }
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  return accessKey ? sendWithWeb3Forms(data, accessKey) : sendWithApi(data);
}

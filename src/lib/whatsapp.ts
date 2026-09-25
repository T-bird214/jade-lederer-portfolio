import { JADE_PROFILE } from "../data";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola Jade, vi tu portafolio y me gustaría recibir asesoría inmobiliaria.";

/** Enlace wa.me con mensaje prellenado. Devuelve null si no hay número configurado. */
export function whatsappUrl(text: string = DEFAULT_WHATSAPP_MESSAGE): string | null {
  const digits = JADE_PROFILE.whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

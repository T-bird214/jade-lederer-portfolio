/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Partner {
  name: string;
  logo: string;       // /partners/nombre-logo.webp
  image: string;       // /partners/nombre-cover.webp
  description: string; // 1 línea, tono premium, no publicitario
  ctaLink: string;      // WhatsApp/enlace oficial; usar "#" como placeholder si aún no existe
  isPlaceholderLink: boolean;
}

export const PARTNERS: Partner[] = [
  {
    name: "Ultra-CleanGT",
    logo: "ultracleangt-logo.webp",
    image: "ultracleangt-cover.webp",
    description: "Servicios de limpieza profesional para tu nuevo hogar.",
    ctaLink: "#", // reemplazar por enlace oficial cuando esté disponible
    isPlaceholderLink: true
  },
  {
    name: "Fornitura",
    logo: "fornitura-logo.webp",
    image: "fornitura-cover.webp",
    description: "Acabados y mobiliario para complementar tu propiedad.",
    ctaLink: "#",
    isPlaceholderLink: true
  },
  {
    name: "Santuario GT",
    logo: "santuariogt-logo.webp",
    image: "santuariogt-cover.webp",
    description: "Bienestar y espacios de vida saludable.",
    ctaLink: "#",
    isPlaceholderLink: true
  }
];

export const CAPO_PARTNER = {
  name: "CAPO",
  label: "Powered by CAPO", // en inglés, tal cual
  link: "https://capo.app",
  isFutureIntegration: true
};

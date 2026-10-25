/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Experience, Achievement, Value, FAQ, Testimonial, WorkStep } from "./types";

export const JADE_PROFILE = {
  name: "Jade Lederer",
  title: "Asesora Inmobiliaria",
  location: "Guatemala",
  phone: "+502 5555-5652",
  whatsapp: "+502 5555-5652", // número para wa.me; dejar "" para ocultar los botones de WhatsApp
  email: "jadelederer.gt@gmail.com",
  linkedin: "https://www.linkedin.com/in/jade-lederer-gt/",
  bio: "Asesora inmobiliaria en Guatemala con años de experiencia, especializada en acompañar a cada cliente de principio a fin: desde la primera visita hasta la firma de escrituras. Actualmente forma parte del equipo comercial de TERRE Apartamentos, zona 15, generando resultados desde su incorporación al proyecto.",
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Funcional" }
  ],
  zones: ["Zona 2", "Zona 5", "Zona 6", "Zona 10", "Zona 11", "Zona 14", "Zona 15", "Zona 16", "Zona 17", "Zona 18", "Y más..."]
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    metric: "100+",
    label: "Viviendas Gestionadas",
    description: "Acompañamiento personalizado y asesoría experta a lo largo de su trayectoria profesional."
  },
  {
    id: "ach-2",
    metric: "9",
    label: "Ventas Cerradas en un fin de semana",
    description: "Récord extraordinario de cierres simultáneos en Desarrollos Palo Blanco."
  },
  {
    id: "ach-3",
    metric: "200-300",
    label: "Leads Gestionados Mensualmente",
    description: "Administración rigurosa de prospectos en CRM mediante campañas de pauta digital propias."
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-0",
    role: "Asesora de Bienes Raíces",
    company: "TERRE Apartamentos, zona 15",
    period: "2025 – Actualidad",
    isRealEstate: true,
    isCurrent: true,
    achievements: [
      "Incorporación al equipo comercial de un proyecto residencial premium en zona 15.",
      "Generación de ventas desde el primer mes de gestión en el proyecto.",
      "Desempeño sostenido de excelencia dentro de un segmento de alta gama."
    ]
  },
  {
    id: "exp-1",
    role: "Asesora de Bienes Raíces",
    company: "Desarrollos Palo Blanco · Reinve y MaBre Inmobiliarias",
    period: "2023 – 2025",
    isRealEstate: true,
    achievements: [
      "Captación y atención de leads en CRM y gestión de cartera propia, con cierre directo de ventas.",
      "Negociación con clientes y acompañamiento personalizado en gestión de crédito hipotecario y escrituración.",
      "Promoción estratégica de propiedades de alta gama y proyectos en construcción, con un enfoque digital profesional orientado a resultados.",
      "Reconocimiento oficial por 9 ventas cerradas con éxito en un solo fin de semana."
    ]
  },
  {
    id: "exp-2",
    role: "Asistente de Operaciones de Sala de Ventas",
    company: "Desarrolladora INTEPRO",
    period: "2022 – 2023",
    isRealEstate: true,
    achievements: [
      "Administración completa de la sala de ventas y coordinación de turnos del equipo de asesores de ventas.",
      "Soporte documental, logístico y operativo a clientes de proyectos en construcción durante todo el proceso de compra."
    ]
  }
];

export const VALUES: Value[] = [
  {
    id: "val-1",
    title: "Acompañamiento Integral",
    description: "Jade te guía de principio a fin: desde la búsqueda inicial, selección del proyecto, visita a sala de ventas, hasta el trámite de crédito hipotecario y la firma de escrituras."
  },
  {
    id: "val-2",
    title: "Procesos Digitales Organizados",
    description: "Cada cliente es gestionado con seguimiento riguroso y comunicación oportuna en cada etapa del proceso."
  },
  {
    id: "val-3",
    title: "Transparencia Legal y Financiera",
    description: "Seguridad y claridad total en cada fase de pre-calificación crediticia y escrituración, trabajando directamente con notarios y bancos líderes en Guatemala."
  }
];

export const WORK_STEPS: WorkStep[] = [
  {
    number: "01",
    title: "Contacto & Perfilación",
    description: "Agendamos una breve charla para entender tus necesidades, presupuesto, forma de pago (crédito o contado) y tus zonas de preferencia en Ciudad de Guatemala."
  },
  {
    number: "02",
    title: "Análisis & Selección Editorial",
    description: "Filtramos proyectos residenciales premium (incluyendo proyectos disponibles y en construcción) en las zonas clave (5, 6, 10, 14, 15, 16, 17 o 18) y te presentamos las mejores opciones."
  },
  {
    number: "03",
    title: "Visitas Guiadas Personalizadas",
    description: "Coordinamos y te acompañamos a salas de ventas o proyectos, analizamos planos, plusvalía, y seleccionamos el apartamento o casa ideal."
  },
  {
    number: "04",
    title: "Pre-calificación Hipotecaria Ágil",
    description: "Jade prepara tu expediente y gestiona la pre-calificación trabajando con todos los bancos del país, para ayudarte a conseguir las mejores condiciones."
  },
  {
    number: "05",
    title: "Acompañamiento Legal y Escritura",
    description: "Supervisamos la minuta de compra, la recopilación documental para el FHA o crédito directo, la firma de escrituras ante notario y la coordinación del pago del enganche."
  }
];

// Para agregar un testimonio futuro, solo añade un nuevo objeto a este arreglo.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Sofía y Alejandro Martínez",
    role: "Compradores de Apartamento",
    quote: "Desde la primera visita sentimos que estábamos tomando la decisión correcta. Jade siempre estuvo pendiente de nosotros, respondió cada duda con paciencia y nos acompañó durante todo el proceso hasta recibir nuestro nuevo hogar. Su atención hizo que todo fuera mucho más sencillo y confiable.",
    avatarInitials: "SM"
  },
  {
    id: "test-2",
    name: "Lic. César Mejía",
    role: "Comprador Residencial",
    quote: "Lo que más valoré fue el acompañamiento personalizado. En ningún momento me sentí presionado para tomar una decisión. Jade siempre estuvo disponible para orientarme, explicarme cada paso y ayudarme a encontrar la mejor opción según mis necesidades. Esa confianza hizo toda la diferencia durante mi compra.",
    avatarInitials: "CM"
  },
  {
    id: "test-3",
    name: "Carolina Rodríguez",
    role: "Compradora de Primera Vivienda",
    quote: "Comprar mi primera vivienda parecía un proceso complicado, pero contar con un buen equipo de respaldo hizo que todo fuera mucho más claro y seguro. Jade me acompañó desde el inicio hasta el momento de firmar, resolviendo cada duda y brindándome la tranquilidad que necesitaba para tomar una decisión tan importante.",
    avatarInitials: "CR"
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "¿Cuáles son los requisitos para pre-calificar a un crédito de vivienda en Guatemala?",
    answer: "Los bancos en Guatemala suelen solicitar: copia de tu DPI, constancia de ingresos original (si eres asalariado), recibo de luz de tu residencia actual, copia de RTU actualizado y estados de cuenta bancarios de los últimos 3 meses. Para independientes se requieren estados de cuenta de 6 meses y estados financieros firmados por contador. Jade te ayuda a estructurar este expediente de forma impecable antes de enviarlo al banco."
  },
  {
    id: "faq-2",
    question: "¿Qué ventajas tiene adquirir una propiedad en fase de construcción?",
    answer: "Adquirir en fase de construcción ofrece los precios más bajos de lista y te permite pagar el enganche (que suele ser del 10% al 20%) fraccionado en cuotas mensuales durante la fase de obra (normalmente de 12 a 24 meses). También adquieres plusvalía desde el primer día y tienes prioridad para elegir el nivel del apartamento, orientación y las mejores vistas."
  },
  {
    id: "faq-3",
    question: "¿En qué zonas específicas de Guatemala opera Jade?",
    answer: "Jade se especializa de manera intensiva en las zonas residenciales y comerciales de mayor demanda, plusvalía y crecimiento en la Ciudad de Guatemala: Zonas 2, 5, 6, 10, 11, 14, 15, 16, 17, 18 y más. Esto le permite asesorarte con precisión sobre tráfico, accesos, cercanía de colegios y planes de desarrollo municipal."
  },
  {
    id: "faq-4",
    question: "¿La asesoría de Jade tiene algún costo para mí como comprador?",
    answer: "No. Los honorarios de asesoría y corretaje inmobiliario en Guatemala los cubre el desarrollador o vendedor de la propiedad. Para ti como comprador, todo el acompañamiento premium de Jade —incluyendo el perfilamiento, visitas, análisis comparativos de mercado y gestión del crédito hipotecario— es 100% gratuito."
  },
  {
    id: "faq-5",
    question: "¿Qué es el enganche y de cuánto debe ser?",
    answer: "El enganche es el monto inicial que pagas de tu bolsillo para comprar la propiedad; el resto lo cubre el crédito hipotecario. En Guatemala, el enganche mínimo estándar suele ser del 5% al 10% para proyectos calificados por el FHA, y del 20% para créditos bancarios directos sin FHA. Jade te ayudará a calcular los escenarios financieros óptimos para tu presupuesto."
  }
];

# Jade Lederer | Asesora Inmobiliaria — Portafolio Comercial

Sitio web comercial de Jade Lederer, asesora inmobiliaria en Ciudad de Guatemala. Aplicación full-stack (frontend + backend en un solo proyecto) con asistente virtual impulsado por IA.

---

## 1. Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + TypeScript + Tailwind CSS v4 |
| Bundler / Dev server | Vite 6 |
| Backend | Express 4 (sirve la app y expone la API) |
| Asistente IA | Gemini 3.5 Flash (`@google/genai`) |
| Seguridad | Helmet, `express-rate-limit`, validación con `zod`, honeypot anti-bot |
| Contenido | Archivos TypeScript tipados en `src/data.ts` y `src/content/` (sin base de datos, editable directamente en código) |

No es un proyecto Next.js: es un proyecto generado en **Google AI Studio**, con un servidor Express propio que además de servir el sitio expone dos endpoints (`/api/chat` y `/api/contact`).

---

## 2. Estructura del proyecto

```
├── api/                         # Funciones de Vercel: /api/chat y /api/contact (producción)
├── server/                      # Lógica compartida de chat (Gemini) y contacto (Resend)
├── server.ts                    # Express solo para desarrollo local: sirve el sitio + /api/*
├── index.html                   # HTML raíz: título, meta tags SEO, Open Graph, Schema.org
├── src/
│   ├── App.tsx                  # Composición de todas las secciones de la página
│   ├── data.ts                  # Fuente única de verdad: perfil, experiencia, valores, testimonios, FAQ
│   ├── types.ts                 # Tipos TypeScript de todo el contenido
│   ├── content/
│   │   ├── projects.ts          # Catálogo de proyectos residenciales destacados
│   │   └── partners.ts          # Partners / aliados comerciales
│   └── components/               # Un componente por sección de la página
├── public/
│   ├── projects/                 # Imágenes del catálogo de proyectos (ver sección 5)
│   ├── partners/                 # Logos e imágenes de partners (ver sección 6)
│   ├── robots.txt
│   └── sitemap.xml
├── .env.example                  # Plantilla de variables de entorno
```

**Regla de oro del proyecto**: todo el contenido visible (teléfono, correo, experiencia, testimonios, proyectos, partners) vive en `src/data.ts` y `src/content/*.ts`. Nunca hay que tocar un componente para cambiar un texto — solo el archivo de datos correspondiente.

---

## 3. Instalación local

**Requisitos**: Node.js 18 o superior.

```bash
npm install
cp .env.example .env.local
```

Edita `.env.local` y coloca tu clave real de Gemini:

```
GEMINI_API_KEY="tu_clave_real_aqui"
```

Corre el proyecto en modo desarrollo:

```bash
npm run dev
```

Abre `http://localhost:3000`.

> Si `GEMINI_API_KEY` no está configurada, el sitio funciona igual — el asistente IA simplemente responde con un mensaje que invita a contactar a Jade directamente por teléfono o correo, en vez de fallar.

---

## 4. Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `GEMINI_API_KEY` | Sí, para que el asistente IA funcione | Clave de la API de Gemini (Google AI Studio → API Keys) |
| `GEMINI_MODEL` | No | Modelo de Gemini (por defecto `gemini-3.5-flash`) |
| `VITE_WEB3FORMS_ACCESS_KEY` | Sí, para que el formulario envíe | Access key de Web3Forms; los mensajes llegan al correo con que se creó. Es pública por diseño y se incrusta al compilar: tras cambiarla hay que volver a desplegar |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | No (futuro) | Envío por servidor con Resend vía `/api/contact`; solo se usa si `VITE_WEB3FORMS_ACCESS_KEY` está vacía |

**Nunca subas `.env` o `.env.local` a GitHub.** Ya están excluidos en `.gitignore`. En producción, configura estas variables en Vercel → proyecto `portafolio-comercial-jade` → Settings → Environment Variables (Production y Preview).

---

## 5. Cómo agregar imágenes al catálogo de "Proyectos Residenciales Destacados"

Esta es la sección con el carrusel que aparece antes de Partners. Agregar un proyecto toma menos de un minuto y **no requiere tocar ningún componente ni estilo**:

1. Prepara la imagen del proyecto — idealmente formato **`.webp`**, orientación vertical (proporción 3:4), peso ligero (menos de 300 KB si es posible, para no afectar la velocidad de carga).
2. Copia el archivo a la carpeta `public/projects/`. Por ejemplo: `public/projects/terre-apartamentos.webp`.
3. Abre `src/content/projects.ts` y agrega un objeto al arreglo `PROJECTS`:

```ts
export const PROJECTS: Project[] = [
  { name: "Proyecto 1", image: "proyecto-1.webp" },
  { name: "Proyecto 2", image: "proyecto-2.webp" },
  { name: "Proyecto 3", image: "proyecto-3.webp" },
  { name: "TERRE Apartamentos", image: "terre-apartamentos.webp" }, // así se agrega uno nuevo
];
```

4. Guarda el archivo. Listo — el carrusel se actualiza solo, en el orden en que agregues los elementos al arreglo.

**Para eliminar un proyecto**: borra su objeto del arreglo (no es necesario borrar la imagen de `public/projects/`, aunque puedes hacerlo para mantener orden).

**La tarjeta "Más opciones disponibles"** al final del carrusel es fija y no se controla desde este archivo — siempre aparece al final invitando a contactar a Jade, tal como fue diseñada.

Actualmente hay 3 proyectos placeholder (`Proyecto 1`, `Proyecto 2`, `Proyecto 3`) sin imagen real todavía — encontrarás una guía rápida también dentro de `public/projects/LEEME.txt`. Debes reemplazarlos con imágenes reales antes de publicar el sitio, o el carrusel mostrará espacios rotos donde falte la imagen.

---

## 6. Cómo agregar o editar un Partner

1. Prepara **dos imágenes** por partner: un logo (`-logo.webp`, idealmente fondo transparente) y una imagen de portada (`-cover.webp`, horizontal).
2. Cópialas a `public/partners/`.
3. Edita `src/content/partners.ts` y agrega/edita un objeto en `PARTNERS`:

```ts
{
  name: "Nombre del Partner",
  logo: "nombre-logo.webp",
  image: "nombre-cover.webp",
  description: "Una línea breve, tono premium, no publicitario.",
  ctaLink: "https://wa.me/50200000000", // o "#" si aún no hay enlace oficial
  isPlaceholderLink: false // true si el enlace es un "#" temporal
}
```

La tarjeta de **CAPO** ("Powered by CAPO") es independiente y está marcada como integración futura en `CAPO_PARTNER`, dentro del mismo archivo — no necesitas tocarla salvo que cambie el enlace `https://capo.app`.

---

## 7. Cómo actualizar los datos de contacto y el perfil

Todo vive en un solo lugar: `src/data.ts`, objeto `JADE_PROFILE`:

```ts
export const JADE_PROFILE = {
  phone: "+502 5555-5652",
  email: "jadelederer.gt@gmail.com",
  linkedin: "https://www.linkedin.com/in/jade-lederer-gt/",
  zones: [...],
  bio: "...",
};
```

Al cambiar cualquiera de estos valores, se actualiza automáticamente en: el formulario de contacto, y **el asistente de IA** (que lee este mismo objeto para responder con datos siempre correctos y consistentes). Ya no existen datos de contacto duplicados o hardcodeados en otros archivos.

Para actualizar experiencia laboral, logros, valores, pasos del proceso de compra o preguntas frecuentes, edita los arreglos correspondientes en ese mismo archivo (`EXPERIENCES`, `ACHIEVEMENTS`, `VALUES`, `WORK_STEPS`, `TESTIMONIALS`, `FAQS`).

---

## 8. Cómo funciona el Asistente de IA

- Está conectado a Gemini a través de `/api/chat`: en Vercel es la función `api/chat.ts`, en local la sirve `server.ts`; ambas usan la lógica de `server/chat.ts`.
- Su contexto de negocio (`BUSINESS_CONTEXT`) se construye **dinámicamente** a partir de `src/data.ts` y `src/content/*.ts` — no hay datos escritos a mano en el prompt del sistema. Si actualizas el perfil, la experiencia o los proyectos, el asistente automáticamente "sabe" la información nueva sin que tengas que tocar `server/chat.ts`.
- Reglas de comportamiento ya incorporadas: nunca inventa propiedades, precios o disponibilidad; nunca menciona bancos específicos; siempre invita a dejar datos de contacto cuando no puede resolver algo con certeza.
- Estructura preparada para integrar **RAG (Retrieval-Augmented Generation)** en el futuro: `BUSINESS_CONTEXT` ya está organizado como un objeto estructurado (no un solo bloque de texto), lo que facilita sustituirlo más adelante por una búsqueda semántica sin rediseñar el endpoint.
- Está protegido con `express-rate-limit` (100 solicitudes cada 15 minutos por IP) para evitar abuso que genere costos innecesarios en la API de Gemini.

---

## 9. Seguridad implementada

- **Helmet**: cabeceras HTTP de seguridad activas en todo el servidor.
- **Rate limiting**: en `/api/chat` y `/api/contact`.
- **Validación con Zod**: ambos endpoints rechazan payloads mal formados antes de procesarlos.
- **Honeypot anti-bot**: el formulario de contacto tiene un campo oculto (`website`) — si un bot lo completa, el backend responde como si todo hubiera salido bien pero descarta el envío silenciosamente.
- Ninguna clave (`GEMINI_API_KEY`) se expone jamás en el código del cliente; solo vive en el servidor, leída desde variables de entorno.

---

## 10. SEO ya configurado

- `index.html`: `lang="es"`, title, meta description, Open Graph, Twitter Cards y JSON-LD (`Schema.org` tipo `RealEstateAgent`, incluyendo `sameAs` con el LinkedIn oficial).
- `public/robots.txt` y `public/sitemap.xml` ya existen.

⚠️ **Antes de publicar**: `index.html` usa el dominio placeholder `https://jadelederer.com` en 5 lugares (`og:url`, `og:image`, `twitter:url`, `twitter:image`, y el JSON-LD `url`/`image`). Reemplázalo por tu dominio real de producción con un buscar-y-reemplazar antes de desplegar. La imagen de portada (`public/images/hero-arquitectura.webp`) ya está optimizada (135 KB, antes 854 KB en `.jpg`) y correctamente incluida en el build de producción — sigue siendo una foto de stock, así que lo ideal es reemplazarla por una foto profesional real de Jade cuando esté disponible (mismo nombre de archivo, mismo formato `.webp`, y no hace falta tocar el código).

---

## 11. Despliegue

Este proyecto nació y está pensado para desplegarse desde **Google AI Studio** (usa Cloud Run por debajo — de ahí la variable `APP_URL` en `.env.example`, que AI Studio inyecta automáticamente). Pasos generales:

1. Sube el proyecto a tu espacio de Google AI Studio (o a GitHub, si prefieres conectar el repositorio).
2. Configura `GEMINI_API_KEY` como *Secret* en el panel de AI Studio.
3. Publica desde la misma plataforma — el build (`npm run build`) y el arranque (`npm start`) ya están definidos en `package.json` y probados.

Si en el futuro decides migrar a otro proveedor (Render, Railway, un VPS, etc.), el proyecto es un servidor Node/Express estándar: solo necesitas `npm install`, `npm run build` y `npm start`, con `GEMINI_API_KEY` configurada como variable de entorno del servicio.

---

## 12. Cómo escalar el proyecto a futuro

- **CMS**: todo el contenido (`src/data.ts`, `src/content/*.ts`) exporta datos planos tipados. El día que quieras conectar un CMS (Supabase, Notion, uno propio), solo tienes que reemplazar estos archivos por una función que haga `fetch`/consulta y devuelva exactamente la misma forma de datos (`Project[]`, `Partner[]`, `Testimonial[]`, etc.) — ningún componente necesita cambiar.
- **RAG para el asistente**: ver sección 8.
- **Formulario de contacto → Resend/CRM real**: hoy el formulario envía con Web3Forms desde el navegador (`src/lib/contact.ts`). Cuando haya dominio propio, basta con vaciar `VITE_WEB3FORMS_ACCESS_KEY` y configurar `RESEND_API_KEY` + `CONTACT_TO_EMAIL`: `/api/contact` (`server/contact.ts`) ya envía con Resend.

---

## 13. Checklist antes de publicar

- [x] ~~Corregir la imagen del Hero, que no se incluía en el build de producción~~ — ya corregido: ahora vive en `public/images/hero-arquitectura.webp`.
- [ ] Reemplazar las 3 imágenes placeholder del catálogo de proyectos (`public/projects/`) por imágenes reales.
- [ ] Agregar logos e imágenes reales de los partners (`public/partners/`), o quitar los que aún no confirmen participación.
- [ ] Configurar los enlaces (`ctaLink`) reales de los partners que hoy tienen `"#"` como placeholder.
- [ ] Reemplazar el dominio `jadelederer.com` en `index.html` por el dominio real de producción.
- [ ] Configurar `GEMINI_API_KEY` como variable de entorno/secret en el entorno de despliegue.
- [ ] Probar el formulario de contacto y el asistente de IA en producción antes de compartir el enlace.

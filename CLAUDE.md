# CLAUDE.md — Jade Lederer | Portafolio comercial

## Proyecto
Sitio comercial de Jade Lederer, asesora inmobiliaria en Ciudad de Guatemala.
- Repo: `T-bird214/jade-lederer-portfolio` · Vercel: `portafolio-comercial-jade` → https://portafolio-comercial-jade.vercel.app
- Copia local: `~/Documentos/jade/portafolio-jade/project` (la carpeta `jade-lederer-_-asesora-inmobiliaria` es un export duplicado de AI Studio).
- Dueño: Daniel. Entorno: Fedora + zsh. Navegador: Brave (Flatpak).

## Stack
React 19 + TypeScript + Tailwind v4 + Vite 6. API: funciones de Vercel en `api/` (`/api/chat` Gemini, `/api/contact` Resend) con la lógica en `server/`; `server.ts` (Express) solo para desarrollo local. El formulario envía con Web3Forms desde el navegador (`src/lib/contact.ts`).
Variables (solo nombres): `GEMINI_API_KEY`, `GEMINI_MODEL`, `VITE_WEB3FORMS_ACCESS_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Ver `.env.example`.

En `api/` y `server/` los imports relativos llevan extensión `.js` (el paquete es ESM y Node no resuelve imports sin extensión).

## Comandos
`npm ci` · `npm run dev` (tsx server.ts) · `npm run build` · `npm run lint` (tsc)

## REGLAS FIJAS
- Nunca muestres valores de tokens, claves ni secretos. Solo nombres de variables.
- Trabaja por fases. Al final de cada fase, muestra un resumen y ESPERA el "ok" antes de seguir.
- Nada destructivo sin confirmación: no borres archivos, ramas ni repos, no hagas force push, no reescribas el historial.
- En el repo, todos los cambios van en una rama nueva, con un Pull Request. No hagas push directo a `main`.
- Para cualquier login interactivo, da el comando exacto y Daniel lo corre en otra terminal.
- Cambios de código de la app solo con aprobación explícita y en PR separado.

## Convenciones
- Commits en español, estilo `tipo: descripción`. Ramas `feature/…`, `fix/…`, `chore/…`, `docs/…`.

# CLAUDE.md — Jade Lederer | Portafolio comercial

## Proyecto
Sitio comercial de Jade Lederer, asesora inmobiliaria en Ciudad de Guatemala.
- Repo: `T-bird214/jade-lederer-portfolio` · Vercel: `portafolio-comercial-jade` → https://portafolio-comercial-jade.vercel.app
- Copia local: `~/Documentos/jade/portafolio-jade/project` (la carpeta `jade-lederer-_-asesora-inmobiliaria` es un export duplicado de AI Studio).
- Dueño: Daniel. Entorno: Fedora + zsh. Navegador: Brave (Flatpak).

## Stack
React 19 + TypeScript + Tailwind v4 + Vite 6. Backend Express (`server.ts`) con `/api/chat` (Gemini) y `/api/contact`.
Variables (solo nombres): `GEMINI_API_KEY`, `APP_URL`.

⚠️ En Vercel el proyecto se sirve como sitio estático Vite: `server.ts` NO se ejecuta, por lo que `/api/chat` y `/api/contact` responden 404 en producción (pendiente de migrar a funciones de Vercel).

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

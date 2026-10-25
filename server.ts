import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { handleChat } from "./server/chat.js";
import { handleContact } from "./server/contact.js";

dotenv.config();

const app = express();
const PORT = 3000;

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

// API routes - MUST be declared before Vite middlewares.
// La lógica vive en server/ y es la misma que usan las funciones de Vercel en api/.
app.post("/api/contact", apiLimiter, async (req, res) => {
  const result = await handleContact(req.body);
  res.status(result.status).json(result.body);
});

app.post("/api/chat", apiLimiter, async (req, res) => {
  const result = await handleChat(req.body);
  res.status(result.status).json(result.body);
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
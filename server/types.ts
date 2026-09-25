/** Respuesta neutral al framework: la adaptan api/*.ts (Vercel) y server.ts (Express). */
export interface ApiResult {
  status: number;
  body: Record<string, unknown>;
}

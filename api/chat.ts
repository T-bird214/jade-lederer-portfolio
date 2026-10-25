import { handleChat } from "../server/chat.js";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null);
  const result = await handleChat(body);
  return Response.json(result.body, { status: result.status });
}

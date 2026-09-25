import { handleContact } from "../server/contact.js";

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null);
  const result = await handleContact(body);
  return Response.json(result.body, { status: result.status });
}

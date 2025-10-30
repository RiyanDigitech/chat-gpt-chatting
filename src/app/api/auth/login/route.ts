import { handleLogin } from "@/controllers/auth.controller";

export async function POST(req: Request) {
  try {
    return await handleLogin(req);
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

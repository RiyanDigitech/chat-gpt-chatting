import { handleSignup } from "@/controllers/auth.controller";

export async function POST(req: Request) {
  try {
    return await handleSignup(req);
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

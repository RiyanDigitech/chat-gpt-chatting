export const runtime = "nodejs";

import { handleGetAllUsers } from "@/controllers/auth.controller";
import { verifyAuth } from "@/utils/authMiddleware";

export async function GET(req: Request) {
  // ✅ First check authentication
  const result = await verifyAuth(req);

  // If middleware returned NextResponse (unauthorized), just return it
  if (result instanceof Response) {
    return result;
  }

  // ✅ Token verified → proceed
  try {
    return await handleGetAllUsers();
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

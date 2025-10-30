import { NextResponse } from "next/server";
import { verifyToken } from "./jwt";

// ✅ this helper verifies Bearer token from Authorization header
export async function verifyAuth(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // ❌ No token found
    return NextResponse.json({ error: "Unauthorized: Token missing" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token); // from utils/jwt.ts
    return decoded; // return decoded user info
  } catch (err) {
    // ❌ Invalid token
    return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
  }
}

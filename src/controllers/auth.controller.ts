import { NextResponse } from "next/server";
import { AppDataSource } from "../config/data-source";
import { UserService } from "../services/user.service";

async function ensureDB() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}

export async function handleSignup(req: Request) {
  await ensureDB();
  const { name, email, password, phone } = await req.json();
  const res = await UserService.signup(name, email, password, phone);
  return NextResponse.json(res);
}

export async function handleLogin(req: Request) {
  await ensureDB();
  const { email, password } = await req.json();
  const res = await UserService.login(email, password);
  return NextResponse.json(res);
}

export async function handleGetAllUsers() {
  await ensureDB();
  const res = await UserService.getAllUsers();
  return NextResponse.json(res);
}

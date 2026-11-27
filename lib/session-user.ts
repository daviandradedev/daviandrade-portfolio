import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/api/auth";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export async function requireUserId(): Promise<string> {
  const user = await getCurrentUser();
  if (!user?.id) throw new UnauthorizedError();
  return user.id;
}

export function jsonError(err: unknown, fallback: string) {
  if (err instanceof UnauthorizedError) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { error: err instanceof Error ? err.message : fallback },
    { status: 500 },
  );
}

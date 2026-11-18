import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/api/auth";
import { isOwner } from "@/lib/owner";
import { parsePortfolioDocument } from "@/lib/portfolio-document";
import { readPublishedDocument, writePublishedDocument } from "@/lib/portfolio-store";

export const runtime = "nodejs";

export async function GET() {
  const document = await readPublishedDocument();
  return NextResponse.json({ document });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!isOwner(user)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = parsePortfolioDocument(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.issue }, { status: 400 });
  }

  try {
    const document = await writePublishedDocument(parsed.document);
    return NextResponse.json({ document });
  } catch (error) {
    if (error instanceof Error && error.message === "unavailable") {
      return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }
    return NextResponse.json({ error: "invalid" }, { status: 500 });
  }
}

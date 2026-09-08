import { NextResponse } from "next/server";
import { appendRecord } from "@/lib/server-store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!body.name || !body.email || !body.phone || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const record = { id: `MSG-${Date.now()}`, ...body, createdAt: new Date().toISOString() };
  await appendRecord("next-messages.json", record);
  return NextResponse.json({ message: "Message received", record }, { status: 201 });
}

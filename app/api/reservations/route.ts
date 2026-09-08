import { NextResponse } from "next/server";
import { appendRecord } from "@/lib/server-store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!body.name || !body.phone || !body.date) {
    return NextResponse.json({ error: "Missing reservation details" }, { status: 400 });
  }
  const reservation = { id: `RSV-${Date.now()}`, status: "pending", ...body, createdAt: new Date().toISOString() };
  await appendRecord("next-reservations.json", reservation);
  return NextResponse.json({ message: "Reservation received", reservation }, { status: 201 });
}

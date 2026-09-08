import { NextResponse } from "next/server";
import { appendRecord } from "@/lib/server-store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }
  const order = { id: `ORD-${Date.now()}`, status: "received", ...body, createdAt: new Date().toISOString() };
  await appendRecord("next-orders.json", order);
  return NextResponse.json({ message: "Order received", order }, { status: 201 });
}

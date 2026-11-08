import { NextResponse } from "next/server";
import { appendRecord, generateWhatsAppOrderUrl, brand } from "@/lib/site";

type RouteParams = {
  params: Promise<{ action: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { action } = await params;
  return NextResponse.json({
    status: "online",
    endpoint: action,
    cafe: brand.name,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request, { params }: RouteParams) {
  const { action } = await params;

  try {
    const body = await request.json().catch(() => ({}));

    // 1. Orders
    if (action === "orders") {
      if (!Array.isArray(body.items) || body.items.length === 0) {
        return NextResponse.json({ success: false, error: "Cart is empty" }, { status: 400 });
      }

      if (!body.customerName || !body.customerPhone) {
        return NextResponse.json(
          { success: false, error: "Customer name and phone are required" },
          { status: 400 }
        );
      }

      const orderId = body.orderId || `MSF-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const order = {
        orderId,
        status: "received",
        ...body,
        createdAt: new Date().toISOString()
      };

      await appendRecord("orders.json", order);

      // Format WhatsApp order notification text
      const itemList = body.items
        .map(
          (i: { quantity: number; name: string; price: number; customization?: string }) =>
            `• ${i.quantity}x ${i.name} (₹${i.price * i.quantity})${i.customization ? ` [${i.customization}]` : ""}`
        )
        .join("\n");

      const message = `*☕ New Order — Musafir Cafe Baramati*\n*Order ID:* ${orderId}\n*Customer:* ${body.customerName} (${body.customerPhone})\n*Type:* ${body.orderType?.toUpperCase()}${body.tableNumber ? ` (Table: ${body.tableNumber})` : ""}${body.address ? `\n*Address:* ${body.address}` : ""}\n\n*Items:*\n${itemList}\n\n*Total:* ₹${body.total}\n*Date:* ${new Date().toLocaleString("en-IN")}`;

      const whatsappUrl = generateWhatsAppOrderUrl(brand.whatsapp, message);

      return NextResponse.json(
        {
          success: true,
          message: "Order placed successfully",
          order,
          whatsappUrl
        },
        { status: 201 }
      );
    }

    // 2. Reservations
    if (action === "reservations") {
      if (!body.name || !body.phone || !body.date) {
        return NextResponse.json(
          { success: false, error: "Missing required reservation details (name, phone, date)" },
          { status: 400 }
        );
      }

      const reservationId = body.id || `MSF-RSV-${Math.floor(100000 + Math.random() * 900000)}`;
      const reservation = {
        id: reservationId,
        status: "confirmed",
        ...body,
        createdAt: new Date().toISOString()
      };

      await appendRecord("reservations.json", reservation);

      return NextResponse.json(
        {
          success: true,
          message: "Reservation confirmed",
          reservation
        },
        { status: 201 }
      );
    }

    // 3. Contact Inquiries
    if (action === "contact") {
      if (!body.name || !body.contact || !body.message) {
        return NextResponse.json(
          { success: false, error: "Please provide your name, contact, and message" },
          { status: 400 }
        );
      }

      const contactMessage = {
        id: `MSF-MSG-${Math.floor(100000 + Math.random() * 900000)}`,
        ...body,
        createdAt: new Date().toISOString()
      };

      await appendRecord("messages.json", contactMessage);

      return NextResponse.json(
        {
          success: true,
          message: "Message received successfully",
          contactMessage
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: false, error: `Invalid action: ${action}` },
      { status: 404 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: (err as Error)?.message || "Internal server error" },
      { status: 500 }
    );
  }
}


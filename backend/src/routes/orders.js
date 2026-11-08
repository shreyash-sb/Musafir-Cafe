const express = require("express");
const { query, isDbConnected } = require("../config/db");

const router = express.Router();

// In-memory fallback if database is not yet connected
const memoryOrders = [];

// Musafir Cafe WhatsApp configuration
const CAFE_WHATSAPP = "919730357435";

function generateWhatsAppOrderUrl(phone, text) {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

// POST /api/orders — Create new order
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      orderType = "dine-in",
      tableNumber,
      address,
      items = [],
      subtotal = 0,
      discount = 0,
      delivery = 0,
      tax = 0,
      tip = 0,
      total = 0,
      specialInstructions = ""
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: "Cart cannot be empty" });
    }

    if (!customerName || !customerPhone) {
      return res.status(400).json({ success: false, error: "Customer name and phone number are required" });
    }

    const orderId = req.body.orderId || `MSF-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderRecord = {
      id: orderId,
      customer_name: customerName,
      customer_phone: customerPhone,
      order_type: orderType,
      table_number: orderType === "dine-in" ? (tableNumber || "Counter") : null,
      address: orderType === "delivery" ? address : null,
      subtotal: Number(subtotal),
      discount: Number(discount),
      delivery_fee: Number(delivery),
      tax: Number(tax),
      tip: Number(tip),
      total: Number(total),
      items,
      special_instructions: specialInstructions,
      status: "received",
      created_at: new Date().toISOString()
    };

    // Save to PostgreSQL if connected
    if (isDbConnected()) {
      try {
        const insertQuery = `
          INSERT INTO orders (
            id, customer_name, customer_phone, order_type, table_number,
            address, subtotal, discount, delivery_fee, tax, tip, total,
            items, special_instructions, status, created_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
          RETURNING *;
        `;
        const values = [
          orderRecord.id,
          orderRecord.customer_name,
          orderRecord.customer_phone,
          orderRecord.order_type,
          orderRecord.table_number,
          orderRecord.address,
          orderRecord.subtotal,
          orderRecord.discount,
          orderRecord.delivery_fee,
          orderRecord.tax,
          orderRecord.tip,
          orderRecord.total,
          JSON.stringify(orderRecord.items),
          orderRecord.special_instructions,
          orderRecord.status,
          orderRecord.created_at
        ];
        await query(insertQuery, values);
      } catch (dbErr) {
        console.warn("⚠️  [PostgreSQL] Order write failed, saving to memory fallback:", dbErr.message);
        memoryOrders.push(orderRecord);
      }
    } else {
      memoryOrders.push(orderRecord);
    }

    // Format WhatsApp Concierge message
    const itemList = items
      .map((i) => `• ${i.quantity}x ${i.name} (₹${Number(i.price) * Number(i.quantity)})${i.customization ? ` [${i.customization}]` : ""}`)
      .join("\n");

    const message = `*☕ New Order — Musafir Cafe Baramati*\n*Order ID:* ${orderId}\n*Customer:* ${customerName} (${customerPhone})\n*Type:* ${orderType.toUpperCase()}${tableNumber ? ` (Table: ${tableNumber})` : ""}${address ? `\n*Address:* ${address}` : ""}\n\n*Items:*\n${itemList}\n\n*Total:* ₹${total}\n*Date:* ${new Date().toLocaleString("en-IN")}`;

    const whatsappUrl = generateWhatsAppOrderUrl(CAFE_WHATSAPP, message);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: orderRecord,
      whatsappUrl
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/orders — List recent orders
router.get("/", async (_req, res) => {
  try {
    if (isDbConnected()) {
      const result = await query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 50;");
      return res.json({ success: true, count: result.rows.length, orders: result.rows, source: "postgresql" });
    }
    return res.json({ success: true, count: memoryOrders.length, orders: memoryOrders, source: "memory_fallback" });
  } catch (error) {
    return res.json({ success: true, count: memoryOrders.length, orders: memoryOrders, source: "memory_fallback" });
  }
});

module.exports = router;


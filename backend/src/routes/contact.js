const express = require("express");
const { query, isDbConnected } = require("../config/db");

const router = express.Router();

const memoryMessages = [];

// POST /api/contact — Send inquiry / feedback
router.post("/", async (req, res) => {
  try {
    const { name, contact, subject = "General Inquiry", message } = req.body;

    if (!name || !contact || !message) {
      return res.status(400).json({
        success: false,
        error: "Please provide your name, contact (email or phone), and message"
      });
    }

    const messageRecord = {
      id: req.body.id || `MSF-MSG-${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      contact,
      subject,
      message,
      status: "unread",
      created_at: new Date().toISOString()
    };

    if (isDbConnected()) {
      try {
        const insertQuery = `
          INSERT INTO messages (id, name, contact, subject, message, status, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
        `;
        const values = [
          messageRecord.id,
          messageRecord.name,
          messageRecord.contact,
          messageRecord.subject,
          messageRecord.message,
          messageRecord.status,
          messageRecord.created_at
        ];
        await query(insertQuery, values);
      } catch (dbErr) {
        console.warn("⚠️  [PostgreSQL] Message write failed, saving to memory fallback:", dbErr.message);
        memoryMessages.push(messageRecord);
      }
    } else {
      memoryMessages.push(messageRecord);
    }

    return res.status(201).json({
      success: true,
      message: "Thank you for reaching out! The Musafir team will connect with you shortly.",
      contactMessage: messageRecord
    });
  } catch (error) {
    console.error("Contact message error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/contact — List messages
router.get("/", async (_req, res) => {
  try {
    if (isDbConnected()) {
      const result = await query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 50;");
      return res.json({ success: true, count: result.rows.length, messages: result.rows, source: "postgresql" });
    }
    return res.json({ success: true, count: memoryMessages.length, messages: memoryMessages, source: "memory_fallback" });
  } catch (error) {
    return res.json({ success: true, count: memoryMessages.length, messages: memoryMessages, source: "memory_fallback" });
  }
});

module.exports = router;


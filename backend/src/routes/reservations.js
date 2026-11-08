const express = require("express");
const { query, isDbConnected } = require("../config/db");

const router = express.Router();

const memoryReservations = [];

// POST /api/reservations — Book a table
router.post("/", async (req, res) => {
  try {
    const { name, phone, date, time, guests = 2, zone = "Terrace Garden Canopy", notes = "" } = req.body;

    if (!name || !phone || !date || !time) {
      return res.status(400).json({
        success: false,
        error: "Missing required reservation details (name, phone, date, time)"
      });
    }

    const reservationId = req.body.id || `MSF-RSV-${Math.floor(100000 + Math.random() * 900000)}`;

    const reservationRecord = {
      id: reservationId,
      name,
      phone,
      date,
      time,
      guests: Number(guests),
      zone,
      notes,
      status: "confirmed",
      created_at: new Date().toISOString()
    };

    if (isDbConnected()) {
      try {
        const insertQuery = `
          INSERT INTO reservations (id, name, phone, date, time, guests, zone, notes, status, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *;
        `;
        const values = [
          reservationRecord.id,
          reservationRecord.name,
          reservationRecord.phone,
          reservationRecord.date,
          reservationRecord.time,
          reservationRecord.guests,
          reservationRecord.zone,
          reservationRecord.notes,
          reservationRecord.status,
          reservationRecord.created_at
        ];
        await query(insertQuery, values);
      } catch (dbErr) {
        console.warn("⚠️  [PostgreSQL] Reservation write failed, saving to memory fallback:", dbErr.message);
        memoryReservations.push(reservationRecord);
      }
    } else {
      memoryReservations.push(reservationRecord);
    }

    return res.status(201).json({
      success: true,
      message: "Reservation confirmed! Your Musafir Table Pass is active.",
      reservation: reservationRecord
    });
  } catch (error) {
    console.error("Reservation error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/reservations — List reservations
router.get("/", async (_req, res) => {
  try {
    if (isDbConnected()) {
      const result = await query("SELECT * FROM reservations ORDER BY created_at DESC LIMIT 50;");
      return res.json({ success: true, count: result.rows.length, reservations: result.rows, source: "postgresql" });
    }
    return res.json({ success: true, count: memoryReservations.length, reservations: memoryReservations, source: "memory_fallback" });
  } catch (error) {
    return res.json({ success: true, count: memoryReservations.length, reservations: memoryReservations, source: "memory_fallback" });
  }
});

module.exports = router;


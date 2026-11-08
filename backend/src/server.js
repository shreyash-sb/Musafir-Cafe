const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { isDbConnected, pool } = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:4500,http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

app.use(express.json());

// Request logging in development
if (process.env.NODE_ENV !== "production") {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
  });
}

// Health check endpoint
app.get("/", (_req, res) => {
  res.json({
    status: "online",
    name: "Musafir Cafe & Roastery Backend API",
    version: "1.0.0",
    database: isDbConnected() ? "PostgreSQL Connected" : "In-Memory Resilient Fallback",
    endpoints: {
      health: "/api/health",
      orders: "/api/orders",
      reservations: "/api/reservations",
      contact: "/api/contact",
      products: "/api/products"
    },
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", async (_req, res) => {
  let dbStatus = "disconnected";
  try {
    const dbRes = await pool.query("SELECT NOW()");
    dbStatus = dbRes.rows.length ? "connected" : "error";
  } catch (err) {
    dbStatus = `offline (${err.message})`;
  }

  res.json({
    uptime: process.uptime(),
    status: "healthy",
    database: {
      type: "PostgreSQL",
      status: dbStatus
    },
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use("/api/orders", require("./routes/orders"));
app.use("/api/reservations", require("./routes/reservations"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/products", require("./routes/products"));

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Endpoint not found" });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`
  ☕ ==============================================================
     Musafir Cafe & Roastery — Backend Server Running!
  ==============================================================
  🚀 Port:            http://localhost:${PORT}
  📡 Health Check:    http://localhost:${PORT}/api/health
  🐘 PostgreSQL:      ${process.env.DATABASE_URL ? "Configured in .env" : "Default localhost:5432"}
  ==============================================================
  `);
});

module.exports = app;


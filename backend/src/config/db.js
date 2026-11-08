const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === "production";
const useSsl = process.env.DATABASE_SSL === "true" || (connectionString && connectionString.includes("sslmode=require"));

const poolConfig = connectionString
  ? {
      connectionString,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    }
  : {
      host: process.env.PGHOST || "localhost",
      port: Number(process.env.PGPORT) || 5432,
      user: process.env.PGUSER || "postgres",
      password: process.env.PGPASSWORD || "postgres",
      database: process.env.PGDATABASE || "musafir_cafe",
      ssl: useSsl ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    };

const pool = new Pool(poolConfig);

let isConnected = false;

// Test initial connection
pool.connect((err, client, release) => {
  if (err) {
    console.warn("⚠️  [PostgreSQL] Connection warning:", err.message);
    console.warn("👉 Backend will operate with in-memory resilient fallback until PostgreSQL is connected.");
    isConnected = false;
  } else {
    isConnected = true;
    console.log("✅ [PostgreSQL] Connected successfully to database!");
    release();
  }
});

pool.on("error", (err) => {
  console.error("❌ [PostgreSQL] Unexpected error on idle client:", err.message);
  isConnected = false;
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  isDbConnected: () => isConnected
};


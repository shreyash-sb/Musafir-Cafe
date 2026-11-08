const fs = require("fs");
const path = require("path");
const { pool } = require("../config/db");

async function initDb() {
  console.log("🚀 Starting Musafir PostgreSQL Database Initialization...");

  const schemaPath = path.join(__dirname, "schema.sql");
  const seedPath = path.join(__dirname, "seed.sql");

  try {
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    console.log("📄 Executing schema.sql (tables & indexes)...");
    await pool.query(schemaSql);
    console.log("✅ Schema applied successfully!");

    if (fs.existsSync(seedPath)) {
      const seedSql = fs.readFileSync(seedPath, "utf8");
      console.log("🌱 Executing seed.sql (initial menu & sample data)...");
      await pool.query(seedSql);
      console.log("✅ Seed data populated successfully!");
    }

    console.log("🎉 Database initialization completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Database initialization failed:", err.message);
    console.error("\n💡 Tips to resolve:");
    console.error("1. Ensure PostgreSQL is running on your machine or cloud.");
    console.error("2. Check your credentials in backend/.env (DATABASE_URL).");
    console.error("3. If the database 'musafir_cafe' doesn't exist, create it first:");
    console.error("   psql -U postgres -c 'CREATE DATABASE musafir_cafe;'");
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDb();


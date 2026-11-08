const express = require("express");
const { query, isDbConnected } = require("../config/db");

const router = express.Router();

// GET /api/products — Fetch menu catalog
router.get("/", async (req, res) => {
  try {
    const { category, featured } = req.query;

    if (isDbConnected()) {
      let sql = "SELECT * FROM products WHERE 1=1";
      const params = [];

      if (category && category !== "All") {
        params.push(category);
        sql += ` AND category = $${params.length}`;
      }

      if (featured === "true") {
        params.push(true);
        sql += ` AND featured = $${params.length}`;
      }

      sql += " ORDER BY price ASC;";

      const result = await query(sql, params);
      return res.json({
        success: true,
        count: result.rows.length,
        products: result.rows,
        source: "postgresql"
      });
    }

    return res.json({
      success: true,
      message: "Database in fallback mode",
      products: [],
      source: "memory_fallback"
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;


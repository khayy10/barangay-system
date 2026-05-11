const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// test once
pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.error("❌ DB Error:", err);
  } else {
    console.log("✅ PostgreSQL connected");
  }
});

module.exports = pool;
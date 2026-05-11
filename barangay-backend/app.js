require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 BSPS API is running");
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

module.exports = app;
const db = require("../config/db");

exports.getInventory = async (req, res) => {
  const data = await db.query("SELECT * FROM inventory");
  res.json(data.rows);
};

exports.addItem = async (req, res) => {
  const { item, quantity } = req.body;

  const result = await db.query(
    "INSERT INTO inventory (item,quantity) VALUES ($1,$2) RETURNING *",
    [item, quantity]
  );

  res.json(result.rows[0]);
};
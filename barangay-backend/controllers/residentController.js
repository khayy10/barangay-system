const db = require("../config/db");

exports.getResidents = async (req, res) => {
  const data = await db.query("SELECT * FROM residents ORDER BY created_at DESC");
  res.json(data.rows);
};

exports.addResident = async (req, res) => {
  const { name, address, contact } = req.body;

  const result = await db.query(
    "INSERT INTO residents (name,address,contact) VALUES ($1,$2,$3) RETURNING *",
    [name, address, contact]
  );

  res.json(result.rows[0]);
};

exports.updateResident = async (req, res) => {
  const { id } = req.params;
  const { name, address, contact } = req.body;

  const result = await db.query(
    "UPDATE residents SET name=$1,address=$2,contact=$3 WHERE id=$4 RETURNING *",
    [name, address, contact, id]
  );

  res.json(result.rows[0]);
};

exports.deleteResident = async (req, res) => {
  await db.query("DELETE FROM residents WHERE id=$1", [req.params.id]);
  res.json({ message: "Deleted" });
};
const db = require("../config/db");

exports.requestCertificate = async (req, res) => {
  const { resident_id, type } = req.body;

  const result = await db.query(
    "INSERT INTO certificates (resident_id,type,status) VALUES ($1,$2,'pending') RETURNING *",
    [resident_id, type]
  );

  res.json(result.rows[0]);
};

exports.approveCertificate = async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    "UPDATE certificates SET status='approved' WHERE id=$1 RETURNING *",
    [id]
  );

  res.json(result.rows[0]);
};
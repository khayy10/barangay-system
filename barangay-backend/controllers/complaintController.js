const db = require("../config/db");

exports.createComplaint = async (req, res) => {
  const { resident_id, description } = req.body;

  const result = await db.query(
    "INSERT INTO complaints (resident_id,description,status) VALUES ($1,$2,'pending') RETURNING *",
    [resident_id, description]
  );

  res.json(result.rows[0]);
};

exports.updateComplaint = async (req, res) => {
  const { status } = req.body;

  const result = await db.query(
    "UPDATE complaints SET status=$1 WHERE id=$2 RETURNING *",
    [status, req.params.id]
  );

  res.json(result.rows[0]);
};
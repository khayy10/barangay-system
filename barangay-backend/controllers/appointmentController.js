const db = require("../config/db");

exports.createAppointment = async (req, res) => {
  const { resident_id, date, reason } = req.body;

  const result = await db.query(
    "INSERT INTO appointments (resident_id,date,reason,status) VALUES ($1,$2,$3,'pending') RETURNING *",
    [resident_id, date, reason]
  );

  res.json(result.rows[0]);
};
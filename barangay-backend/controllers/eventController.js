const db = require("../config/db");

exports.getEvents = async (req, res) => {
  const data = await db.query("SELECT * FROM events ORDER BY date ASC");
  res.json(data.rows);
};

exports.createEvent = async (req, res) => {
  const { title, date, location } = req.body;

  const result = await db.query(
    "INSERT INTO events (title,date,location) VALUES ($1,$2,$3) RETURNING *",
    [title, date, location]
  );

  res.json(result.rows[0]);
};
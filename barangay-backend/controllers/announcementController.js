const db = require("../config/db");

exports.getAnnouncements = async (req, res) => {
  const data = await db.query("SELECT * FROM announcements ORDER BY created_at DESC");
  res.json(data.rows);
};

exports.createAnnouncement = async (req, res) => {
  const { title, message } = req.body;

  const result = await db.query(
    "INSERT INTO announcements (title,message) VALUES ($1,$2) RETURNING *",
    [title, message]
  );

  res.json(result.rows[0]);
};
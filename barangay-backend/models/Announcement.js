const db = require("../config/db");

module.exports = {
  getAll: () =>
    db.query("SELECT * FROM announcements ORDER BY created_at DESC"),

  create: (d) =>
    db.query(
      "INSERT INTO announcements(title,message) VALUES($1,$2) RETURNING *",
      [d.title, d.message]
    ),
};
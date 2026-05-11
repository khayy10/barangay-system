const db = require("../config/db");

module.exports = {
  getAll: () => db.query("SELECT * FROM events ORDER BY date ASC"),

  create: (d) =>
    db.query(
      "INSERT INTO events(title,date,location) VALUES($1,$2,$3) RETURNING *",
      [d.title, d.date, d.location]
    ),
};
const db = require("../config/db");

module.exports = {
  create: (d) =>
    db.query(
      "INSERT INTO jobs(title,description,budget,status) VALUES($1,$2,$3,'open') RETURNING *",
      [d.title, d.description, d.budget]
    ),

  getAll: () => db.query("SELECT * FROM jobs ORDER BY created_at DESC"),
};
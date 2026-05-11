const db = require("../config/db");

module.exports = {
  getAll: () => db.query("SELECT * FROM residents ORDER BY created_at DESC"),

  create: (d) =>
    db.query(
      "INSERT INTO residents(name,address,contact) VALUES($1,$2,$3) RETURNING *",
      [d.name, d.address, d.contact]
    ),
};
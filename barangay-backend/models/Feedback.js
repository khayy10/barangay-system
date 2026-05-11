const db = require("../config/db");

module.exports = {
  create: (d) =>
    db.query(
      "INSERT INTO feedback(resident_id,message) VALUES($1,$2) RETURNING *",
      [d.resident_id, d.message]
    ),
};
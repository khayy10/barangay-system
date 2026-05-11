const db = require("../config/db");

module.exports = {
  create: (d) =>
    db.query(
      "INSERT INTO appointments(resident_id,date,reason,status) VALUES($1,$2,$3,'pending') RETURNING *",
      [d.resident_id, d.date, d.reason]
    ),
};
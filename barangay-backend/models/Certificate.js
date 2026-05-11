const db = require("../config/db");

module.exports = {
  create: (d) =>
    db.query(
      "INSERT INTO certificates(resident_id,type,status) VALUES($1,$2,'pending') RETURNING *",
      [d.resident_id, d.type]
    ),

  approve: (id) =>
    db.query(
      "UPDATE certificates SET status='approved' WHERE id=$1 RETURNING *",
      [id]
    ),
};
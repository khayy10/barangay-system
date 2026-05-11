const db = require("../config/db");

module.exports = {
  create: (d) =>
    db.query(
      "INSERT INTO complaints(resident_id,description,status) VALUES($1,$2,'pending') RETURNING *",
      [d.resident_id, d.description]
    ),

  updateStatus: (id, status) =>
    db.query(
      "UPDATE complaints SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    ),
};
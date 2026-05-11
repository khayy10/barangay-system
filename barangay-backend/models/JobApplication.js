const db = require("../config/db");

module.exports = {
  apply: (d) =>
    db.query(
      "INSERT INTO job_applications(job_id,resident_id) VALUES($1,$2) RETURNING *",
      [d.job_id, d.resident_id]
    ),
};
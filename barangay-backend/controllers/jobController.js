const db = require("../config/db");

exports.postJob = async (req, res) => {
  const { title, description, budget } = req.body;

  const result = await db.query(
    "INSERT INTO jobs (title,description,budget,status) VALUES ($1,$2,$3,'open') RETURNING *",
    [title, description, budget]
  );

  res.json(result.rows[0]);
};

exports.applyJob = async (req, res) => {
  const { job_id, resident_id } = req.body;

  const result = await db.query(
    "INSERT INTO job_applications (job_id,resident_id) VALUES ($1,$2) RETURNING *",
    [job_id, resident_id]
  );

  res.json(result.rows[0]);
};
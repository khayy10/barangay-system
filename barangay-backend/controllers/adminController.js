const db = require("../config/db");

exports.getDashboardStats = async (req, res) => {
  const residents = await db.query("SELECT COUNT(*) FROM residents");
  const complaints = await db.query("SELECT COUNT(*) FROM complaints");
  const jobs = await db.query("SELECT COUNT(*) FROM jobs");

  res.json({
    residents: residents.rows[0].count,
    complaints: complaints.rows[0].count,
    jobs: jobs.rows[0].count,
  });
};
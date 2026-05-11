const db = require("../config/db");

exports.getAnalytics = async (req, res) => {
  const residents = await db.query("SELECT COUNT(*) FROM residents");
  const certificates = await db.query("SELECT COUNT(*) FROM certificates");
  const complaints = await db.query("SELECT COUNT(*) FROM complaints");

  res.json({
    residents: residents.rows[0].count,
    certificates: certificates.rows[0].count,
    complaints: complaints.rows[0].count
  });
};
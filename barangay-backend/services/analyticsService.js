const db = require("../config/db");

module.exports = {
  getSummary: async () => {
    const residents = await db.query("SELECT COUNT(*) FROM residents");
    const complaints = await db.query("SELECT COUNT(*) FROM complaints");
    const jobs = await db.query("SELECT COUNT(*) FROM jobs");
    const certificates = await db.query("SELECT COUNT(*) FROM certificates");

    return {
      residents: +residents.rows[0].count,
      complaints: +complaints.rows[0].count,
      jobs: +jobs.rows[0].count,
      certificates: +certificates.rows[0].count,
    };
  },
};
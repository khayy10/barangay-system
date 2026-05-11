const db = require("../config/db");

module.exports = {
  getStats: async () => {
    const r = await db.query("SELECT COUNT(*) FROM residents");
    const c = await db.query("SELECT COUNT(*) FROM complaints");
    const j = await db.query("SELECT COUNT(*) FROM jobs");

    return {
      residents: r.rows[0].count,
      complaints: c.rows[0].count,
      jobs: j.rows[0].count,
    };
  },
};
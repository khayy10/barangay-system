const db = require("../config/db");

module.exports = {
  findMatches: async (jobId) => {
    const job = await db.query("SELECT * FROM jobs WHERE id=$1", [jobId]);

    if (!job.rows.length) return [];

    const data = job.rows[0];

    // Simple rule-based matching
    const candidates = await db.query(
      "SELECT * FROM residents"
    );

    // Example scoring system
    const matches = candidates.rows.map((r) => {
      let score = 0;

      if (r.skills && data.title) {
        if (r.skills.toLowerCase().includes(data.title.toLowerCase())) {
          score += 50;
        }
      }

      if (data.budget > 0) {
        score += 20;
      }

      return { ...r, score };
    });

    return matches.sort((a, b) => b.score - a.score);
  },
};
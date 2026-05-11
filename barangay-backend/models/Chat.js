const db = require("../config/db");

module.exports = {
  save: (d) =>
    db.query(
      "INSERT INTO messages(sender_id,receiver_id,message) VALUES($1,$2,$3) RETURNING *",
      [d.sender_id, d.receiver_id, d.message]
    ),

  getConversation: (u1, u2) =>
    db.query(
      "SELECT * FROM messages WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id=$1)",
      [u1, u2]
    ),
};
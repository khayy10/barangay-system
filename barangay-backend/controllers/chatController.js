const db = require("../config/db");

exports.saveMessage = async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  const result = await db.query(
    "INSERT INTO messages (sender_id,receiver_id,message) VALUES ($1,$2,$3) RETURNING *",
    [sender_id, receiver_id, message]
  );

  res.json(result.rows[0]);
};

exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.params;

  const data = await db.query(
    "SELECT * FROM messages WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id=$1)",
    [user1, user2]
  );

  res.json(data.rows);
};
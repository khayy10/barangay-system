const db = require("../config/db");

module.exports = {
  create: (data) =>
    db.query(
      "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
      [data.name, data.email, data.password, data.role]
    ),

  findByEmail: (email) =>
    db.query("SELECT * FROM users WHERE email=$1", [email]),
};
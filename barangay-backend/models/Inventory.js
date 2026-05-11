const db = require("../config/db");

module.exports = {
  getAll: () => db.query("SELECT * FROM inventory"),

  add: (d) =>
    db.query(
      "INSERT INTO inventory(item,quantity) VALUES($1,$2) RETURNING *",
      [d.item, d.quantity]
    ),
};
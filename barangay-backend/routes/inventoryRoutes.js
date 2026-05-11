const router = require("express").Router();
const c = require("../controllers/inventoryController");

router.get("/", c.getInventory);
router.post("/", c.addItem);

module.exports = router;
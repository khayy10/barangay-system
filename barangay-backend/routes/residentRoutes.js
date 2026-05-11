const router = require("express").Router();
const c = require("../controllers/residentController");

router.get("/", c.getResidents);
router.post("/", c.addResident);
router.put("/:id", c.updateResident);
router.delete("/:id", c.deleteResident);

module.exports = router;
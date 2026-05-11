const router = require("express").Router();
const c = require("../controllers/complaintController");

router.post("/", c.createComplaint);
router.put("/:id", c.updateComplaint);

module.exports = router;
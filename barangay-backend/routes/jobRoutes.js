const router = require("express").Router();
const c = require("../controllers/jobController");

router.post("/", c.postJob);
router.post("/apply", c.applyJob);

module.exports = router;
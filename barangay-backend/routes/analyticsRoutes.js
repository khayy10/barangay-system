const router = require("express").Router();
const c = require("../controllers/analyticsController");

router.get("/", c.getAnalytics);

module.exports = router;
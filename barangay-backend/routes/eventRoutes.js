const router = require("express").Router();
const c = require("../controllers/eventController");

router.get("/", c.getEvents);
router.post("/", c.createEvent);

module.exports = router;
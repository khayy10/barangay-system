const router = require("express").Router();
const c = require("../controllers/announcementController");

router.get("/", c.getAnnouncements);
router.post("/", c.createAnnouncement);

module.exports = router;
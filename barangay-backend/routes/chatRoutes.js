const router = require("express").Router();
const c = require("../controllers/chatController");

router.post("/", c.saveMessage);
router.get("/:user1/:user2", c.getMessages);

module.exports = router;
const router = require("express").Router();
const c = require("../controllers/certificateController");

router.post("/", c.requestCertificate);
router.put("/:id", c.approveCertificate);

module.exports = router;
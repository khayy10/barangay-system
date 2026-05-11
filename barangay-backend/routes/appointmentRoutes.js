const router = require("express").Router();
const c = require("../controllers/appointmentController");

router.post("/", c.createAppointment);

module.exports = router;
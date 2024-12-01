const { createClassSchedule } = require("../controller/classScheduleController");

const router = require("express").Router();

router.route('/').post(createClassSchedule);

module.exports = router;
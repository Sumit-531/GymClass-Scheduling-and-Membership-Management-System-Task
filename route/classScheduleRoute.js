const { authentication, restrictTo } = require("../controller/authController");
const { createClassSchedule, getAllclassSchedule, getClassScheduleById } = require("../controller/classScheduleController");

const router = require("express").Router();

// permission given to admin
router
.route('/')
.post(authentication, restrictTo("0"), createClassSchedule)
.get(authentication, getAllclassSchedule);

router
    .route('/:id')
    .get(authentication, restrictTo('0'), getClassScheduleById)
    .patch(authentication, restrictTo('0'), getClassScheduleById)
    .delete(authentication, restrictTo('0'), getClassScheduleById);

module.exports = router;
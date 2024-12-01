const classschedule = require("../db/models/classschedule");
const catchAsync = require("../utils/catchAsync");

const createClassSchedule = catchAsync(async(req, res, next) => {
    const body = req.body;

    const newClassSchedule = await classschedule.create({
        date: body.date,
        startTime: body.startTime,
        endTime: body.endTime,
        trainerId: body.trainerId,
        maxTrainees: body.maxTrainees || 10, 
        currentTrainees: 0,
        createdBy: 1,
    });

    res.status(201).json({
        status: "success",
        data: newClassSchedule,
    });
});

module.exports = { createClassSchedule };
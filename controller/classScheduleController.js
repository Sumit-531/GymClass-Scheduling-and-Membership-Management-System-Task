const classschedule = require("../db/models/classschedule");
const catchAsync = require("../utils/catchAsync");

const createClassSchedule = catchAsync(async(req, res, next) => {
    const body = req.body;
    const userId = req.user.id;

    const newClassSchedule = await classschedule.create({
        date: body.date,
        startTime: body.startTime,
        endTime: body.endTime,
        trainerId: body.trainerId,
        maxTrainees: body.maxTrainees || 10, 
        createdBy: userId,
    });

    res.status(201).json({
        status: "success",
        data: newClassSchedule,
    });
});

const getAllclassSchedule = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const result = await classschedule.findAll({
        include: user,
        where: { createdBy: userId },
    });

    return res.json({
        status: 'success',
        data: result,
    });
});

const getClassScheduleById = catchAsync(async (req, res, next) => {
    const classScheduleId = req.params.id;
    const result = await project.findByPk(classScheduleId, { include: user });
    if (!result) {
        return next(new AppError('Invalid class schedule id', 400));
    }
    return res.json({
        status: 'success',
        data: result,
    });
});

const updateClassSchedule = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const classScheduleId = req.params.id;
    const body = req.body;

    const result = await project.findOne({
        where: { id: classScheduleIdId, createdBy: userId },
    });

    if (!result) {
        return next(new AppError('Invalid class schedule id', 400));
    }
        result.date = body.date;
        result.gstartTime = body.startTime;
        result.endTime = body.endTime;
        result.trainerId = body.trainerId;
        result.maxTrainees = body.maxTrainees || 10; 
        result.createdBy = userId;

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteClassSchedule = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const classScheduleId = req.params.id;
    const body = req.body;

    const result = await classschedule.findOne({
        where: { id: classScheduleId, createdBy: userId },
    });

    if (!result) {
        return next(new AppError('Invalid class schedule id', 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});


module.exports = { createClassSchedule, getAllclassSchedule, getClassScheduleById, updateClassSchedule, deleteClassSchedule };
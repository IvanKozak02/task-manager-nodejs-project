const Task = require('../models/task.model')
const asyncWrapper = require('../middlewares/async');
const CustomAPIError = require("../errors/custom-error.error");


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    return res.status(200).json({status: 'success', data: {tasks, amount: tasks.length}}); // RESPONSE TYPES
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id: taskID});
    if (!task) {
        return next(new CustomAPIError('Not found', 404));
    }
    return res.status(200).json({task});
});

const createNewTask = asyncWrapper(async (req, res) => {
    const data = req.body;
    const newTask = await Task.create(data);
    return res.status(201).json({success: true, data: newTask})
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const updatedData = req.body;
    const updatedTask = await Task.findOneAndUpdate({_id: taskID}, updatedData, {new: true, runValidators: true});
    if (!updatedTask) {
        return next(new CustomAPIError('Not found', 404));
    }
    return res.status(200).json(updatedTask);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const deletedTask = await Task.findOneAndDelete({_id: taskID});
    if (!deletedTask) {
        return next(new CustomAPIError('Not found', 404));
    }
    return res.status(200).json(deletedTask);
})

module.exports = {
    getAllTasks,
    createNewTask,
    getTask,
    updateTask,
    deleteTask,
}
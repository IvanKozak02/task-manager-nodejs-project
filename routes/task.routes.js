const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask,
    getTask,
} = require('../controller/tasks.controller');


router.route('/')
    .get(getAllTasks)
    .post(createNewTask);
router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask)

module.exports = {router};


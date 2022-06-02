/* eslint-disable no-unused-expressions */
const { successResponse, failResponse } = require('../helpers');
const {
  getTasksFromDb,
  createNewTask,
  deleteTaskFromDb,
} = require('../models/tasksModel');

async function getTasks(req, res) {
  const tasks = await getTasksFromDb(req.userId);
  tasks ? successResponse(res, tasks) : failResponse(res, 'no tasks found');
}

async function postTask(req, res) {
  const postedTask = await createNewTask(req.userId, req.body.description);
  postedTask
    ? successResponse(res, postedTask)
    : failResponse(res, "couldn't post new task");
}

async function deleteTask(req, res) {
  const deletedTask = await deleteTaskFromDb(req.userId, req.params.id);
  deletedTask
    ? successResponse(res, deletedTask)
    : failResponse(res, "couldn't delete the task");
}

module.exports = { getTasks, postTask, deleteTask };

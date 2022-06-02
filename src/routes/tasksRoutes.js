const express = require('express');
const {
  getTasks,
  postTask,
  deleteTask,
} = require('../controllers/tasksController');
const { validatePost, validateJWToken } = require('../helpers');

const tasksRouter = express.Router();

tasksRouter.get('/', validateJWToken, getTasks);
tasksRouter.post('/', validateJWToken, validatePost, postTask);
tasksRouter.delete('/:id', validateJWToken, deleteTask);

module.exports = tasksRouter;

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { validateUserData } = require('../helpers');

const authRouter = express.Router();

authRouter.post('/register', validateUserData, registerUser);

authRouter.post('/login', validateUserData, loginUser);

module.exports = authRouter;

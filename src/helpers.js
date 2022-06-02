/* eslint-disable consistent-return */
/* eslint-disable newline-per-chained-call */

require('dotenv').config();

// Response helpers

function successResponse(res, message) {
  res.json({ success: true, msg: message });
}

function failResponse(res, message) {
  res.status(400).json({ success: false, msg: message });
}

// Database connection

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

// Password encryption/comparison

const bcrypt = require('bcryptjs');

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePassword(enteredPassword, hashedPassword) {
  return bcrypt.compareSync(enteredPassword, hashedPassword);
}

// Joi validation

const Joi = require('joi');

async function validateUserData(req, res, next) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().max(40).required(),
      password: Joi.string().alphanum().min(5).max(40).required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    const errorArray = error.details.map((errorDetail) => errorDetail.message);
    failResponse(res, errorArray);
  }
}

async function validatePost(req, res, next) {
  try {
    const schema = Joi.object({
      description: Joi.string().min(3).max(100).required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    const errorArray = error.details.map((errorDetail) => errorDetail.message);
    failResponse(res, errorArray);
  }
}

// JWT Token

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

function createJWToken(userId) {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1h' });
}

function validateJWToken(req, res, next) {
  if (!req.headers.authorization) {
    return failResponse(res, 'no token');
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return failResponse(res, 'token not valid');
    }
    req.userId = user.id;
    next();
  });
}

module.exports = {
  successResponse,
  failResponse,
  dbConfig,
  encryptPassword,
  comparePassword,
  validateUserData,
  validatePost,
  createJWToken,
  validateJWToken,
};

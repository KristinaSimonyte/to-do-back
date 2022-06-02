/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
const {
  successResponse,
  failResponse,
  encryptPassword,
  comparePassword,
  createJWToken,
} = require('../helpers');
const {
  registerUserToDb,
  loginUserToDb,
  checkIfAlreadyRegistered,
} = require('../models/authModel');

async function registerUser(req, res) {
  const alreadyRegistered = await checkIfAlreadyRegistered(req.body.email);
  if (alreadyRegistered) {
    return failResponse(res, 'user with this email already exists');
  }
  const registerResult = await registerUserToDb({
    ...req.body,
    password: encryptPassword(req.body.password),
  });
  registerResult
    ? successResponse(res, 'user registered successfully')
    : failResponse(res, 'mesage' + registerResult );
}

async function loginUser(req, res) {
  const foundUser = await loginUserToDb(req.body.email);
  if (!foundUser) {
    failResponse(res, 'Email or password is incorrect');
    return;
  }
  if (comparePassword(req.body.password, foundUser.password)) {
    const token = createJWToken(foundUser.id);
    successResponse(res, token);
    return;
  }
  failResponse(res, 'Email or password is incorrect');
}

module.exports = { registerUser, loginUser };

const jwtGenerator = require('../util/jwtGenerator');
require('dotenv').config();
const {
  validateEmail,
  validateDisplayName,
  verifyEmailExistingEmail,
  validatePassword,
  verifyEmptyEmail,
  verifyEmptyPassword,
  verifyUser,
} = require('../services/validateUser');

function verifyBodyRequisition(req, res, next) {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  next();
}

function verifyEmail(req, res, next) {
  const { email } = req.body;

  const isEmailValid = validateEmail(email);
    if (isEmailValid.message) {
      return res.status(400).json({ message: isEmailValid.message });
    }

    const isEmptyEmail = verifyEmptyEmail(email);
    if (isEmptyEmail) {
      return res.status(400).json({ message: isEmptyEmail.message });
    }

    next();
}

function verifyPassword(req, res, next) {
  const { password } = req.body;

  const isValidPassword = validatePassword(password);
  if (isValidPassword.message) {
    return res.status(400).json({ message: isValidPassword.message });
  }

  const isPasswordEmpty = verifyEmptyPassword(password);
  if (isPasswordEmpty.message) {
    return res.status(400).json({ message: isPasswordEmpty.message });
  }

  next();
}

async function validateBodyEntrance(req, res, next) {
  const { email, displayName } = req.body;

  const isDisplayNameValid = validateDisplayName(displayName);
  
  if (isDisplayNameValid.message) {
     return res.status(400).json({ message: isDisplayNameValid.message });
  }

  const isThereAnExactEmail = await verifyEmailExistingEmail(email);
  if (isThereAnExactEmail.message) {
    return res.status(409).json({ message: isThereAnExactEmail.message });
  }

  next();
}

function insertAuthorizationToken(req, _res, next) {
  const { email, displayName } = req.body;

  const user = { email, displayName };

  req.body.token = jwtGenerator(user);

  next();
}

async function validateUserExistence(req, res, next) {
  const { email } = req.body;

  const userExist = await verifyUser(email);

  if (!userExist.message) {
    return res.status(400).json({ message: userExist.message });
  }

  next();
}

module.exports = {
  verifyBodyRequisition,
  validateBodyEntrance,
  insertAuthorizationToken,
  verifyEmail,
  verifyPassword,
  validateUserExistence,
};
const jwtUtil = require('../util/jwt');
require('dotenv').config();
const {
  validateEmail,
  validateDisplayName,
  verifyEmailExistingEmail,
  validatePassword,
  verifyEmptyEmail,
  verifyEmptyPassword,
  verifyUser,
  verifyUserId,
} = require('../services/validateUser');

function verifyBodyRequisition(req, res, next) {
  const { email, password } = req.body;
  
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  
  if (password === undefined) return res.status(400).json({ message: '"password" is required' });
  
  next();
}

function verifyEmail(req, res, next) {
  const { email } = req.body;
  
  const isEmptyEmail = verifyEmptyEmail(email);
  if (isEmptyEmail) {
    return res.status(400).json({ message: isEmptyEmail.message });
  }
  
  const isEmailValid = validateEmail(email);
  if (isEmailValid.message) {
    return res.status(400).json({ message: isEmailValid.message });
  }

    next();
}

function verifyPassword(req, res, next) {
  const { password } = req.body;
  
  const isPasswordEmpty = verifyEmptyPassword(password);
  if (isPasswordEmpty.message) {
    return res.status(400).json({ message: isPasswordEmpty.message });
  }
  
  const isValidPassword = validatePassword(password);
  if (isValidPassword.message) {
    return res.status(400).json({ message: isValidPassword.message });
  }

  next();
}

function verifyDisplayName(req, res, next) {
  const { displayName } = req.body;

  const isDisplayNameValid = validateDisplayName(displayName);
  
  if (isDisplayNameValid.message) {
     return res.status(400).json({ message: isDisplayNameValid.message });
  }

  next();
}

async function verifyEmailExistence(req, res, next) {
  const { email } = req.body;

  try {
    const isThereAnExactEmail = await verifyEmailExistingEmail(email);
    if (isThereAnExactEmail.message) {
      return res.status(409).json({ message: isThereAnExactEmail.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
}

function insertAuthorizationToken(req, _res, next) {
  const { email, displayName } = req.body;

  const user = { email, displayName };

  req.headers.authorization = jwtUtil.jwtGenerator(user);

  next();
}

async function validateFieldsExistence(req, res, next) {
  const { email } = req.body;
  
  try {
    const userExist = await verifyUser(email);
    
    if (userExist.message) {
      return res.status(400).json({ message: userExist.message });
    }
  } catch (error) {
    next();
  }
}

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    jwtUtil.jwtVerify(authorization);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}

function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  next();
}

async function validateUserId(req, res, next) {
  const { id } = req.params;
  
  try {
    const userExist = await verifyUserId(id);
    
    if (userExist.message) {
      return res.status(404).json({ message: userExist.message });
    }
  } catch (error) {
    console.error(error.message);
  }
  next();
}

module.exports = {
  verifyBodyRequisition,
  verifyDisplayName,
  insertAuthorizationToken,
  verifyEmail,
  verifyPassword,
  validateFieldsExistence,
  verifyEmailExistence,
  verifyToken,
  validateToken,
  validateUserId,
};
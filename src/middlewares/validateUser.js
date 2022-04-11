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
  console.log('middlware 1');

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  next();
}

function verifyEmail(req, res, next) {
  const { email } = req.body;
  console.log('middlware 5');
  
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
  console.log('middlware 6');

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

function verifyDisplayName(req, res, next) {
  const { displayName } = req.body;
  console.log('middlware 3');

  const isDisplayNameValid = validateDisplayName(displayName);
  
  console.log('4');
  if (isDisplayNameValid.message) {
     return res.status(400).json({ message: isDisplayNameValid.message });
  }

  next();
}

async function verifyEmailExistence(req, res, next) {
  const { email } = req.body;
  console.log('middlware 4');

  console.log('aqui');
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
  console.log('6');

  const { email, displayName } = req.body;

  const user = { email, displayName };

  req.body.token = jwtGenerator(user);

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

module.exports = {
  verifyBodyRequisition,
  verifyDisplayName,
  insertAuthorizationToken,
  verifyEmail,
  verifyPassword,
  validateFieldsExistence,
  verifyEmailExistence,
};
const { isEmail } = require('validator');
const { User } = require('../models');

function validateDisplayName(displayName) {
  if (displayName.length < 8) {
    return {
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  return true;
}

function verifyEmptyEmail(email) {
  if (email === '') {
    return {
      message: '"email" is not allowed to be empty',
    };
  }

  return false;
}

function validateEmail(email) {
  if (!isEmail(email)) {
    return {
      message: '"email" must be a valid email',
    }; 
  }

  return true;
}

async function verifyEmailExistingEmail(email) {
  const isThereAnExactEmail = await User.findOne({ where: { email } });
  
  if (isThereAnExactEmail) {
    return {
      message: 'User already registered',
    }; 
  }

  return true;
}

function validatePassword(password) {
  if (password.length !== 6) {
    return { message: '"password" length must be 6 characters long' };
  }

  return true;
}

function verifyEmptyPassword(password) {
  if (password === '') {
    return { message: '"password" is not allowed to be empty' };
  }

  return true;
}

async function verifyUser(email) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return {
      message: 'Invalid fields',
    };
  }
}

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  verifyEmailExistingEmail,
  verifyEmptyEmail,
  verifyEmptyPassword,
  verifyUser,
};
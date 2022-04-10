const { isEmail } = require('validator');
const { User } = require('../models');

function validateDisplayName(displayName) {
  if (displayName.length < 8) return false;
  return true;
}

async function validateEmail(email) {
  if (!isEmail(email)) return null;
  
  const isThereAnExactEmail = await User.findOne({ where: { email } });

  if (!isThereAnExactEmail) return null;

  return true;
}

function validatePassword(password) {
  if (password < 6) return null;

  return true;
}

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
};
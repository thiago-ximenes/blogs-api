const jwtGenerator = require('../util/jwtGenerator');
require('dotenv').config();
const {
  validateEmail,
  validateDisplayName,
  verifyEmailExistingEmail,
  validatePassword,
} = require('../services/validateUser');

function verifyBodyRequisition(req, res, next) {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  next();
}

async function validateBodyEntrance(req, res, next) {
  const { email, displayName, password } = req.body;

  const isEmailValid = validateEmail(email);
  if (isEmailValid.message) {
    return res.status(400).json({ message: isEmailValid.message });
  } 

  const isDisplayNameValid = validateDisplayName(displayName);
  
  if (isDisplayNameValid.message) {
     return res.status(400).json({ message: isDisplayNameValid.message });
  }

  const isThereAnExactEmail = await verifyEmailExistingEmail(email);
  if (isThereAnExactEmail.message) {
    return res.status(409).json({ message: isThereAnExactEmail.message });
  }

  const isValidPassword = await validatePassword(password);
  if (isValidPassword.message) {
    return res.status(400).json({ message: isValidPassword.message });
  }

  next();
}

function insertAuthorizationToken(req, _res, next) {
  const { email, displayName } = req.body;

  const user = { email, displayName };

  req.body.token = jwtGenerator(user);

  next();
}

module.exports = {
  verifyBodyRequisition,
  validateBodyEntrance,
  insertAuthorizationToken,
};
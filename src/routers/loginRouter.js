const router = require('express').Router();
const {
  verifyBodyRequisition,
  verifyEmail,
  verifyPassword,
  validateBodyEntrance,
  validateUserExistence,
  insertAuthorizationToken,
} = require('../middlewares/validateUser');
const createUser = require('../controllers/createUser');

router.get(
  '/',
  verifyBodyRequisition,
  verifyEmail,
  verifyPassword,
  validateBodyEntrance,
  validateUserExistence,
  insertAuthorizationToken,
  createUser,
);

module.exports = router;
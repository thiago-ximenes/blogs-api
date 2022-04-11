const router = require('express').Router();
const {
  verifyBodyRequisition,
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  insertAuthorizationToken,
  verifyEmailExistence,
} = require('../middlewares/validateUser');
const createUser = require('../controllers/createUser');

router.post(
  '/',
  verifyBodyRequisition,
  verifyDisplayName,
  verifyEmailExistence,
  verifyEmail,
  verifyPassword,
  insertAuthorizationToken,
  createUser,
);

module.exports = router;
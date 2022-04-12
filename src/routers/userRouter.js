const router = require('express').Router();
const {
  verifyBodyRequisition,
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  insertAuthorizationToken,
  verifyEmailExistence,
  verifyToken,
  validateToken,
} = require('../middlewares/validateUser');
const createUser = require('../controllers/createUser');
const getUser = require('../controllers/getUser');

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

router.get(
  '/',
  verifyToken,
  validateToken,
  getUser,
  );

module.exports = router;
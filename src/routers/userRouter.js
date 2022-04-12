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
  validateUserId,
} = require('../middlewares/validateUser');
const createUser = require('../controllers/createUser');
const getUser = require('../controllers/getUser');
const getUserById = require('../controllers/getUserById');

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

  router.get(
    '/:id',
    verifyToken,
    validateToken,
    validateUserId,
    getUserById,
  );

module.exports = router;
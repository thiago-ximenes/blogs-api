const router = require('express').Router();
const {
  verifyBodyRequisition,
  verifyEmail,
  verifyPassword,
  validateBodyEntrance,
  insertAuthorizationToken,
} = require('../middlewares/validateUser');
const createUser = require('../controllers/createUser');

router.post(
  '/',
  verifyBodyRequisition,
  validateBodyEntrance,
  verifyPassword,
  verifyEmail,
  insertAuthorizationToken,
  createUser,
);

module.exports = router;
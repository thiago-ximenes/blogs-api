const router = require('express').Router();
const {
  verifyBodyRequisition,
  verifyEmail,
  verifyPassword,
  insertAuthorizationToken,
  validateFieldsExistence,
} = require('../middlewares/validateUser');
const loginController = require('../controllers/loginController');

router.post(
  '/',
  verifyBodyRequisition,
  verifyEmail,
  verifyPassword,
  validateFieldsExistence,
  insertAuthorizationToken,
  loginController,
);

module.exports = router;
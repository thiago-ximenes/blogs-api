const router = require('express').Router();
const {
  verifyBodyRequisition,
  validateBodyEntrance,
  insertAuthorizationToken,
} = require('../middlewares/validateUser');
const createUser = require('../controllers/createUser');

router.post(
  '/',
  verifyBodyRequisition,
  validateBodyEntrance,
  insertAuthorizationToken,
  createUser,
);

module.exports = router;
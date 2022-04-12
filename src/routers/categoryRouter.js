const router = require('express').Router();

const categoryController = require('../controllers/categoryController');
const categoryMiddleware = require('../middlewares/categoryMiddleware');
const validationMiddleware = require('../middlewares/validateUser');

router.post(
  '/',
  validationMiddleware.verifyToken,
  validationMiddleware.validateToken,
  categoryMiddleware.verifyName,
  categoryController.create,
);

router.get(
  '/',
  validationMiddleware.verifyToken,
  validationMiddleware.validateToken,
  categoryController.getCategories,
);

module.exports = router;
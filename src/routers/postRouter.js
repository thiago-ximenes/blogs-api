const router = require('express').Router();

const postController = require('../controllers/postController');
const blogPostMiddleware = require('../middlewares/blogPostMiddleware');
const validationMiddleware = require('../middlewares/validateUser');

router.post(
  '/',
  validationMiddleware.verifyToken,
  validationMiddleware.validateToken,
  blogPostMiddleware.validateContent,
  blogPostMiddleware.validateTitle,
  blogPostMiddleware.validateCategoryIds,
  blogPostMiddleware.verifyCategoryIds,
  postController.createPost,
);

module.exports = router;
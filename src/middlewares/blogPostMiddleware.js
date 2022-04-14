const blogPostService = require('../services/blogPostService');

function validateTitle(req, res, next) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: '"title" is required',
    });
  }

  next();
}

function validateContent(req, res, next) {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      message: '"content" is required',
    });
  }

  next();
}

function validateCategoryIds(req, res, next) {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return res.status(400).json({
      message: '"categoryIds" is required',
    });
  }

  next();
}

async function verifyCategoryIds(req, res, next) {
  const { categoryIds } = req.body;

  const isThereCategoryIds = await blogPostService
    .verifyCategoryIds(categoryIds);

  console.log('middleware', isThereCategoryIds);

  if (!isThereCategoryIds) {
    return res.status(400).json({
      message: '"categoryIds" not found',
    });
  }

  next();
}

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryIds,
  verifyCategoryIds,
};
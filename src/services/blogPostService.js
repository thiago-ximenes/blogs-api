const { BlogPost, Category } = require('../models');

async function createPost(postInfo) {
  return BlogPost.create(postInfo);
}

async function verifyCategoryIds(categoryIds) {
  const allCategories = await Category.findAll();
  const allCategoryIds = allCategories.map((category) => category.id);
  return categoryIds.every((categoryId) => allCategoryIds.includes(categoryId));
}

module.exports = {
  createPost,
  verifyCategoryIds,
};

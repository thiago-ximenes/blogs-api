const { Category } = require('../models');

async function create(name) {
  return Category.create({
    name,
  });
}

async function getCategories() {
  return Category.findAll();
}

module.exports = {
  create,
  getCategories,
};

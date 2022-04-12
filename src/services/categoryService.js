const { Category } = require('../models');

async function create(name) {
  return Category.create({
    name,
  });
}

module.exports = {
  create,
};
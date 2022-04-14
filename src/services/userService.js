const { User } = require('../models');

async function getUserInfoByEmail(email) {
  return User.findOne({
      where: {
        email,
      },
    });
}

module.exports = {
  getUserInfoByEmail,
};
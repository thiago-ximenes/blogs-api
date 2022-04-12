require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

function jwtGenerator(userInfo) {
  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  return jwt.sign({ data: userInfo }, jwtSecret, jwtConfig);
}

function jwtVerify(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  jwtGenerator,
  jwtVerify,
};

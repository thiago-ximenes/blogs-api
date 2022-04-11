const jwt = require('jsonwebtoken');

function jwtGenerator(userInfo) {
const jwtSecret = process.env.JWT_SECRET;

  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  return jwt.sign({ data: userInfo }, jwtSecret, jwtConfig);
}

module.exports = jwtGenerator;

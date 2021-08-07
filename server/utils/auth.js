const jwt = require('jsonwebtoken');

const secret = 'top_secret';
const expiration = '2h';

module.exports = {
  signToken: function ({ userName, _id }) {
    const payload = { userName, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

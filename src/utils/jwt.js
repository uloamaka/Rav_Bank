const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '2h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, secret);
};

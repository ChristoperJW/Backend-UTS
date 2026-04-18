const jwt = require('jsonwebtoken');
const config = require('../core/config');

function generateToken(payload) {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: '1d' });
}

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret);

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {
  generateToken,
  verifyToken,
};

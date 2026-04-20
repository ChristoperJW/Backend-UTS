/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../core/config');

function generateToken(payload) {

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign(payload, jwtSecret);
}

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Harap mengisi token terlebih dahulu' });
    }

    const token = authHeader.split(' ')[1];
    // Gunakan jwtSecret dari config
    const decoded = jwt.verify(token, jwtSecret);

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
module.exports = {
  generateToken,
  verifyToken,
};

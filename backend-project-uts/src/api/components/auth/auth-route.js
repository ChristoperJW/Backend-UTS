const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const authController = require('./auth-controller');

module.exports = () => {
  const router = express.Router();

  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.get('/me', authenticationMiddleware, authController.me);

  return router;
};

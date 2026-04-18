const express = require('express');
const controller = require('./auth-controller');
const { verifyToken } = require('../../../utils/jwt');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/register', controller.register);
  route.post('/login', controller.login);
  route.get('/me', verifyToken, controller.me);
};

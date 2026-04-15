const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const messageController = require('./message-controller');

module.exports = () => {
  const router = express.Router();

  router.post('/', authenticationMiddleware, messageController.createMessage);

  return router;
};

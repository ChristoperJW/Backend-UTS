const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const feedController = require('./feed-controller');

module.exports = () => {
  const router = express.Router();

  router.get('/', authenticationMiddleware, feedController.getFeed);

  return router;
};

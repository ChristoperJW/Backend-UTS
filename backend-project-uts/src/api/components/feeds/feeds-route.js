const express = require('express');

const feedsController = require('./feeds-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/feeds', route);

  route.get('/', feedsController.getAllFeeds);
};

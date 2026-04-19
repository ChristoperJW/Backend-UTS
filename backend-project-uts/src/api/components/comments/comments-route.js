const express = require('express');

const commentsController = require('./comments-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/comments', route);

  route.get('/', commentsController.getAllComments);
  route.delete('/:id', commentsController.deleteCommentsById);
};

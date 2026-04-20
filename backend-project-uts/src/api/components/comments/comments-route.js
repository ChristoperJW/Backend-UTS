const express = require('express');
const { verifyToken } = require('../../../utils/jwt');

const commentsController = require('./comments-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/comments', route);

  route.get('/', commentsController.getAllComments);
  route.delete('/:id', verifyToken, commentsController.deleteCommentsById);
};

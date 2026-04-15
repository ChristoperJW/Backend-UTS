const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const commentController = require('./comment-controller');

module.exports = () => {
  const router = express.Router();

  router.delete('/:id', authenticationMiddleware, commentController.deleteComment);

  return router;
};

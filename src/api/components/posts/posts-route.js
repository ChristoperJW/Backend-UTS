const express = require('express');

const postsController = require('./posts-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/posts', route);

  route.post('/', postsController.createPost);
  route.get('/', postsController.getAllPost);
  route.get('/:id/comments', postsController.getCommentsByPostId);
  route.post('/:id/comments', postsController.postCommentByPostId);
};

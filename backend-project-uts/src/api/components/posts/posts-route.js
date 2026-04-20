/* eslint-disable prettier/prettier */
const express = require('express');

const postsController = require('./posts-controller');

const { verifyToken } = require('../../../utils/jwt');

const route = express.Router();

module.exports = (app) => {
  app.use('/posts', route);

  route.get('/', postsController.getPosts);

  route.get('/:id', postsController.getPost);

  // User Wajib Login
  route.post('/', verifyToken, postsController.createPost);

  route.delete('/:id', verifyToken, postsController.deletePost);

  route.post('/:id/like', verifyToken, postsController.likePost);

  route.delete('/:id/like', verifyToken, postsController.unlikePost);

  route.get('/:id/comments', verifyToken, postsController.getCommentsByPostId);

  route.post('/:id/comments', verifyToken, postsController.postCommentByPostId);
};

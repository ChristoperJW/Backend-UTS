const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const postController = require('./post-controller');

module.exports = () => {
  const router = express.Router();

  router.get('/', postController.getPosts);
  router.get('/:id', postController.getPostById);
  router.post('/', authenticationMiddleware, postController.createPost);
  router.delete('/:id', authenticationMiddleware, postController.deletePost);
  router.post('/:id/like', authenticationMiddleware, postController.likePost);
  router.delete('/:id/like', authenticationMiddleware, postController.unlikePost);
  router.get('/:id/comments', postController.getComments);
  router.post('/:id/comments', authenticationMiddleware, postController.createComment);

  return router;
};

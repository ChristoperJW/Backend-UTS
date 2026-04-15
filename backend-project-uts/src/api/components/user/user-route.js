const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const userController = require('./user-controller');

module.exports = () => {
  const router = express.Router();

  router.get('/', userController.searchUsers);
  router.get('/:id', userController.getUserProfile);
  router.put('/:id', authenticationMiddleware, userController.updateUserProfile);
  router.post(
    '/:id/follow',
    authenticationMiddleware,
    userController.followUser
  );
  router.post(
    '/:id/unfollow',
    authenticationMiddleware,
    userController.unfollowUser
  );
  router.get('/:id/followers', userController.getFollowers);
  router.get('/:id/following', userController.getFollowing);

  return router;
};

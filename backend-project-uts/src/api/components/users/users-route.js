/* eslint-disable prettier/prettier */
const express = require('express');
const usersController = require('./users-controller');
const { verifyToken } = require('../../../utils/jwt');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  route.get('/', usersController.getUsers);

  route.get('/:id', usersController.getUser);

  route.put('/:id', verifyToken, usersController.updateUser);

  route.put(
    '/:id/change-password',
    verifyToken,
    usersController.changePassword
  );

  route.post('/:id/follow', verifyToken, usersController.followUser);

  route.post('/:id/unfollow', verifyToken, usersController.unfollowUser);

  route.get('/:id/followers', usersController.getFollowers);

  route.get('/:id/following', usersController.getFollowing);
};

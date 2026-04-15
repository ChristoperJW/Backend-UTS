const userService = require('./user-service');

const asyncHandler = (handler) => async (request, response, next) => {
  try {
    await handler(request, response, next);
  } catch (error) {
    next(error);
  }
};

const getUserProfile = asyncHandler(async (request, response) => {
  const result = await userService.getUserProfile(request.params.id);

  response.status(200).json(result);
});

const updateUserProfile = asyncHandler(async (request, response) => {
  const { _id: currentUserId } = request.user;
  const result = await userService.updateUserProfile({
    currentUserId: currentUserId.toString(),
    targetUserId: request.params.id,
    fullName: request.body.fullName,
    bio: request.body.bio,
    avatar: request.body.avatar,
  });

  response.status(200).json(result);
});

const searchUsers = asyncHandler(async (request, response) => {
  const result = await userService.searchUsers(request.query.search);

  response.status(200).json(result);
});

const followUser = asyncHandler(async (request, response) => {
  const { _id: currentUserId } = request.user;
  const result = await userService.followUser({
    currentUserId: currentUserId.toString(),
    targetUserId: request.params.id,
  });

  response.status(200).json(result);
});

const unfollowUser = asyncHandler(async (request, response) => {
  const { _id: currentUserId } = request.user;
  const result = await userService.unfollowUser({
    currentUserId: currentUserId.toString(),
    targetUserId: request.params.id,
  });

  response.status(200).json(result);
});

const getFollowers = asyncHandler(async (request, response) => {
  const result = await userService.getFollowers(request.params.id);

  response.status(200).json(result);
});

const getFollowing = asyncHandler(async (request, response) => {
  const result = await userService.getFollowing(request.params.id);

  response.status(200).json(result);
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  searchUsers,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};

const { errorResponder, errorTypes } = require('../../../core/errors');
const { toPublicUser } = require('../../../utils/transformers');
const { validateObjectId, requireString } = require('../../../utils/validators');
const userRepository = require('./user-repository');

const getRequiredAuthenticatedUserId = (currentUserId) => {
  if (!currentUserId) {
    throw errorResponder(
      errorTypes.NO_ANONYMOUS_ACCESS,
      'Authentication required. Provide a valid Bearer token'
    );
  }

  validateObjectId(currentUserId, 'Authenticated user id');

  return currentUserId;
};

const ensureUserExists = async (userId, label) => {
  const user = await userRepository.getUserById(userId);

  if (!user) {
    throw errorResponder(errorTypes.NOT_FOUND, `${label} not found`);
  }

  return user;
};

const getUserProfile = async (userId) => {
  validateObjectId(userId, 'User id');

  const user = await ensureUserExists(userId, 'User');

  return {
    message: 'User fetched successfully',
    data: toPublicUser(user),
  };
};

const updateUserProfile = async ({ currentUserId, targetUserId, fullName, bio, avatar }) => {
  const authenticatedUserId = getRequiredAuthenticatedUserId(currentUserId);

  validateObjectId(targetUserId, 'Target user id');

  if (authenticatedUserId !== targetUserId) {
    throw errorResponder(
      errorTypes.FORBIDDEN,
      'You can only update your own profile'
    );
  }

  await ensureUserExists(targetUserId, 'User');

  const payload = {};

  if (fullName !== undefined) {
    payload.fullName = requireString(fullName, 'fullName');
  }

  if (bio !== undefined) {
    payload.bio = typeof bio === 'string' ? bio.trim() : '';
  }

  if (avatar !== undefined) {
    payload.avatar = typeof avatar === 'string' ? avatar.trim() : '';
  }

  if (Object.keys(payload).length === 0) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'No profile fields to update');
  }

  const updatedUser = await userRepository.updateUserById(targetUserId, payload);

  return {
    message: 'Profile updated successfully',
    data: toPublicUser(updatedUser),
  };
};

const searchUsers = async (search) => {
  const users = await userRepository.searchUsers(search ? search.trim() : '');

  return {
    message: 'Users fetched successfully',
    data: users.map(toPublicUser),
  };
};

const followUser = async ({ currentUserId, targetUserId }) => {
  const authenticatedUserId = getRequiredAuthenticatedUserId(currentUserId);

  validateObjectId(targetUserId, 'Target user id');

  if (authenticatedUserId === targetUserId) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'You cannot follow your own account'
    );
  }

  await ensureUserExists(authenticatedUserId, 'Authenticated user');
  await ensureUserExists(targetUserId, 'Target user');

  const alreadyFollowing = await userRepository.isFollowing({
    currentUserId: authenticatedUserId,
    targetUserId,
  });

  if (alreadyFollowing) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'You are already following this user'
    );
  }

  await userRepository.followUser({
    currentUserId: authenticatedUserId,
    targetUserId,
  });

  const [updatedCurrentUser, updatedTargetUser] = await Promise.all([
    userRepository.getUserById(authenticatedUserId),
    userRepository.getUserById(targetUserId),
  ]);

  return {
    message: 'Successfully followed user',
    data: {
      userId: targetUserId,
      followerCount: updatedTargetUser.followers.length,
      followingCount: updatedCurrentUser.following.length,
    },
  };
};

const unfollowUser = async ({ currentUserId, targetUserId }) => {
  const authenticatedUserId = getRequiredAuthenticatedUserId(currentUserId);

  validateObjectId(targetUserId, 'Target user id');

  if (authenticatedUserId === targetUserId) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'You cannot unfollow your own account'
    );
  }

  await ensureUserExists(authenticatedUserId, 'Authenticated user');
  await ensureUserExists(targetUserId, 'Target user');

  const alreadyFollowing = await userRepository.isFollowing({
    currentUserId: authenticatedUserId,
    targetUserId,
  });

  if (!alreadyFollowing) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'You are not following this user'
    );
  }

  await userRepository.unfollowUser({
    currentUserId: authenticatedUserId,
    targetUserId,
  });

  const [updatedCurrentUser, updatedTargetUser] = await Promise.all([
    userRepository.getUserById(authenticatedUserId),
    userRepository.getUserById(targetUserId),
  ]);

  return {
    message: 'Successfully unfollowed user',
    data: {
      userId: targetUserId,
      followerCount: updatedTargetUser.followers.length,
      followingCount: updatedCurrentUser.following.length,
    },
  };
};

const getFollowers = async (targetUserId) => {
  validateObjectId(targetUserId, 'Target user id');
  await ensureUserExists(targetUserId, 'User');

  const followers = await userRepository.getFollowers(targetUserId);

  return {
    message: 'Followers fetched successfully',
    data: followers,
  };
};

const getFollowing = async (targetUserId) => {
  validateObjectId(targetUserId, 'Target user id');
  await ensureUserExists(targetUserId, 'User');

  const following = await userRepository.getFollowing(targetUserId);

  return {
    message: 'Following fetched successfully',
    data: following,
  };
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  searchUsers,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};

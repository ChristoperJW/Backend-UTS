const db = require('../../../models');

const { User } = db;

const userProjection =
  'email fullName bio avatar followers following createdAt updatedAt';
const userListProjection = 'email fullName bio avatar';

const createUser = async (payload) => User.create(payload);

const getUserByEmail = async (email) => User.findOne({ email }).lean();

const getUserById = async (userId) =>
  User.findById(userId).select(userProjection).lean();

const updateUserById = async (userId, payload) =>
  User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  })
    .select(userProjection)
    .lean();

const searchUsers = async (search) => {
  const filter = search
    ? {
        fullName: {
          $regex: search,
          $options: 'i',
        },
      }
    : {};

  return User.find(filter).select(userProjection).sort({ createdAt: -1 }).lean();
};

const isFollowing = async ({ currentUserId, targetUserId }) => {
  const user = await User.findOne({
    _id: currentUserId,
    following: targetUserId,
  })
    .select('_id')
    .lean();

  return Boolean(user);
};

const followUser = async ({ currentUserId, targetUserId }) =>
  Promise.all([
    User.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: targetUserId },
    }),
    User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: currentUserId },
    }),
  ]);

const unfollowUser = async ({ currentUserId, targetUserId }) =>
  Promise.all([
    User.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetUserId },
    }),
    User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUserId },
    }),
  ]);

const getFollowers = async (userId) => {
  const user = await User.findById(userId)
    .populate({
      path: 'followers',
      select: userListProjection,
    })
    .select('followers')
    .lean();

  return user.followers;
};

const getFollowing = async (userId) => {
  const user = await User.findById(userId)
    .populate({
      path: 'following',
      select: userListProjection,
    })
    .select('following')
    .lean();

  return user.following;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
  searchUsers,
  isFollowing,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};

const db = require('../../../models');

const { Post, Comment } = db;

const postPopulate = {
  path: 'userId',
  select: 'email fullName bio avatar followers following createdAt updatedAt',
};

const commentPopulate = {
  path: 'userId',
  select: 'email fullName bio avatar followers following createdAt updatedAt',
};

const buildPostFilter = ({ userId, search, authorIds }) => {
  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  if (search) {
    filter.caption = {
      $regex: search,
      $options: 'i',
    };
  }

  if (authorIds) {
    filter.userId = { $in: authorIds };
  }

  return filter;
};

const getPosts = async ({ userId, search, authorIds }) =>
  Post.find(buildPostFilter({ userId, search, authorIds }))
    .populate(postPopulate)
    .sort({ createdAt: -1 })
    .lean();

const getPostById = async (postId) =>
  Post.findById(postId).populate(postPopulate).lean();

const createPost = async (payload) => Post.create(payload);

const deletePostById = async (postId) => Post.findByIdAndDelete(postId).lean();

const likePost = async (postId, userId) =>
  Post.findByIdAndUpdate(
    postId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .populate(postPopulate)
    .lean();

const unlikePost = async (postId, userId) =>
  Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true })
    .populate(postPopulate)
    .lean();

const getCommentsByPostId = async (postId) =>
  Comment.find({ postId }).populate(commentPopulate).sort({ createdAt: 1 }).lean();

const createComment = async (payload) => Comment.create(payload);

module.exports = {
  getPosts,
  getPostById,
  createPost,
  deletePostById,
  likePost,
  unlikePost,
  getCommentsByPostId,
  createComment,
};

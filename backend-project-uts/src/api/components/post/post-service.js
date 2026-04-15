const db = require('../../../models');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { toPostResponse, toCommentResponse } = require('../../../utils/transformers');
const {
  validateObjectId,
  requireString,
} = require('../../../utils/validators');
const postRepository = require('./post-repository');

const { User } = db;

const ensurePostExists = async (postId) => {
  const post = await postRepository.getPostById(postId);

  if (!post) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Post not found');
  }

  return post;
};

const ensureUserExists = async (userId) => {
  const user = await User.findById(userId).lean();

  if (!user) {
    throw errorResponder(errorTypes.NOT_FOUND, 'User not found');
  }

  return user;
};

const getPosts = async ({ userId, search }) => {
  if (userId) {
    validateObjectId(userId, 'userId');
  }

  const posts = await postRepository.getPosts({
    userId,
    search: search ? search.trim() : '',
  });

  return {
    message: 'Posts fetched successfully',
    data: posts.map(toPostResponse),
  };
};

const getPostById = async (postId) => {
  validateObjectId(postId, 'Post id');

  const post = await ensurePostExists(postId);

  return {
    message: 'Post fetched successfully',
    data: toPostResponse(post),
  };
};

const createPost = async ({ currentUserId, caption, mediaUrl, mediaType }) => {
  await ensureUserExists(currentUserId);

  const post = await postRepository.createPost({
    userId: currentUserId,
    caption: typeof caption === 'string' ? caption.trim() : '',
    mediaUrl: typeof mediaUrl === 'string' ? mediaUrl.trim() : '',
    mediaType: typeof mediaType === 'string' ? mediaType.trim() : '',
  });

  const createdPost = await postRepository.getPostById(post._id.toString());

  return {
    message: 'Post created successfully',
    data: toPostResponse(createdPost),
  };
};

const deletePost = async ({ postId, currentUserId }) => {
  validateObjectId(postId, 'Post id');

  const post = await ensurePostExists(postId);

  if (post.userId._id.toString() !== currentUserId) {
    throw errorResponder(
      errorTypes.FORBIDDEN,
      'You can only delete your own post'
    );
  }

  await postRepository.deletePostById(postId);

  return {
    message: 'Post deleted successfully',
  };
};

const likePost = async ({ postId, currentUserId }) => {
  validateObjectId(postId, 'Post id');

  await ensurePostExists(postId);

  const updatedPost = await postRepository.likePost(postId, currentUserId);

  return {
    message: 'Post liked successfully',
    data: toPostResponse(updatedPost),
  };
};

const unlikePost = async ({ postId, currentUserId }) => {
  validateObjectId(postId, 'Post id');

  await ensurePostExists(postId);

  const updatedPost = await postRepository.unlikePost(postId, currentUserId);

  return {
    message: 'Post unliked successfully',
    data: toPostResponse(updatedPost),
  };
};

const getComments = async (postId) => {
  validateObjectId(postId, 'Post id');

  await ensurePostExists(postId);

  const comments = await postRepository.getCommentsByPostId(postId);

  return {
    message: 'Comments fetched successfully',
    data: comments.map(toCommentResponse),
  };
};

const createComment = async ({ postId, currentUserId, content }) => {
  validateObjectId(postId, 'Post id');
  requireString(content, 'content');

  await ensurePostExists(postId);
  await ensureUserExists(currentUserId);

  const comment = await postRepository.createComment({
    postId,
    userId: currentUserId,
    content: content.trim(),
  });

  const comments = await postRepository.getCommentsByPostId(postId);
  const createdComment = comments.find(
    (item) => item._id.toString() === comment._id.toString()
  );

  return {
    message: 'Comment created successfully',
    data: toCommentResponse(createdComment),
  };
};

const getFeed = async (currentUserId) => {
  const user = await ensureUserExists(currentUserId);
  const authorIds = [currentUserId, ...(user.following || []).map((id) => id.toString())];

  const posts = await postRepository.getPosts({ authorIds });

  return {
    message: 'Feed fetched successfully',
    data: posts.map(toPostResponse),
  };
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  getComments,
  createComment,
  getFeed,
};

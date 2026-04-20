const postsRepository = require('./posts-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getPosts(userId, search) {
  return postsRepository.getPosts(userId, search);
}

async function getPost(postId) {
  return postsRepository.getPost(postId);
}

async function createPost(caption, media, userId) {
  return postsRepository.createPost(caption, media, userId);
}

async function deletePost(postId, userId) {
  const post = await postsRepository.getPost(postId);

  if (!post) return null;

  // eslint-disable-next-line no-underscore-dangle
  if (post.userId._id.toString() !== userId.toString()) {
    throw errorResponder(errorTypes.FORBIDDEN, 'Not your post');
  }

  const result = await postsRepository.deletePost(postId);

  return result.deletedCount > 0;
}

async function likePost(userId, postId) {
  return postsRepository.likePost(userId, postId);
}

async function unlikePost(userId, postId) {
  return postsRepository.unlikePost(userId, postId);
}

async function postCommentByPostId({ postId, comment }) {
  return postRepository.createComment({ postId, comment });
}

async function getCommentsByPostId(postId) {
  return postRepository.getCommentsByPostId(postId);
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  postCommentByPostId,
  getCommentsByPostId,
};

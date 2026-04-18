const postRepository = require('./posts-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getPosts(userId, search) {
  return postRepository.getPosts(userId, search);
}

async function getPost(postId) {
  return postRepository.getPost(postId);
}

async function createPost(caption, media, userId) {
  return postRepository.createPost(caption, media, userId);
}

async function deletePost(postId, userId) {
  const post = await postRepository.getPost(postId);

  if (!post) return null;

  // eslint-disable-next-line no-underscore-dangle
  if (post.userId._id.toString() !== userId.toString()) {
    throw errorResponder(errorTypes.FORBIDDEN, 'Not your post');
  }

  const result = await postRepository.deletePost(postId);

  return result.deletedCount > 0;
}

async function likePost(userId, postId) {
  return postRepository.likePost(userId, postId);
}

async function unlikePost(userId, postId) {
  return postRepository.unlikePost(userId, postId);
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
};

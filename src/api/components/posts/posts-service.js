const postsRepository = require('./posts-repository');

async function createPost({ username, post, caption }) {
  const newPost = await postsRepository.createPost({
    username,
    post,
    caption,
  });
  return newPost;
}

async function getAllPost() {
  return postsRepository.getAllPost({});
}

async function postCommentByPostId({ postId, comment }) {
  return postsRepository.createComment({ postId, comment });
}

async function getCommentsByPostId(postId) {
  return postsRepository.getCommentsByPostId(postId);
}

module.exports = {
  createPost,
  getAllPost,
  postCommentByPostId,
  getCommentsByPostId,
};

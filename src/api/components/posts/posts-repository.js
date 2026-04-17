const { Posts, Comments } = require('../../../models');

async function createPost({ username, post, caption }) {
  const newPost = await Posts.create({ username, post, caption });
  return newPost;
}

async function getAllPost() {
  return Posts.find({});
}

async function createComment({ postId, comment }) {
  const post = await Posts.findById(postId); // simpan dulu ke variable
  if (!post) {
    throw new Error('Post tidak ditemukan!');
  }

  return Comments.create({ postId, comment });
}

async function getCommentsByPostId(postId) {
  return Comments.find({ postId });
}

module.exports = {
  createPost,
  getAllPost,
  createComment,
  getCommentsByPostId,
};

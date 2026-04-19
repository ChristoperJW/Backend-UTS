const { Posts, Likes, Comments } = require('../../../models');

async function getPosts(userId, search) {
  const filter = {};

  if (userId) filter.userId = userId;

  if (search) {
    filter.caption = { $regex: search, $options: 'i' };
  }

  return Posts.find(filter).populate('userId', 'fullName email');
}

async function getPost(postId) {
  return Posts.findById(postId).populate('userId', 'fullName email');
}

async function createPost(caption, media, userId) {
  return Posts.create({ caption, media, userId });
}

async function deletePost(postId) {
  return Posts.deleteOne({ _id: postId });
}

async function likePost(userId, postId) {
  const post = await Posts.findById(postId);

  if (!post) return null;

  return Likes.create({ userId, postId });
}

async function unlikePost(userId, postId) {
  return Likes.deleteOne({ userId, postId });
}

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
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  createPost,
  getAllPost,
  createComment,
  getCommentsByPostId,
};

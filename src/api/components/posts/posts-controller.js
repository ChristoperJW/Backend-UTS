const postsService = require('./posts-service');

async function createPost(request, response, next) {
  try {
    const { username, post, caption } = request.body;

    if (!username || !post || !caption) {
      throw new Error('Semua field harus diisi!');
    }

    const newPost = await postsService.createPost({ username, post, caption });

    return response.status(200).json(newPost);
  } catch (error) {
    return next(error);
  }
}

async function getAllPost(request, response, next) {
  try {
    const posts = await postsService.getAllPost();
    return response.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
}

async function postCommentByPostId(request, response, next) {
  try {
    const { id } = request.params;
    const { comment } = request.body;

    if (!comment) {
      throw new Error('Comment tidak boleh kosong!');
    }

    const newComment = await postsService.postCommentByPostId({
      postId: id,
      comment,
    });

    return response.status(200).json(newComment);
  } catch (error) {
    return next(error);
  }
}

async function getCommentsByPostId(request, response, next) {
  try {
    const { id } = request.params;

    const comments = await postsService.getCommentsByPostId(id);
    return response.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createPost,
  getAllPost,
  postCommentByPostId,
  getCommentsByPostId,
};

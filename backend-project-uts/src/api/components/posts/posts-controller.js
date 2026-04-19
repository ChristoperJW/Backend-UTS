const postsService = require('./posts-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getPosts(request, response, next) {
  try {
    const { userId, search } = request.query;

    const posts = await postsService.getPosts(userId, search);

    return response.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
}

async function getPost(request, response, next) {
  try {
    const post = await postsService.getPost(request.params.id);

    if (!post) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Post not found');
    }

    return response.status(200).json(post);
  } catch (error) {
    return next(error);
  }
}

async function createPost(request, response, next) {
  try {
    const { caption, media } = request.body;

    if (!caption) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Caption is required');
    }

    const userId = request.user.id;

    const post = await postsService.createPost(caption, media, userId);

    if (!post) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create post'
      );
    }

    return response.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deletePost(request, response, next) {
  try {
    const userId = request.user.id;
    const postId = request.params.id;

    const result = await postsService.deletePost(postId, userId);

    if (!result) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Post not found');
    }

    return response.status(200).json({
      message: 'Post deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
}

async function likePost(request, response, next) {
  try {
    const userId = request.user.id;
    const postId = request.params.id;

    await postsService.likePost(userId, postId);

    return response.status(200).json({ message: 'Liked' });
  } catch (error) {
    return next(error);
  }
}

async function unlikePost(request, response, next) {
  try {
    const userId = request.user.id;
    const postId = request.params.id;

    await postsService.unlikePost(userId, postId);

    return response.status(200).json({ message: 'Unliked' });
  } catch (error) {
    return next(error);
  }
}

async function postCommentByPostId(request, response, next) {
  try {
    const { comment } = request.body;
    const postId = request.params.id;

    if (!comment) {
      throw new Error('Comment tidak boleh kosong!');
    }

    const newComment = await postsService.postCommentByPostId({
      postId,
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
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  postCommentByPostId,
  getCommentsByPostId,
};

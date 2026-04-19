const postService = require('./posts-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getPosts(request, response, next) {
  try {
    const { userId, search } = request.query;

    const posts = await postService.getPosts(userId, search);

    return response.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
}

async function getPost(request, response, next) {
  try {
    const post = await postService.getPost(request.params.id);

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

    const post = await postService.createPost(caption, media, userId);

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

    const result = await postService.deletePost(postId, userId);

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

    await postService.likePost(userId, postId);

    return response.status(200).json({ message: 'Liked' });
  } catch (error) {
    return next(error);
  }
}

async function unlikePost(request, response, next) {
  try {
    const userId = request.user.id;
    const postId = request.params.id;

    await postService.unlikePost(userId, postId);

    return response.status(200).json({ message: 'Unliked' });
  } catch (error) {
    return next(error);
  }
}

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
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  createPost,
  getAllPost,
  postCommentByPostId,
  getCommentsByPostId,
};

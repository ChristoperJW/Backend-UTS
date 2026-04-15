const asyncHandler = require('../../../utils/async-handler');
const { requireAuthenticatedUser } = require('../../../utils/validators');
const postService = require('./post-service');

const getPosts = asyncHandler(async (request, response) => {
  const result = await postService.getPosts({
    userId: request.query.userId,
    search: request.query.search,
  });

  response.status(200).json(result);
});

const getPostById = asyncHandler(async (request, response) => {
  const result = await postService.getPostById(request.params.id);

  response.status(200).json(result);
});

const createPost = asyncHandler(async (request, response) => {
  const result = await postService.createPost({
    currentUserId: requireAuthenticatedUser(request),
    caption: request.body.caption,
    mediaUrl: request.body.mediaUrl,
    mediaType: request.body.mediaType,
  });

  response.status(201).json(result);
});

const deletePost = asyncHandler(async (request, response) => {
  const result = await postService.deletePost({
    postId: request.params.id,
    currentUserId: requireAuthenticatedUser(request),
  });

  response.status(200).json(result);
});

const likePost = asyncHandler(async (request, response) => {
  const result = await postService.likePost({
    postId: request.params.id,
    currentUserId: requireAuthenticatedUser(request),
  });

  response.status(200).json(result);
});

const unlikePost = asyncHandler(async (request, response) => {
  const result = await postService.unlikePost({
    postId: request.params.id,
    currentUserId: requireAuthenticatedUser(request),
  });

  response.status(200).json(result);
});

const getComments = asyncHandler(async (request, response) => {
  const result = await postService.getComments(request.params.id);

  response.status(200).json(result);
});

const createComment = asyncHandler(async (request, response) => {
  const result = await postService.createComment({
    postId: request.params.id,
    currentUserId: requireAuthenticatedUser(request),
    content: request.body.content,
  });

  response.status(201).json(result);
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  getComments,
  createComment,
};

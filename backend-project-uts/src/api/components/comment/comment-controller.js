const asyncHandler = require('../../../utils/async-handler');
const { requireAuthenticatedUser } = require('../../../utils/validators');
const commentService = require('./comment-service');

const deleteComment = asyncHandler(async (request, response) => {
  const result = await commentService.deleteComment({
    commentId: request.params.id,
    currentUserId: requireAuthenticatedUser(request),
  });

  response.status(200).json(result);
});

module.exports = {
  deleteComment,
};

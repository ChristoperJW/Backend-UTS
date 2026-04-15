const { errorResponder, errorTypes } = require('../../../core/errors');
const { validateObjectId } = require('../../../utils/validators');
const commentRepository = require('./comment-repository');

const deleteComment = async ({ commentId, currentUserId }) => {
  validateObjectId(commentId, 'Comment id');

  const comment = await commentRepository.getCommentById(commentId);

  if (!comment) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Comment not found');
  }

  if (comment.userId._id.toString() !== currentUserId) {
    throw errorResponder(
      errorTypes.FORBIDDEN,
      'You can only delete your own comment'
    );
  }

  await commentRepository.deleteCommentById(commentId);

  return {
    message: 'Comment deleted successfully',
  };
};

module.exports = {
  deleteComment,
};

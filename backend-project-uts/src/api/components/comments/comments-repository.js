const { Comments } = require('../../../models');

async function getAllComments() {
  const comments = await Comments.find({}).populate('postId');

  return comments.map((comment) => ({
    // eslint-disable-next-line no-underscore-dangle
    commentsId: comment._id,
    postId: comment.postId,
    comment: comment.comment,
  }));
}

async function deleteCommentsById(id) {
  return Comments.findByIdAndDelete(id);
}

module.exports = {
  getAllComments,
  deleteCommentsById,
};

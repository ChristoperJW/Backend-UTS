const db = require('../../../models');

const { Comment } = db;

const getCommentById = async (commentId) =>
  Comment.findById(commentId)
    .populate({
      path: 'userId',
      select: 'email fullName bio avatar followers following createdAt updatedAt',
    })
    .lean();

const deleteCommentById = async (commentId) => Comment.findByIdAndDelete(commentId).lean();

module.exports = {
  getCommentById,
  deleteCommentById,
};

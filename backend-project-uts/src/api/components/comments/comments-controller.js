const commentsService = require('./comments-service');

async function getAllComments(request, response, next) {
  try {
    const comments = await commentsService.getAllComments();
    return response.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
}

async function deleteCommentsById(request, response, next) {
  try {
    const { id } = request.params;

    const deleted = await commentsService.deleteCommentsById(id);
    if (!deleted) {
      throw new Error('Comment tidak ditemukan!');
    }

    return response.status(200).json({ message: 'Comment berhasil dihapus!' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllComments,
  deleteCommentsById,
};

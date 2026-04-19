const commentsRepository = require('./comments-repository');

async function getAllComments() {
  return commentsRepository.getAllComments();
}

async function deleteCommentsById(id) {
  return commentsRepository.deleteCommentsById(id);
}

module.exports = {
  getAllComments,
  deleteCommentsById,
};

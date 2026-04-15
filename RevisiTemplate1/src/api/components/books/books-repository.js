const { Books } = require('../../../models');

async function getBooks() {
  return Books.find({});
}

async function create(title) {
  return Books.create({ title });
}

async function getBook(id) {
  return Books.findById(id);
}

async function getBookByTitle(title) {
  return Books.findOne({ title });
}

module.exports = {
  getBooks,
  create,
  getBook,
  getBookByTitle,
};

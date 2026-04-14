const booksRepository = require('./books-repository');

async function getBooks() {
  return booksRepository.getBooks();
}

async function create(title) {
  return booksRepository.create(title);
}

async function getBook(id) {
  return booksRepository.getBook(id);
}

async function checkBookExists(title) {
  const book = await booksRepository.getBookByTitle(title);
  return !!book; // Return true if book exists, false otherwise
}

module.exports = {
  getBooks,
  create,
  getBook,
  checkBookExists,
};

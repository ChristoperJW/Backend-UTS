const booksService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooks(request, response, next) {
  try {
    const books = await booksService.getBooks();

    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function createBook(request, response, next) {
  try {
    const { title } = request.body;

    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    if (await booksService.checkBookExists(title)) {
      throw errorResponder(
        errorTypes.BOOK_ALREADY_EXISTS,
        'Book with this title already exists'
      );
    }
    const book = await booksService.create(title);

    return response
      .status(200)
      .json(`Book with the title of ${book.title} created successfully`);
  } catch (error) {
    return next(error);
  }
}

async function getBook(request, response, next) {
  try {
    const book = await booksService.getBook(request.params.id);

    // Check if book exists
    if (!book) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Book not found');
    }

    return response.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooks,
  createBook,
  getBook,
};

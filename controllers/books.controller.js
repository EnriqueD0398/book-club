const createError = require('http-errors')

const Book = require('../models/Book.model');
const genresArr = require('../constants/genres');

module.exports.getBooks = (req, res, next) => {
  const { genres, maxPages, minPages } = req.query;

  const query = {}

  if (genres) {
    query.genres = genres
  }

  if (minPages) {
    query.pages = { $gte: minPages }
  }

  if (maxPages) {
    query.pages = { $lte: maxPages }
  }

  Book.find(query)
    .then(books => {
      res.render('books/list', { books, genres: genresArr })
    })
    .catch(err => next(err))
}

module.exports.getBook = (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) {
        next(createError(404, 'Libro no encontrado'))
      }
      res.render('books/detail', { book })
    })
    .catch(err => next(err))
}
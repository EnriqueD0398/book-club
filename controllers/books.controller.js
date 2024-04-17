const createError = require('http-errors')

const Book = require('../models/Book.model');
const genresArr = require('../constants/genres');
const Author = require('../models/Author.model');

module.exports.getBooks = (req, res, next) => {
  const { genres, maxPages, minPages, author } = req.query;

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

  if (author) {
    query.author = author
  }

  Book.find(query)
    .populate('author')
    .then(books => {
      if (author) {
        return Author.findById(author)
          .then(authorDB => {
            if (authorDB) {
              res.render('books/list', { books, genres: genresArr, author: authorDB.name })
            } else {
              res.render('books/list', { books, genres: genresArr })
            }
          })
      } else {
        res.render('books/list', { books, genres: genresArr })
      }
    })
    .catch(err => next(err))
}

module.exports.getBook = (req, res, next) => {
  Book.findById(req.params.id)
    .populate('author')
    .then(book => {
      if (!book) {
        next(createError(404, 'Libro no encontrado'))
      }
      res.render('books/detail', { book })
    })
    .catch(err => next(err))
}
const mongoose = require('mongoose');

const { REQUIRED_FIELD_ERROR } = require('../constants/errorMessages');

const genres = require('../constants/genres');
const Author = require('./Author.model');

const bookSchema = (
  {
    title: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR]
    },
    description: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR]
    },
    pages: {
      type: Number,
      required: [true, REQUIRED_FIELD_ERROR]
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Author.modelName,
      required: [true, REQUIRED_FIELD_ERROR]
    },
    publicationYear: {
      type: Number,
      required: [true, REQUIRED_FIELD_ERROR]
    },
    genres: {
      type: [String],
      required: [true, REQUIRED_FIELD_ERROR],
      enum: genres
    }
    // img
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
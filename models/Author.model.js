const mongoose = require('mongoose');

const { REQUIRED_FIELD_ERROR } = require('../constants/errorMessages');

const authorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR]
    }
  }
)

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
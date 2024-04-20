const mongoose = require('mongoose');
const User = require('./User.model');
const Book = require('./Book.model');

const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    book: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: Book.modelName,
      required: true
    }
  }
)

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
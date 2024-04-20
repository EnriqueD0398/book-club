const Like = require('../models/Like.model')

module.exports.doLike = (req, res, next) => {
  // Query con el modelo Like
  // Tratar de encontrar un like ya existente entre usuario y libro
  Like.findOne({ user: req.currentUser._id, book: req.params.id })
    .then((like) => {
      if (like) {
        // Tendré que borrar el like
        return Like.findByIdAndDelete(like._id)
          .then(res.redirect(`/books/${req.params.id}`))
      } else {
        return Like.create({ user: req.currentUser._id, book: req.params.id })
          .then(res.redirect(`/books/${req.params.id}`))
      }
    })
    .catch(err => next(err))
}
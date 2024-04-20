const mongoose = require('mongoose');
const User = require('../models/User.model');
const Like = require('../models/Like.model');

// Devuelve la página de registro
module.exports.register = (req, res, next) => {
  res.render('register');
}

// Recibo un post con los campos del usuario y lo guardo en base de datos
module.exports.doRegister = (req, res, next) => {
  const renderWithErrors = (errors, values) => {
    res.render('register', { errors, values })
  }

  User.create({...req.body, avatar: req.file.path })
    .then(() => {
      res.redirect('/login');
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors, req.body)
      } else {
        next(err)
      }
    })
}

// Perfil del usuario en sesión
module.exports.getCurrentUserProfile = (req, res, next) => {
  console.log(req.currentUser)
  // Quiero traer los libros que me gustan
  Like.find({ user: req.currentUser._id })
    .populate('book')
    .then(likes => {
      res.render('profile', { books: likes.map(like => like.book) });
    }) 
    .catch(err => next(next))

}
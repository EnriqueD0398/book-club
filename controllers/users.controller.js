const mongoose = require('mongoose');
const User = require('../models/User.model');

// Devuelve la página de registro
module.exports.register = (req, res, next) => {
  res.render('register');
}

// Recibo un post con los campos del usuario y lo guardo en base de datos
module.exports.doRegister = (req, res, next) => {
  const renderWithErrors = (errors, values) => {
    res.render('register', { errors, values })
  }

  User.create(req.body)
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
require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const routes = require('./config/routes.config');
const hbs = require('hbs')

const path = require('path')

require('./config/db.config');

// Instanciamos express
const app = express();

// Midlewares
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "/views/partials"));

// Routes
app.use(routes);

app.listen(3000, () => {
  console.log('App running at port 3000')
});
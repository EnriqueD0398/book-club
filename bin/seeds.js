const mongoose = require('mongoose')

const Book = require('../models/Book.model');
const Author = require('../models/Author.model');

const authorsWithBooksJSON = require('../data/authorsBooks.json')

// Me conecto a la base de datos
require('../config/db.config');

// Lanzamos las tareas una vez se haya realizado la conexión
mongoose.connection.once('open', () => {
  // Limpiamos base de datos
  const dropPromises = [
    mongoose.connection.dropCollection('authors'),
    mongoose.connection.dropCollection('books')
  ];

  Promise.all(dropPromises)
    .then(() => {
      console.log('Database cleared');
      
      // Crear los autores

      const authors = authorsWithBooksJSON.map(author => { 
        return { name: author.name }
      })

      return Author.create(authors)
    })
    .then(newAuthors => {
      newAuthors.forEach((author) => {
        console.log(`${author.name} has been created`);
      });

      console.log(`${newAuthors.length} authors have been created`);

      let booksToCreate = []

      authorsWithBooksJSON.forEach(author => {
        const authorFoundDB = newAuthors.find(authorDB => authorDB.name === author.name);

        const books = author.books.map(book => {
          return {
            ...book,
            author: authorFoundDB._id
          }
        })

        booksToCreate = [...booksToCreate, ...books];
      })
      return Book.create(booksToCreate)
    })
    .then(newBooks => {
      newBooks.forEach((book) => {
        console.log(`${book.title} has been created`);
      });

      console.log(`${newBooks.length} books have been created`);
    })
    .catch(err => console.error(err))
    .finally(() => {
      mongoose.connection.close()
        .then(() => console.log('Connection closed'))
        .catch(err => console.log('Error disconnectiong:', err))
        .finally(() => process.exit(0))
    })
})
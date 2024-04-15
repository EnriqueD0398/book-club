const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const MONGODB_NAME = 'book-club';

mongoose
  .connect(`${MONGODB_URI}/${MONGODB_NAME}`)
    .then(() => console.log(`Connected to DB: ${MONGODB_NAME}`))
    .catch((err) => console.error('Database error:', err))
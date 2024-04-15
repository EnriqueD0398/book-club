const router = require('express').Router();

const usersController = require('../controllers/users.controller');

router.get('/', (req, res, next) => res.render('home'))

router.get('/register', usersController.register);
router.post('/register', usersController.doRegister);

module.exports = router;
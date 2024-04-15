const router = require('express').Router();

const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

router.get('/', (req, res, next) => res.render('home'))

router.get('/register', usersController.register);
router.post('/register', usersController.doRegister);

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/profile', usersController.getCurrentUserProfile);

module.exports = router;
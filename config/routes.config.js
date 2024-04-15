const router = require('express').Router();

const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', (req, res, next) => res.render('home'))

router.get('/register', authMiddleware.isNotAuthenticated, usersController.register);
router.post('/register', authMiddleware.isNotAuthenticated, usersController.doRegister);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get('/profile', authMiddleware.isAuthenticated, usersController.getCurrentUserProfile);

router.get('/logout', authMiddleware.isAuthenticated, authController.logout);

module.exports = router;
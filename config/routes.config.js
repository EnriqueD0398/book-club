const router = require('express').Router();

router.get('/', (req, res, next) => res.send('hola'))

module.exports = router;
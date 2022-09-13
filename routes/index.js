/* eslint-disable no-undef */
const router = require('express').Router();
const userRouter = require('./users');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const movieRouter = require('./movies');
const { validateLogin, validateCreateUser } = require('../middlewares/validator');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;

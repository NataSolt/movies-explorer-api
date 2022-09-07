const router = require('express').Router();
const userRouter = require('./users');
// const { login, createUser } = require('../controllers/users');
// const auth = require('../middlewares/auth');

// router.use(auth);
router.use('/users', userRouter);

module.exports = router;

const router = require('express').Router();

const {
  getUser, patchUser,
} = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validator');

router.get('/me', getUser);
router.patch('/me', validateUpdateUser, patchUser);

module.exports = router;

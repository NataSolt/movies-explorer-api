const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/badrequest');
const NotFound = require('../errors/notfound');
const Conflict = require('../errors/conflict');
const { CREATED } = require('../utils/statusError');
const {
  USER_NOT_FOUND,
  USER_CONFLICT_ERROR,
  USER_INVALID_DATA,
  USER_INVALID_UPDATEDATA,
  VALIDATION_ERROR,
} = require('../utils/messageError');
const { JWT_PRODUCTION_KEY } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

// данные текущего юзера
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch(next);
};

// ссоздаем юзера
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((data) => {
      res.status(CREATED).send({
        name: data.name,
        email: data.email,
      });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(USER_INVALID_DATA));
        return;
      }

      if (err.code === 11000) {
        next(new Conflict(USER_CONFLICT_ERROR));
        return;
      }

      next(err);
    });
};

// изменить данные
module.exports.patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(USER_INVALID_UPDATEDATA));
        return;
      }

      if (err.code === 11000) {
        next(new Conflict(USER_CONFLICT_ERROR));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_PRODUCTION_KEY, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

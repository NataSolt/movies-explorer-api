require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/badrequest');
// const NotFound = require('../errors/notfound');
const Conflict = require('../errors/conflict');
const { CREATED } = require('../utils/statusError');

const { NODE_ENV, JWT_SECRET } = process.env;

// данные текущего юзера
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
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
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
        return;
      }

      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
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
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret', {
        expiresIn: '7d',
      });
      res.status(200).send({ token });
    })
    .catch(next);
};

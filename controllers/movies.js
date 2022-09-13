const Card = require('../models/movie');
const BadRequest = require('../errors/badrequest');
const Forbidden = require('../errors/forbidden');
const NotFound = require('../errors/notfound');
const { CREATED } = require('../utils/statusError');

// получаем фильмы
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Card.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

// сохраняем фильм
module.exports.saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movies) => res.status(CREATED).send(movies))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
        return;
      }
      next(error);
    });
};

// удаляем карточки по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Card.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Карточка с указанным _id не найдена');
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new Forbidden('Нельзя удалить эту карточку');
      }
      return Card.remove(movie);
    })
    .then(() => res.status(200).send({ message: 'Карточка успешно удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Невалидный id'));
        return;
      }
      next(err);
    });
};

const Card = require('../models/movie');
const BadRequest = require('../errors/badrequest');
const Forbidden = require('../errors/forbidden');
const NotFound = require('../errors/notfound');
const { CREATED } = require('../utils/statusError');
const {
  MOVIE_NOT_FOUND,
  MOVIE_INVALID_DATA,
  MOVIE_FORBIDDEN_DELETE,
  UNAUTHORIZED,
  VALIDATION_ERROR,
  CAST_ERROR,
  SUCCESS,
} = require('../utils/messageError');

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
      if (error.name === VALIDATION_ERROR) {
        next(new BadRequest(MOVIE_INVALID_DATA));
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
        throw new NotFound(MOVIE_NOT_FOUND);
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new Forbidden(MOVIE_FORBIDDEN_DELETE);
      }
      return Card.remove(movie);
    })
    .then(() => res.send({ message: SUCCESS }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequest(UNAUTHORIZED));
        return;
      }
      next(err);
    });
};

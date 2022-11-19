const router = require('express').Router();

const {
  getMovies, saveMovie, deleteMovie,
} = require('../controllers/movies');
const { validateSaveMovie, validateMovieId } = require('../middlewares/validator');

router.get('/', getMovies);
router.post('/', validateSaveMovie, saveMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;

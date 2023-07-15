const router = require('express').Router();
const {
  getMovies,
  addNewMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateDeleteMovie, validateAddMovie } = require('../middlewares/dataValidation');

router.get('/', getMovies);
router.post('/', validateAddMovie, addNewMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;

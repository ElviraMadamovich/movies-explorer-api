const router = require('express').Router();
const {
  getMovies,
<<<<<<< Updated upstream
  addMovie,
  deleteMovie,
} = require('../controllers/cards');
const { validateDeleteMovie, validateAddMovie } = require('../middlewares/dataValidation');

router.get('/', getMovies);
router.post('/', validateAddMovie, addMovie);
=======
  addNewMovie,
  deleteMovie
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validateCreateMovie, addNewMovie);
>>>>>>> Stashed changes
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;

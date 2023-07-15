const routes = require('express').Router();
const { errors } = require('celebrate');

const users = require('./users');
<<<<<<< Updated upstream
const cards = require('./movies');
=======
const movies = require('./movies');
>>>>>>> Stashed changes
const auth = require('../middlewares/auth');
const {
  authorize,
  register,
} = require('../controllers/users');
const {
  validateAuthorization,
  validateRegistration,
} = require('../middlewares/dataValidation');
const NotFoundError = require('../utils/errors/NotFoundError');

routes.post('/signin', validateAuthorization, authorize);
routes.post('/signup', validateRegistration, register);

routes.use('/users', auth, users);
routes.use('/movies', auth, movies);

routes.use('*', (req, res, next) => {
  const err = new NotFoundError('Страница не найдена');
  next(err);
});

routes.use(errors());

module.exports = routes;

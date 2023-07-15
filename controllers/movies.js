const mongoose = require('mongoose');
const movieSample = require('../models/movie');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const { HTTP_STATUS_CREATED } = require('../utils/constants');

const getMovies = (req, res, next) => {
  movieSample
    .find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const addNewMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  movieSample
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    })
    .then((movie) => {
      res.status(HTTP_STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  movieSample
    .findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      movieModel
        .deleteOne({ _id: movie._id, owner: req.user._id })
        .then((result) => {
          if (result.deletedCount === 0) {
            next(new ForbiddenError('Невозможно удалить этот фильм'));
          } else {
            res.send({ message: 'Фильм успешно удалён' });
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Фильм не найден'));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  addNewMovie,
  deleteMovie,
};

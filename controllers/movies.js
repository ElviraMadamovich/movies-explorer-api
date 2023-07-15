const mongoose = require('mongoose');
const movieSample = require('../models/movie');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const { HTTP_STATUS_CREATED } = require('../utils/constants');

const getMovies = (req, res, next) => {
<<<<<<< Updated upstream
  MovieSample
    .find({})
=======
  movieSample
    .find({ owner: req.user._id })
>>>>>>> Stashed changes
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

<<<<<<< Updated upstream
const addMovie = (req, res, next) => {
=======
const addNewMovie = (req, res, next) => {
  const owner = req.user._id;
>>>>>>> Stashed changes
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
<<<<<<< Updated upstream
    thumbnail,
    movieId,
    nameRU,
    nameEN,
=======
    nameRU,
    nameEN,
    thumbnail,
    movieId,
>>>>>>> Stashed changes
  } = req.body;

  movieSample
    .create({
<<<<<<< Updated upstream
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        owner: req.user._id,
        movieId,
        nameRU,
        nameEN,
     })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
=======
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
>>>>>>> Stashed changes
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
<<<<<<< Updated upstream
  cardSample
=======
  movieSample
>>>>>>> Stashed changes
    .findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      movieSample
        .deleteOne({ _id: movie._id, owner: req.user._id })
<<<<<<< Updated upstream
        .then((result) => {
          if (result.deletedCount === 0) {
            next(new ForbiddenError('Невозможно удалить чужую карту'));
          } else {
            res.send({ message: 'Карточка удалена' });
=======

        .then((result) => {
          if (result.deletedCount === 0) {
            next(new ForbiddenError('Невозможно удалить этот фильм'));
          } else {
            res.send({ message: 'Фильм успешно удалён' });
>>>>>>> Stashed changes
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
<<<<<<< Updated upstream
        return next(new NotFoundError('Карточка не найдена'));
=======
        return next(new NotFoundError('Фильм не найден'));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Данные некорректны'));
>>>>>>> Stashed changes
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
<<<<<<< Updated upstream
  addMovie,
=======
  addNewMovie,
>>>>>>> Stashed changes
  deleteMovie,
};

<<<<<<< Updated upstream
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateRegistration = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
=======
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const urlValidationHandler = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.message("Некорректный формат ссылки");
};

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
>>>>>>> Stashed changes
    password: Joi.string().required(),
  }),
});

<<<<<<< Updated upstream
const validateAuthorization = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
=======
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
>>>>>>> Stashed changes
    password: Joi.string().required(),
  }),
});

<<<<<<< Updated upstream
const validateAddMovie = () => celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный адрес');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный адрес');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный адрес');
    }),
    movieId: Joi.number().integer().required(),
=======
const validateChangeUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidationHandler),
    trailerLink: Joi.string().required().custom(urlValidationHandler),
    thumbnail: Joi.string().required().custom(urlValidationHandler),
    movieId: Joi.number().required(),
>>>>>>> Stashed changes
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

<<<<<<< Updated upstream
const validateDeleteMovie = () => celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

const validateUserInfo = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const validateEmail = (email) => {
  if (validator.isEmail(email)) {
    throw new BadRequestError('Некорректный адрес');
  }
  return true;
};

module.exports = {
  validateRegistration,
  validateAuthorization,
  validateAddMovie,
  validateDeleteMovie,
  validateUserInfo,
  validateEmail,
};
=======
const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateChangeUser,
  validateCreateMovie,
  validateDeleteMovie,
};
>>>>>>> Stashed changes

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlValidationHandler = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.message('Некорректный формат ссылки');
};

const validateAuthorization = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateAddMovie = celebrate({
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
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateRegistration,
  validateAuthorization,
  validateUserInfo,
  validateAddMovie,
  validateDeleteMovie,
};

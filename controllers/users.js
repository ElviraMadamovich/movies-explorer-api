/* eslint-disable no-shadow */
const { NODE_ENV, JWT_SECRET } = process.env;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
<<<<<<< Updated upstream
const { SECRET_KEY } = require('../utils/constants');
const userSample = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
=======
const userSample = require('../models/user');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');
const BadRequestError = require('../utils/errors/BadRequestError');

const register = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    userSample
      .create({ name, email, password: hash })
      .then(({ name, email, password }) => {
        res.status(201).send({ name, email, password });
      })
      .catch((err) => {
        if (err.name === 'MongoServerError' || err.code === 11000) {
          return next(new ConflictError('Пользователь уже зарегистрирован'));
        }
        if (err instanceof mongoose.Error.ValidationError) {
          return next(new BadRequestError('Данные некорректны'));
        }
        return next(err);
      })
  );
};
>>>>>>> Stashed changes

const authorize = (req, res, next) => {
  const { email, password } = req.body;

  return userSample
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
<<<<<<< Updated upstream
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
        {
          expiresIn: '7d',
        },
      );
      res.send({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        }
      });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        return next(new UnauthorizedError('Неправильные данные авторизации'));
=======
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        {
          expiresIn: '7d',
        }
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        return next(new UnauthorizedError('Неправильная почта или пароль'));
>>>>>>> Stashed changes
      }
      return next(err);
    });
};

<<<<<<< Updated upstream
const getCurrentUser = (req, res, next) => {
  let userId;
  if (req.params.userId) userId = req.params.userId;
  else userId = req.user._id;
  userSample
    .findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
=======
const getUserbyId = (req, res, next) => {
  userSample
    .findById(req.user._id)
    .orFail()
>>>>>>> Stashed changes
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь не найден'));
      }
<<<<<<< Updated upstream
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Данные некорректны'));
      }
=======
>>>>>>> Stashed changes
      return next(err);
    });
};

<<<<<<< Updated upstream
const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => userSample.create({
      ...req.body, password: hash,
    }))
    .then(({
      _id,
      name,
      email,
    }) => {
      res.send(
        {
          data: {
            _id,
            name,
            email,
          },
        },
      );
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' || err.code === 11000) {
        return next(new ConflictError('Пользователь уже зарегистрирован'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Данные некорректны'));
=======
const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  userSample
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      }
    )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Данные некорректны'));
      } else if (err.name === 'MongoServerError' || err.code === 11000) {
        return next(new ConflictError('Пользователь уже зарегистрирован'));
>>>>>>> Stashed changes
      }
      return next(err);
    });
};

<<<<<<< Updated upstream
const updateDetails = (req, res, next) => {
  const { name, email } = req.body;
  userSample
  .findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь уже зарегистрирован'));
      }
      return next(new InternalServerError('Ошибка сервера'));
    });
};

module.exports = {
  authorize,
  getCurrentUser,
  register,
  updateDetails,
=======
module.exports = {
  authorize,
  register,
  getUserbyId,
  updateUserInfo,
>>>>>>> Stashed changes
};

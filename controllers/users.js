/* eslint-disable no-shadow */
const { NODE_ENV, JWT_SECRET } = process.env;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSample = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { HTTP_STATUS_CREATED } = require('../utils/constants');

const register = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => userSample
    .create({
      name,
      email,
      password: hash,
    })
    .then(({
      name,
      email,
      password,
    }) => {
      res.status(HTTP_STATUS_CREATED).send({
        name,
        email,
        password
      });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' || err.code === 11000) {
        return next(new ConflictError('Пользователь уже зарегистрирован'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(err);
    }));
};

const authorize = (req, res, next) => {
  const { email, password } = req.body;

  return userSample
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        return next(new UnauthorizedError('Неправильная почта или пароль'));
      }
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  usersModel
    .findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  usersModel
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      }
    )
    .orFail(() => {
      throw new NotFound("Пользователь с указанным _id не найден");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequest("Переданы некорректные данные"));
      } else if (err.code === 11000) {
        return next(new Conflict("Такой пользаватель уже существует"));
      }
      return next(err);
    });
};

module.exports = {
  updateUserInfo,
  authorize,
  register,
  getUserById,
};
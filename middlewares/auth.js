const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пользователь не авторизовался'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "secret-key"
    );
  } catch (err) {
    next(new Auth("Необходима авторизация"));
  }

  req.user = payload;

  return next();
};

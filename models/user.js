const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { validateEmail } = require('../middlewares/dataValidation');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
<<<<<<< Updated upstream
      minlength: 2,
      maxlength: 30,
      required: true,
=======
      required: true,
      minlength: 2,
      maxlength: 30,
>>>>>>> Stashed changes
    },
    email: {
      type: String,
      required: true,
      unique: true,
<<<<<<< Updated upstream
      validator: validateEmail,
=======
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Введите корректный email',
      },
>>>>>>> Stashed changes
    },
    password: {
      type: String,
      required: true,
      select: false,
<<<<<<< Updated upstream
=======
      required: true,
>>>>>>> Stashed changes
    },
  }, { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);

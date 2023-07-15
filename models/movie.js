const mongoose = require('mongoose');
<<<<<<< Updated upstream

const { Schema } = mongoose;

const movieSchema = new Schema(
=======
const validator = require('validator');

const movieSchema = new mongoose.Schema(
>>>>>>> Stashed changes
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
<<<<<<< Updated upstream
=======
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введите URL',
      },
>>>>>>> Stashed changes
    },
    trailerLink: {
      type: String,
      required: true,
<<<<<<< Updated upstream
=======
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введите URL',
      },
>>>>>>> Stashed changes
    },
    thumbnail: {
      type: String,
      required: true,
<<<<<<< Updated upstream
    },
    owner: {
      type: mongoose.Types.ObjectId,
=======
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введите URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
>>>>>>> Stashed changes
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
<<<<<<< Updated upstream
  }, { versionKey: false }
=======
  },
  { versionKey: false }
>>>>>>> Stashed changes
);

module.exports = mongoose.model('movie', movieSchema);

const mongoose = require('mongoose');
const { regexpUrl } = require('../utils/regexpUrl');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator(v) {
        return regexpUrl.test(v);
      },
      message: 'Введен некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(v) {
        return regexpUrl.test(v);
      },
      message: 'Введен некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

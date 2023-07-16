const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.create({ ...req.body, owner: _id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const error = new BadRequestError(
          'Переданы некорректные данные при создании фильма',
        );
        next(error);
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;

  Movie.findById(_id)
    .then((movieFound) => {
      if (!movieFound) {
        const err = new NotFoundError('Передан некорректный _id фильма');
        next(err);
        return;
      }
      const ownerId = movieFound.owner.toString();
      if (userId === ownerId) {
        movieFound
          .deleteOne()
          .then((movie) => res.send(movie))
          .catch((err) => next(err));
      } else {
        const err = new ForbiddenError(
          'Нельзя удалить фильм другого пользователя',
        );
        next(err);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        const error = new NotFoundError(
          'Переданы некорректные данные при удалении фильма',
        );
        next(error);
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};

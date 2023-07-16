require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictEmailError = require('../errors/conflict-email-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const checkUser = (user, res) => {
  if (user) {
    return res.send(user).status(200);
  }
  throw new NotFoundError('Пользователь не найден');
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => checkUser(user, res))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser).status(201);
    })
    .catch((err) => {
      if (err.code === 11000) {
        const error = new ConflictEmailError(
          'Пользователь с таким email уже существует',
        );
        next(error);
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        const error = new BadRequestError(
          'Переданы некорректные данные при создании пользователя',
        );
        next(error);
        return;
      }
      next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => checkUser(user, res))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const error = new BadRequestError(
          'Переданы некорректные данные при обновлении профиля',
        );
        next(error);
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => { // eslint-disable-line consistent-return
      if (!user) {
        return Promise.reject(
          new UnauthorizedError('Переданы неправильные email или пароль'),
        );
      }
      bcrypt // return
        .compare(password, user.password)
        .then((matched) => { // eslint-disable-line consistent-return
          if (!matched) {
            return Promise.reject(
              new UnauthorizedError('Переданы неправильные email или пароль'),
            );
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.send({ token }); // return
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUserProfile,
  login,
};

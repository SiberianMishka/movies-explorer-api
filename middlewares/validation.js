const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/constants');

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Некорректный "email"',
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть заполнено',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Некорректный "email"',
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
});

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    email: Joi.string().required().email().messages({
      'string.email': 'Некорректный "email"',
      'any.required': 'Поле "email" должно быть заполнено',
    }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).messages({
      'string.hex': 'Некорректный "_id" фильма',
    }),
  }),
});

const validateMovieForm = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': 'Поле "country" должно быть заполнено',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Поле "director" должно быть заполнено',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле "duration" должно быть заполнено',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Поле "year" должно быть заполнено',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Поле "description" должно быть заполнено',
    }),
    image: Joi.string().required().pattern(urlRegExp).messages({
      'string.dataUri': 'Невалидный URL',
      'any.required': 'Поле "image" должно быть заполнено',
    }),
    trailerLink: Joi.string().required().pattern(urlRegExp).messages({
      'string.dataUri': 'Невалидный URL',
      'any.required': 'Поле "trailerLink" должно быть заполнено',
    }),
    thumbnail: Joi.string().required().pattern(urlRegExp).messages({
      'string.dataUri': 'Невалидный URL',
      'any.required': 'Поле "thumbnail" должно быть заполнено',
    }),
    movieId: Joi.number().required().messages({
      'any.required': 'Поле "movieId" должно быть заполнено',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Поле "nameRU" должно быть заполнено',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Поле "nameEN" должно быть заполнено',
    }),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUserProfile,
  validateMovieId,
  validateMovieForm,
};

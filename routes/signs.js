const signsRouter = require('express').Router();
const { validateSignUp, validateSignIn } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

signsRouter.post('/signup', validateSignUp, createUser); // создаёт пользователя с переданными в теле данными
signsRouter.post('/signin', validateSignIn, login); // возвращает JWT, если в теле запроса переданы правильные почта и пароль

module.exports = signsRouter;

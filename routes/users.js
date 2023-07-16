const usersRouter = require('express').Router();
const { getCurrentUser, updateUserProfile } = require('../controllers/users');
const { validateUserProfile } = require('../middlewares/validation');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUserProfile, updateUserProfile);

module.exports = usersRouter;

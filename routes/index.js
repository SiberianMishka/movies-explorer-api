const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signsRouter = require('./signs');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.use(signsRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  const err = new NotFoundError('Страница не найдена');
  next(err);
});

module.exports = router;

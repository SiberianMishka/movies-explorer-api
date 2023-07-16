const moviesRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const {
  validateMovieId,
  validateMovieForm,
} = require('../middlewares/validation');

moviesRouter.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы
moviesRouter.post('/', validateMovieForm, createMovie); // создаёт фильм с переданными в теле country, director, duration, year, description, image, trailerLink, nameRU, nameEN и thumbnail, movieId
moviesRouter.delete('/:_id', validateMovieId, deleteMovie); // удаляет сохранённый фильм по _id

module.exports = moviesRouter;

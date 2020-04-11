const MovieSchema = require('../models/Movie.js');
const { movies, getMovies, getMoviesById, rate, dummy_test } = require('../controllers/movies.js');
const passport = require('passport');
module.exports.controller = (app) => {
// add a new movie
app.post('/movies', movies);
app.get('/movies', getMovies);
app.get('/dummy_test', dummy_test);
app.get('/api/movies/:id', getMoviesById);
app.post('/movies/rate/:id', rate);
};
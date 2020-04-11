const MovieSchema = require('../models/Movie.js');
const Rating = require('../models/Rating.js');


function dummy_test (req, res) {
	res.send({
name: 'John'
})
}

function movies (req, res) {
	const newMovie = new MovieSchema({
		name: req.body.name,
		description: req.body.description,
		release_year: req.body.release_year,
		genre: req.body.genre,
	});
	newMovie.save((error, movie) => {
		if (error) { console.log(error); }
		res.send({movie: movie});
	});
}

// fetch a all movies
function getMovies (req, res, next) {
	MovieSchema.find({}, 'name description release_year genre', (error,
		movies) => {
		if (error) { console.log(error); }
		res.send({
			movies,
		});
	});
}

// fetch a single movie
function getMoviesById (req, res) {
	MovieSchema.findById(req.params.id, 'name description release_year genre', (error,
		movie) => {
		if (error) { console.log(error); }
		res.send({
			movie: movie,
			current_user: req.user,
		});
	});
}

// rate a movie
function rate (req, res) {
	const rating = new Rating({
		movie_id: req.params.id,
		user_id: req.body.user_id,
		rate: req.body.rate,
	})
	rating.save(function (error, rating) {
		if (error) { console.log(error); }
		res.send({
			movie_id: rating.movie_id,
			user_id: rating.user_id,
			rate: rating.rate
		})
	})
}

module.exports = { movies, getMovies, getMoviesById, rate, dummy_test };
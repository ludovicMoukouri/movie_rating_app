var Movie = require("./../../../../models/Movie.js");
let chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('models.Movie', function(){
	it('exists', function(){
		expect(Movie).to.exist
	})

	describe('Movie', function() {
		it('should be invalid if release_year is not an integer',
			function(done){
				var movie = new Movie({
					name: 'test',
					description: 'test',
					release_year: 'test',
					genre: 'test'
				});
				movie.validate(function(err){
					expect(err.errors.release_year).to.exist;
					done();
				})
			})
	})
	
})

const controller_movies = require("./../../../../controllers/movies.js");
var Movie = require("./../../../../models/Movie.js");
let chaiHttp = require('chai-http');
let chai = require('chai');
let sinon = require('sinon');
var expect = chai.expect;
var should = chai.should();
var express = require("express");
let server = require('./../../../../server.js');
var app = express();
chai.use(chaiHttp);


describe('Movie', () => {
    beforeEach((done) => { //Before each test we empty the database
    	Movie.remove({}, (err) => { 
    		done();           
    	}); 
    });       

    describe('controllers.movies.js', function(){
    	it('exists', function(){
    		expect(controller_movies).to.exist
    	})

    	describe('/GET movies', () => {
    		it('it should send all movies', (done) => {
    			var movie1 = {
    				name: 'test1',
    				description: 'test1',
    				release_year: 2017,
    				genre: 'test1'
    			};
    			var movie2 = {
    				name: 'test2',
    				description: 'test2',
    				release_year: 2018,
    				genre: 'test2'
    			};
    			var expectedMovies = [movie1, movie2];
    			sinon.mock(Movie)
    			.expects('find')
    			.yields('', expectedMovies);
    			chai.request(server)
    			.get('/movies')
    			.end((err, res) => {
    				res.should.have.status(200);
    				res.body.should.be.an('object');
    				expect(res.body).to.eql({
    					movies: expectedMovies
    				});
    				done();
    			});
    		});
    	});

    	describe('POST /movies', () => {
    		it('should respond with the movie that was added', (done) => {
    			let movie = {
    				name: 'test2',
    				description: 'test1',
    				release_year: 2018,
    				genre: 'test1'
    			}
    			chai.request(server)
    			.post('/movies')
    			.send(movie)
    			.end((err, res) => {
    				should.not.exist(err);
    				res.status.should.equal(200);
    				res.body.should.be.an('object');
    				res.body.movie.should.have.property('name');
    				res.body.movie.should.have.property('description');
    				res.body.movie.should.have.property('release_year');
    				res.body.movie.should.have.property('genre');
				// res.body.should.include.keys(
				// 	'_id', 'name', 'description', 'release_year', 'genre'
				// 	);
				done().movie;
			});
    		});
    	});

    	describe('/GET/:id movie', () => {
    		it('it should get a movie given an id', (done) => {
    			let movie = new Movie({ name: "The Lord of the Rings", description: "Ludovic moukouri Test", release_year: 1954, genre: 'Mangas' });
    			movie.save((err, movie) => {
    				chai.request(server)
    				.get('/api/movies/' + movie._id)
    				.end((err, res) => {
    					res.should.have.status(200);
    					res.body.should.be.a('object');
    					res.body.movie.should.have.property('name');
    					res.body.movie.should.have.property('description');
    					res.body.movie.should.have.property('release_year');
    					res.body.movie.should.have.property('genre');
    					res.body.movie.should.have.property('_id').eql(movie.id);
    					done();
    				});
    			});
    		});
    	});

  //   	describe('/PUT/:id book', () => {
  //   		it('it should UPDATE a book given the id', (done) => {
  //   			let movie = new Movie({name: "The Chronicles of Narnia", description: "C.S. Lewis", release_year: 1948, genre: 'Mangas'})
  //   			movie.save((err, book) => {
  //   				chai.request(server)
  //   				.put('/movies/' + movie.id)
  //   				.send({name: "The Chronicles of Narnia", description: "C.S. Lewis", release_year: 1948, genre: 'Mangas'})
  //   				.end((err, res) => {
  //   					res.should.have.status(200);
  //   					res.body.should.be.a('object');
  //   					res.body.should.have.property('message').eql('Book updated!');
  //   					res.body.movie.should.have.property('year').eql(1950);
  //   					done();
  //   				});
  //   			});
  //   		});
  //   	});
  //   });

  //    describe('/DELETE/:id book', () => {
  //     it('it should DELETE a book given the id', (done) => {
  //         let movie = new Movie({name: "The Chronicles of Narnia", description: "C.S. Lewis", release_year: 1948, genre: 'Mangas'})
  //         movie.save((err, book) => {
  //               chai.request(server)
  //               .delete('/movies/' + movie.id)
  //               .end((err, res) => {
  //                     res.should.have.status(200);
  //                     res.body.should.be.a('object');
  //                     res.body.should.have.property('message').eql('Book successfully deleted!');
  //                     res.body.result.should.have.property('ok').eql(1);
  //                     res.body.result.should.have.property('n').eql(1);
  //                 done();
  //               });
  //         });
  //     });
  // });


    })
});

		// describe('/GET dummy_test', () => {
		// 	it('it should respond with a name object', (done) => {
		// 		chai.request(server)
		// 		.get('/dummy_test')
		// 		.end((err, res) => {
		// 			res.should.have.status(200);
		// 			res.body.should.be.an('object');
		// 			done();
		// 		});
		// 	});
		// });
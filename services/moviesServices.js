import axios from 'axios';
import Vue from 'vue';
import StarRating from 'vue-star-rating';
const url = 'http://localhost:8081/';
const token = localStorage.getItem('auth');
const headers = { headers: {
	Authorization:`JWT ${token}`,
	'Content-Type': 'application/json',
}
}
export default {
	movies(credentials) {
		return axios
		.post('/movies', credentials)
		.then(response => response.data);
	},
	getMovies() {
		return axios
		.get('/movies', headers)
		.then(response => response.data);
	},
	geMovieById(id){
		return axios.get(`/api/movies/${id}`).then(response => response.data);
	},
	rate(movieId, data){
		return axios.post(`/movies/rate/${movieId}`, data).then(response => response.data);
	},
	register(credentials) {
		return axios
		.post('/users/register', credentials)
		.then(response => response.data);
	},
	login(credentials) {
		return axios
		.post(`/users/login`, credentials)
		.then(response => response.data);
	},
};

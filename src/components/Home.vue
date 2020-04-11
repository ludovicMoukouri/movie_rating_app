<template>
	<v-layout row wrap>
		<v-flex xs4 v-for="movie in movies" :key="movie._id">
			<v-card>
				<v-card-title primary-title>
					<div>
						<div class="headline">
							<v-btn flat v-bind:to="`/movies/${movie._id}`">
								{{ movie.name }}
							</v-btn>
						</div>
						<span class="grey--text">{{ movie.release_year }} ‧ {{
						movie.genre }}</span>
					</div>
				</v-card-title>
				<v-card-text>
					{{ movie.description }}
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>
<script type="text/javascript">
import axios from 'axios';

export default {
  name: 'Movies',
  computed: {
    movies() {
      return this.$store.getters.fetchMovies;
    },
  },
  mounted() {
    // this.fetchMovies();
    this.$store.dispatch('fetchMovies');
  },
  methods: {
    async fetchMovies() {
      const responseParse = JSON.parse(localStorage.getItem('user'));
      const token = responseParse.token;
      return axios({
        method: 'get',
        url: '/movies',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          this.movies = response.data.movies;
          this.current_user = response.data.current_user;
        })
        .catch(() => {
          // console.log('error Lud', error);
        });
    },
  },
};
</script>

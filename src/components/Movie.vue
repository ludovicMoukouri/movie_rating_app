<template>
	<v-layout row wrap>
		<v-flex xs4>
			<v-card>
				<v-card-title primary-title>
					<div>
						<div class="headline">{{ movie.name }}</div>
						<span class="grey--text">{{ movie.release_year }} ‧ {{
						movie.genre }}</span>
					</div>
				</v-card-title>
				<h6 class="card-title" id="rate_movie"
         v-if="current_user" @click="rate">Rate this movie</h6>
				<v-card-text>
					{{ movie.description }}
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>
<script type="text/javascript">
import Vue from 'vue';
import StarRating from 'vue-star-rating';
import MoviesServices from '../../services/moviesServices';

const wrapper = document.createElement('div');
// shared state
const state = {
  note: 0,
};
// crate component to content
const RatingComponent = Vue.extend({
  data() {
    return { rating: 0 };
  },
  watch: {
    rating(newVal) { state.note = newVal; },
  },
  template: `
<div class="rating">
How was your experience getting help with this issues?
<star-rating v-model="rating" :show-rating="false"></star-rating>
</div>`,
  components: { 'star-rating': StarRating },
});
const component = new RatingComponent().$mount(wrapper);

export default {
  name: 'Movie',
  data() {
    return {
      movie: [],
      current_user: '',
    };
  },
  mounted() {
    this.fetchMovie();
  },
  methods: {
    async rate() {
      try {
        const data = {
          rate: state.note,
          user_id: '5e8a04deaac09d40c43673ec',
        };
        await MoviesServices.rate(this.$route.params.id, data);
        // alert(response);
      } catch (error) {
        this.msg = error.response.data.msg;
      }
      this.$swal({
        content: component.$el,
        buttons: {
          confirm: {
            value: 0,
          },
        },
      }).then(() => {
        this.$swal(`Thank you for rating! ${state.note}`, 'success');
      })
        .catch((error) => {
          const message = error.response.data.message;
          this.$swal('Oh oo!', `${message}`, 'error');
        });
    },
    async fetchMovie() {
      try {
        const response = await MoviesServices.geMovieById(this.$route.params.id);
        this.movie = response.movie;
        this.current_user = response.current_user;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>

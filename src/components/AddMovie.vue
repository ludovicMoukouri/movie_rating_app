<template>
	<v-form v-model="valid" ref="form" lazy-validation>
		<v-text-field
		label="Movie Name"
    v-model="name"
		id="name"
		:rules="nameRules"
		required
		></v-text-field>
		<v-text-field
		name="input-7-1"
		label="Movie Description"
    v-model="description"
		id="description"
		multi-line
		></v-text-field>
		<v-select
		label="Movie Release Year"
    v-model="release_year"
		id="release_year"
		required
    :rules="releaseRules"
		:items="years"
		></v-select>
		<v-text-field
		label="Movie Genre"
    v-model="genre"
		id="genre"
		required
		:rules="genreRules"
		></v-text-field>
		<v-btn
		@click="submit"
		:disabled="!valid"
    id="add_movie_btn"
		>
		submit
	</v-btn>
	<v-btn @click="clear">clear</v-btn>
</v-form>
</template>
<script type="text/javascript">
export default {
  data: () => ({
    valid: true,
    name: '',
    description: '',
    genre: '',
    release_year: '',
    nameRules: [
      v => !!v || 'Movie name is required',
    ],
    genreRules: [
      v => !!v || 'Movie genre year is required',
      v => (v && v.length <= 80) || 'Genre must be less than equal to 80 characters.',
    ],
    releaseRules: [
      v => !!v || 'Movie release year is required',
    ],
    select: null,
    years: [
      '2018',
      '2017',
      '2016',
      '2015',
    ],
    checkbox: false,
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        // Perform next action
        const movie = {
          name: this.name,
          description: this.description,
          release_year: this.release_year,
          genre: this.genre,
        };
        this.$store.dispatch('addMovie', movie);
        this.$router.push({ name: 'Home' });
        this.$refs.form.reset();
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

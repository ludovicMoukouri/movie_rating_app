<template>
  <div>
    <div class="login">
      <a class="btn facebook" href="/login/facebook"> LOGIN WITH
      FACEBOOK</a>
    </div>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
      label="Email"
      v-model="email"
      id="email"
      :rules="emailRules"
      required
      ></v-text-field>
      <v-text-field
      label="Password"
      v-model="password"
      id="password"
      required
      ></v-text-field>
      <v-btn
      @click="submit"
      id="login"
      :disabled="!valid"
      >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
 </div>
</template>
<script>
import MoviesServices from '../../services/moviesServices';
import bus from '../bus';

export default {
  data: () => ({
    valid: true,
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        // add process here
        try {
          const credentials = {
            password: this.password,
            email: this.email,
          };
          await MoviesServices.login(credentials);
          // const responseStringify = JSON.stringify(response);
          // window.localStorage.setItem('auth', response.token);
          // localStorage.setItem('user', responseStringify);
          this.$swal(
            'Great!', 'You are ready to start!', 'success');
          bus.$emit('refreshUser');
          this.$router.push({ name: 'Home' });
        } catch (error) {
          const message = error.response.data.msg;
          this.$swal('Oh oo!', `${message}`, 'error');
          this.$router.push({ name: 'Login' });
        }
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

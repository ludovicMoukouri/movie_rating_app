const User = require('../models/User.js');
const { resigter_user, login_user } = require('../controllers/users.js');

const passport = require('passport');
module.exports.controller = (app) => {
// register a user
app.post('/users/register', resigter_user);

app.post('/users/login', passport.authenticate('local', { failureRedirect: '/users/login' }),
	function(req, res) {
		res.redirect('/');
	});

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user){
		done(err, user)
	})
});

};
const User = require('../models/User.js');

const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'movieratingapplicationsecretkey'
}

function resigter_user (req, res) {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	// const role = req.body.role || 'user';
	const newUser = new User({
		name,
		email,
		password,
		// role,
	});
	User.createUser(newUser, (error, user) => {
		if (error) {
			res.status(422).json({
				message: 'Something went wrong. Please try again after sometime!',
			});
		}
		res.send({ user: user });
	});
}

// login a user
function login_user (req, res) {
	if (req.body.email && req.body.password) {
		const email = req.body.email;
		const password = req.body.password;
		User.getUserByEmail(email, (err, user) => {
			if (!user) {
				res.status(404).json({ message: 'The user does not exist!' });
			} else {
				User.comparePassword(password, user.password, (error, isMatch) =>
				{
					if (error) throw error;
					if (isMatch) {
						const payload = { id: user.id };
						const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn:3000 });
						res.json({ message: 'ok', token: token, current_user: { id: user._id, name: user.name, email: user.email } });
					} else {
						res.status(401).json({ message: 'The password is incorrect!'
					});
					}
				});
			}
		});
	}
}

module.exports = { resigter_user, login_user };
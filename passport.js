const User = require('./models/User.js');
// const config = require('./config/Config');
const passport = require('passport');
// jwt strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
// local strategy
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
	var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = 'movieratingapplicationsecretkey'
    passport.use(new JwtStrategy(opts, 
        function(jwt_payload, done) {
        // console.log('jwt_payload', jwt_payload.id)
        try {
            return done(null, jwt_payload.id)
        } catch (error) {
            done(error);
        }
    }
    ));

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.getUserByEmail(email, function(err, user){
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            User.comparePassword(password, user.password, function(err,
                isMatch){
                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        });
    }
    ));

};
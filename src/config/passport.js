const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
require('dotenv').config();

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        return User.findOne({ where: { email: email } })
            .then(user => {
                if(!user || !user.validPassword(password)) {
                    return done(null, false, { error: { message: ' email or password is invalid' } });
                }
                return done(null, user);
            })
            .catch(err => done(err));
    }
    ));
};
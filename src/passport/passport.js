const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const { User } = require('../models');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
require('dotenv').config();

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        const userObject = new User();
  
        User.findOne({ where: { email } })
            .then(user => {
                userObject.password = user.password;
                if (!user || !userObject.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect email or password.' });
                }
                return done(null, user);
            });
    }
    ));
  
    const opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.authentication.jwtSecret;
    passport.use(new JWTStrategy(opts,
        function (token, done) {
            console.log('token', token);
            return done(null, token);
        }
    ));
};
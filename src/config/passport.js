const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
require('dotenv').config();

module.exports = () => {
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        // 이 부분에선 저장되어 있는 User를 비교하면 된다. 
        console.log(email);
        return User.findOne({ where: { email: email } })
            .then(user => {
                if(!user || !user.validPassword(password)) {
                    return done(null, false, { error: { body: ' email or password is invalid' } });
                }
                return done(null, user);
            })
            .catch(err => done(err));
    }
    ));
    
    // JWT Strategy
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    function (jwtPayload, done) {
        return User.findByPk(jwtPayload.id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
    ));
};
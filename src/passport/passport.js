const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const { User } = require('../models');
const { configs } = require('../config/config');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        const userObject = new User();
        
        User.findOne({ where: { email } })
            .then(user => {
                if (!user) { return done(null, false, { message: 'UNSIGNED_EMAIL' }); }
                
                userObject.password = user.dataValues.password;
                userObject.validPassword(password).then(result => {
                    if(result) {
                        return done(null, user);
                    }else{
                        return done(null, false, { message: 'INCORRECT_PASSWORD' });
                    }
                });
            });
    }
    ));
  
    const opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;
    passport.use(new JWTStrategy(opts,
        function (token, done) {
            console.log('token', token);
            return done(null, token);
        }
    ));
};
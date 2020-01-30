const jwt = require('jsonwebtoken');
const { User } = require('../models');
const passport = require('passport');

exports.required = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (error, token) => {
        console.log('tokenuser', token);
        if (error || !token) {
            return res.status(401).json({ message: 'Unauthorized' });
        } 
        try {
            const user = await User.findOne({
                where: { user_id: token.user_id }
            });
            req.user = user;
        } catch (error) {
            next(error);
        }
        next();
    })(req, res, next);
};
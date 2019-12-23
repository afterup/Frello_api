const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    });
}

module.exports = {
    async register (req, res) {
        console.log(req.body);
        try {
            console.log('sdf');
            const user = await User.create(req.body);
            const userJson = user.toJSON();
            res.status(201).json({
                user: userJson,
                token: jwtSignUser(userJson)
            });
        }catch (err) {
            res.status(400).send({
                error: 'error'
            });
        }
    },
    async login (req, res) {
        try {
            const{ email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if(!user) {
                return res.status(403).send({
                    error: '아이디 또는 비밀번호를 확인해주세요'
                });
            }

            const isPasswordValid = await user.comparePassword(password);
            if(!isPasswordValid) {
                return res.status(403).send({
                    error: '아이디 또는 비밀번호를 확인해주세요'
                });
            }
            
            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            });
        }catch(error) {
            res.status(500).send({
                error: '로그인에 실패하였습니다.'
            });
        }
    }


};
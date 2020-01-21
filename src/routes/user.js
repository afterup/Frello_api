const { User } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const router = require('express').Router();
const auth = require('../middlewares/auth');
const passport = require('passport');
require('dotenv').config();

router.get('/user', 
    auth.required,
    function(req, res, next) {
        User.findByPk(req.payload.user_id, 
            { attributes: ['user_id', 'email', 'username', 'createdAt'] })
            .then((user) => {
                if(!user) { return res.sendStatus(401); }

                return res.json({ user: user });
            });
    });

router.post('/user',
    async function(req, res) {
        try{
            const user = new User();
            
            const { username, email, password } = req.body.user;

            const validateDuplicate = await User.findOne({
                where: {
                    [Op.or]: [{ email: email }, { username: username }]
                }
            });

            if(validateDuplicate) {
                return res.status(400).send({ error: { message: 'duplicate username or email' } });
            }
            await user.hashPassword(password);
        
            const resultUser = await User.create({
                email, username, password
            });

            return res.status(201).json(user.toAuthJSON(resultUser.user_id));
        }catch(err) {
            console.log(err);
            return res.status(500).send({ error: { message: 'register error' } });
        }
    }
);

router.put('/user',
    auth.required,
    async function(req, res) {
        try{
            const user = await User.findByPk(req.payload.user_id);
            if(!user) {
                return res.status(406).send({ error: { message: 'not exist user' } }); 
            }

            const { username, email, password } = req.body.user;
            const newUser = new User();
            await newUser.hashPassword(password);

            User.update(
                {
                    username: username,
                    email: email,
                    password: newUser.password
                },
                { where: { user_id: req.payload.user_id } }
            ).then((user) => {
                console.log(user);
                res.status(201).send({
                    message: 'success'
                });
            });
        }catch(err) {
            console.log(err);
            res.status(500).send({ error: { message: 'update error' } });
        }
    }
);

router.delete('/user',
    auth.required,
    function(req, res, next) {
        User.destroy({
            where: { user_id: req.payload.user_id }
        }).then((result) => {
            if(result === 1) {
                res.status(200).send({
                    message: 'success'
                });
            }else {
                res.status(406).send({ error: { message: 'not exist user' } });
            }
        });
    }
);

router.post('/user/login', function(req, res) {
    passport.authenticate('local', function(err, user) {
        if(err || !user) { return res.status(400).send({ error: { message: 'authenticate error' } }); }

        req.login(user, { session: false }, (err) => {
            if(err) {
                res.send(err);
            }
        });
        return res.status(201).json(user.toAuthJSON(user.user_id));
    })(req, res);
});



module.exports = router;
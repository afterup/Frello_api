const { User } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = require('express').Router();
const auth = require('../middlewares/auth');

const passport = require('passport');

require('dotenv').config();

router.get('/user', 
    auth.required,
    function(req, res, next) {
        User.findByPk(req.user.user_id, 
            { attributes: ['user_id', 'email', 'username'] })
            .then((user) => {
                if(!user) { return res.sendStatus(401); }

                return res.json({ user: user });
            });
    }
);

router.post('/user',
    async function(req, res) {
        async function checkDuplicateName(username, email) { 
            const validateDuplicate = await User.findOne({
                where: { [Op.or]: [{ email }, { username }] }
            });

            if(validateDuplicate) {
                return res.status(400).send({ error: { message: 'duplicate username or email' } });
            }else {
                return false;
            }
        }

        try{
            const { username, email, password } = req.body.user;
            const userObject = new User();

            checkDuplicateName(username, email);
            await userObject.hashPassword(password);
        
            await User.create({ email, username, password: userObject.password });

            return res.status(201).json({ message: 'success' });
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
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if(err || !user) { return res.status(400).send({ error: { message: info.message, user } }); }

        req.login(user, { session: false }, (err) => {
            if(err) { res.send(err); }

            /* eslint-disable camelcase */
            const userObject = new User();
            const { user_id, username, email } = user;
            userObject.username = username;
            userObject.email = email;
            
            const loginUser = userObject.toAuthJSON(user_id);
            return res.status(201).json({ user: loginUser });
        });
    })(req, res);
});



module.exports = router;
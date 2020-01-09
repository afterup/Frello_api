const { User } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const router = require('express').Router();
const passport = require('passport');
const auth = require('../middlewares/auth');

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
            
            user.username = req.body.user.username;
            user.email = req.body.user.email;

            const validateDuplicate = await User.findOne({
                where: {
                    [Op.or]: [{ email: user.email }, { username: user.username }]
                }
            });

            if(validateDuplicate) {
                return res.status(400).send({ error: { body: 'duplicate username or email' } });
            }
            await user.hashPassword(req.body.user.password);
        
            const resultUser = await User.create({
                email: user.email,
                username: user.username,
                password: user.password
            });

            return res.status(201).json({
                user: user.toAuthJSON(resultUser.user_id)
            });
        }catch(err) {
            console.log(err);
            return res.status(500).send({ error: { body: 'register error' } });
        }
    }
);

router.put('/user',
    auth.required,
    async function(req, res) {
        try{
            const user = await User.findByPk(req.payload.user_id);
            if(!user) {
                return res.status(406).send({ error: { body: 'not exist user' } }); 
            }

            const newUser = new User();
            await newUser.hashPassword(req.body.user.password);

            User.update(
                {
                    username: req.body.user.username,
                    email: req.body.user.email,
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
            res.status(500).send({ error: { body: 'update error' } });
        }
    }

);

module.exports = router;
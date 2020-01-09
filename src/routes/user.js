const { User } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const router = require('express').Router();
const passport = require('passport');
const auth = require('../middlewares/auth');

router.get('/user', 
    auth.required,
    function(req, res, next) {
        User.findById(req.payload.id).then((user) => {
            if(!user) { return res.sendStatus(401); }

            return res.json({ user: user.toAuthJSON() });
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
                console.log(validateDuplicate);
                res.status(400).send({ error: { body: 'duplicate username or email' } });
            }else {
                user.hashPassword(req.body.user.password);
        
                const resultUser = await User.create(req.body.user);
                console.log(resultUser);
                res.status(201).json({
                    user: user.toAuthJSON()
                });
            }
        }catch(err) {
            res.status(400).send({ error: { body: 'register error' } });
        }
    }
);

router.put('/user',
    auth.required,
    async function(req, res) {
        const user = await User.findById(req.payload.id);
        if(!user) {
            return res.status(201).send({ error: { body: 'not exist user' } }); 
        }
    }

);

module.exports = router;
const { Card, List } = require('../models');
const router = require('express').Router();
const auth = require('../middlewares/auth');

// routes '/card' 

router.post('/', auth.required, 
    async function(req, res) {
        try{
            const reqCard = req.body.card;

            const list = await List.findOne({
                where: { list_id: reqCard.list_id }
            });

            if(!list) {
                return res.status(403).send({ error: { message: 'Not found list' } });
            }

            const result = await Card.create({
                user_id: req.payload.user_id,
                list_id: reqCard.list_id,
                title: reqCard.title,
                description: reqCard.description,
                position: reqCard.position
            });
            res.status(201).send(result);
        }catch(err) {
            res.status(500).send({ error: { message: err.message } });
        };
    }
);

router.get('/:id', 
    function(req, res) {
        Card.findOne({ where: { card_id: req.params.id } })
            .then((result) => {
                if(result) {
                    res.status(201).send(result);
                }else {
                    res.status(403).send({ error: { message: 'Not Found Card' } });
                }
            }).catch(err => {
                res.status(500).send({ error: { message: err.message } });
            });
    }
);

router.put('/:id', auth.required,
    async function(req, res) {
        try{
            const cardUserId = await Card.findOne({
                attributes: ['user_id'],
                where: { card_id: req.params.id }
            });

            if(!cardUserId) {
                return res.status(406).send({ error: { message: 'card_id not exist' } });
            }

            if(cardUserId.user_id === req.payload.user_id) {
                await Card.update(
                    req.body.card, 
                    { where: { card_id: req.params.id } }
                );
                res.status(200).send({ message: 'success' });
            }else {
                return res.status(403).send({ error: { message: 'Forbidden' } });
            }
        }catch(err) {
            res.status(500).send({ error: { message: err.message } });
        }
    }
);

router.delete('/:id', auth.required,
    async function(req, res) {
        try{
            const cardUserId = await Card.findOne({
                attributes: ['user_id'],
                where: { card_id: req.params.id }
            });

            if(!cardUserId) {
                return res.status(406).send({ error: { message: 'card_id not exist' } });
            }

            if(cardUserId.user_id === req.payload.user_id) {
                Card.destroy({
                    where: { card_id: req.params.id }
                }).then(() => {
                    res.status(200).send({ message: 'success' });
                });
            }else{
                res.status(403).send({ error: { message: 'Forbidden' } });
            }
        }catch(err) {
            res.status(500).send({ error: { message: err.message } });
        }
    }
);

module.exports = router;
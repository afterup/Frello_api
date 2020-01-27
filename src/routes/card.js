const { Card, List } = require('../models');
const router = require('express').Router();
const auth = require('../middlewares/auth');

// routes '/card' 

router.post('/', auth.required, 
    async function(req, res) {
        /* eslint-disable camelcase */
        console.log(req.body.card);
        const { list_id, title } = req.body.card;
        let position;

        const maximumPosition = await Card.findOne({
            limit: 1,
            where: {
                list_id: list_id
            },
            order: [['position', 'desc']]
        });

        console.log(maximumPosition);

        if(maximumPosition) {
            position = maximumPosition.position + 65535;
        }else {
            position = 65535;
        }

        console.log(position);

        Card.create({
            user_id: req.payload.user_id,
            list_id: list_id,
            title: title,
            position: position
        }).then((result) => {
            res.status(201).send({ card: result });
        }).catch(err => {
            res.status(500).send({ error: { message: err.message } });
        });
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

            const { title, description, bothCard, type } = req.body.card;

            if(cardUserId.user_id === req.payload.user_id) {
                if(title || description) {
                    await Card.update(
                        req.body.card, 
                        { where: { card_id: req.params.id } }
                    );
                }else {
                    if(type === 'moved') {
                        const { leftCardPosition, rightCardPosition } = bothCard;
                        let position;
    
                        if(leftCardPosition) {
                            if(rightCardPosition) {
                                // 두 포지션 사이의 난수 생성
                                position = Math.floor(Math.random() * (rightCardPosition - leftCardPosition)) + leftCardPosition;
                            }else {
                                position = leftCardPosition + Math.floor(Math.random() * 5000);
                            }
                        }else {
                            position = rightCardPosition - Math.floor(Math.random() * 5000);
                        }
    
                        await Card.update({ position }, { where: { card_id: req.params.id } });
                    }else { // add, remove
                        
                        
                    }
                }
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
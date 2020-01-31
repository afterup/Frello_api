const { Card, List } = require('../models');
const router = require('express').Router();
const { sequelize } = require('../models');
const auth = require('../middlewares/auth');

// routes '/card' 

router.post('/', auth.required,
    async function(req, res) {
        async function setPosition(listId) {
            let position;

            const largestPosition = await Card.findOne({
                limit: 1,
                where: { list_id: listId },
                order: [['position', 'desc']]
            });
            largestPosition ? position = largestPosition.position + 65535 : position = 65535;
            return position;
        }

        try{
            /* eslint-disable camelcase */
            const { list_id, title } = req.body.card;
            const { user_id } = req.user;
            const position = await setPosition(list_id);
            const card = await Card.create({ user_id, list_id, title, position });

            return res.status(201).send({ card: card });
        }catch(err) {
            return res.status(500).send({ error: { message: err.message } });
        }
    }
);

router.get('/:id', 
    async function(req, res) {
        try{
            const card = await Card.findOne({ 
                where: {
                    card_id: req.params.id
                }
            });

            console.log(card);
    
            if(card) res.status(201).send({ card: card });
            else res.status(403).send({ error: { message: 'Not Found Card' } });
        }catch(err) {
            res.status(500).send({ error: { message: err.message } });
        }
    }
);


router.put('/:id', auth.required,
    async function(req, res) {
        console.log(req.body.card);
        const { title, description, bothItem } = req.body.card;

        function findCard() {
            return Card.findOne({ where: { card_id: req.params.id } });
        }

        function updateCard(property) {
            return Card.update(property, { where: { card_id: req.params.id } });
        }

        function bothPosition(bothItem) {
            const { leftPosition, rightPosition } = bothItem;
            let position;
        
            if(leftPosition) {
                if(rightPosition) {
                    // 두 포지션 사이의 난수 생성
                    position = Math.floor(Math.random() * (rightPosition - leftPosition)) + leftPosition;
                }else {
                    position = leftPosition + Math.floor(Math.random() * 5000);
                }
            }else {
                position = rightPosition - Math.floor(Math.random() * 5000);
            }
            return position;
        }

        try{
            const { user_id } = await findCard();
            if(!user_id) return res.status(406).send({ error: { message: 'card_id not exist' } });
    
            if(user_id === req.user.user_id) {
                if(title || description) { // update title, description
                    await updateCard(req.body.card);
                }else if(bothItem) { // move card
                    const { listId } = req.body.card;
                    const position = bothPosition(req.body.card.bothItem);
                    await updateCard({ 
                        position: position, 
                        list_id: listId 
                    });
                }
    
                const card = await findCard();
                return res.status(200).send({ message: 'success', card });
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

            if(!cardUserId) { return res.status(406).send({ error: { message: 'card_id not exist' } }); }

            if(cardUserId.user_id === req.user.user_id) {
                await Card.destroy({ where: { card_id: req.params.id } });
                return res.status(200).send({ message: 'success' });
            }else{
                return res.status(403).send({ error: { message: 'Forbidden' } });
            }
        }catch(err) {
            return res.status(500).send({ error: { message: err.message } });
        }
    }
);

module.exports = router;
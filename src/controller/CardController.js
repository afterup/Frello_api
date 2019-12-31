const { Card } = require('../models');

module.exports = {
    async indexCard(req, res) {
        try{
            const card = await Card.findAll({
                where: { card_id: req.body.card_id }
            });
            res.send(card);
        }catch(err) {
            res.status(500).send({
                error: 'fetch error'
            });
        }
    },
    async postCard(req, res) {
        try{
            const card = await Card.create(req.body);
            res.send(card);
        }catch(err) {
            res.status(500).send({
                error: 'create error'
            });
        }
    },
    async updateCard(req, res) {
        try{
            const card = await Card.update(
                req.body,
                { where: { card_id: req.body.card_id } }
            );

            if(card[0] === 0) {
                res.status(400).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                const result = await Card.findOne({ where: { card_id: req.body.card_id } });
                res.send(result);
            }
        }catch(err) {
            res.status(500).send({
                error: 'update error'
            });
        }
    }


};
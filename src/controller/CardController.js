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
    }


};
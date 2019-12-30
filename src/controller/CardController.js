const { Card } = require('../models');

module.exports = {
    async index(req, res) {
        try{
            const card = await Card.findAll({
                limit: 10
            });
            res.send(card);
        }catch(err) {
            res.status(500).send({
                error: 'fetch error'
            });
        }
    },
    async post(req, res) {
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
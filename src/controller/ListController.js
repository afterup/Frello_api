const { List } = require('../models');

module.exports = {
    async index(req, res) {
        try{
            const list = await List.findAll({
                limit: 10
            });
            res.send(list);
        }catch(err) {
            res.status(500).send({
                error: 'fetch error'
            });
        }
    },
    async post(req, res) {
        try{
            const list = await List.create(req.body);
            res.send(list);
        }catch(err) {
            res.status(500).send({
                error: 'create error'
            });
        }
    }


};
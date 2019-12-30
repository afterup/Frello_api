const { List } = require('../models');

module.exports = {
    async postList(req, res) {
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
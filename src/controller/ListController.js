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
    },

    async updateList(req, res) {
        try{
            const list = await List.update(
                req.body,
                { where: { list_id: req.body.list_id } }
            );

            if(list[0] === 0) {
                res.status(400).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                const result = await List.findOne({ where: { list_id: req.body.list_id } });
                res.send(result);
            }
        }catch(err) {
            res.status(500).send({
                error: 'update error'
            });
        }
    }


};
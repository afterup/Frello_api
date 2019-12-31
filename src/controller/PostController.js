const { Board, Favorite, List, Card } = require('../models');

module.exports = {
    async createPostData(req, res) {
        try{
            let model;
            let object;
            
            switch(Object.keys(req.body)[0]) {
            case 'board' :
                model = Board;
                object = req.body.board;
                break;
            case 'list' :
                model = List;
                object = req.body.list;
                break;
            case 'card' :
                model = Card;
                object = req.body.card;
                break;
            case 'favorite':
                model = Favorite;
                object = req.body.favorite;
            }
            
            const result = await model.create(object);
            res.send(result);
        }catch(err) {
            if(err.original.code === 'ER_NO_REFERENCED_ROW_2') {
                res.status(500).send({
                    error: '유효하지 않는 id가 포함되어있습니다'
                });
            }else {
                res.status(500).send({
                    error: 'Post Error'
                });
            }
        }
    },

    async updatePostData(req, res) {
        try{
            let model;
            let bodyObject;
            let whereObject;

            switch(Object.keys(req.body)[0]) {
            case 'board' :
                model = Board;
                bodyObject = req.body.board;
                whereObject = { where: { board_id: bodyObject.board_id } };
                break;
            case 'list' :
                model = List;
                bodyObject = req.body.list;
                whereObject = { where: { list_id: bodyObject.list_id } };
                break;
            case 'card' :
                model = Card;
                bodyObject = req.body.card;
                whereObject = { where: { card_id: bodyObject.card_id } };
                break;            
            }
            const result = await model.update(
                bodyObject,
                whereObject
            );

            if(result[0] === 0) {
                res.status(500).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                const resultObject = await model.findOne(whereObject);
                res.send(resultObject);
            }
        }catch(err) {
            res.status(500).send({
                error: 'Update error'
            });
        }
    }
};
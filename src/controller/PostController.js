const { Board, Favorite, List, Card } = require('../models');

module.exports = {
    async createPostData(req, res) {
        try{
            let model;
            let object;
            const body = req.body;
            
            switch(Object.keys(body)[0]) {
            case 'board' :
                model = Board;
                object = body.board;
                break;
            case 'list' :
                model = List;
                object = body.list;
                break;
            case 'card' :
                model = Card;
                object = body.card;
                break;
            case 'favorite':
                model = Favorite;
                object = body.favorite;
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

    async fetchPostData(req, res) {
        try{
            let model;
            let whereObject;
            const body = req.body;

            switch(Object.keys(body)[0]) {
            case 'board':
                model = Board;
                whereObject = { user_id: body.board.user_id };
                break;
            case 'card' :
                model = Card;
                whereObject = { card_id: body.card.card_id };
                break;
            case 'favorite' :
                model = Favorite;
                whereObject = { user_id: body.favorite.user_id };
            }

            const result = await model.findAll({
                where: whereObject
            });

            if(result.length === 0) {
                res.status(400).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                res.send(result);
            }
        }catch(err) {
            res.status(500).send({
                error: 'fetch error'
            });
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
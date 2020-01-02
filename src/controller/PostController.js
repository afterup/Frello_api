const { User, Board, Favorite, List, Card } = require('../models');

module.exports = {
    async createPostData(req, res) {
        try{
            let model;
            let option;
            const body = req.body;
            
            switch(Object.keys(body)[0]) {
            case 'board' :
                model = Board;
                option = body.board;
                break;
            case 'list' :
                model = List;
                option = body.list;
                break;
            case 'card' :
                model = Card;
                option = body.card;
                break;
            case 'favorite':
                model = Favorite;
                option = body.favorite;
            }
            
            const result = await model.create(option);
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
            let option;
            const params = req.params;

            switch(req.url.split('/')[1]) {
            case 'boards' : {
                const user = await User.findOne({ 
                    where: { username: params.username },
                    order: [['updatedAt', 'ASC']]
                }
                );

                model = Board;
                option = { where: { user_id: user.user_id } };
                break;
            }
            case 'board' :
                model = Board;
                option = {
                    include: [{ 
                        model: List, 
                        include: [{
                            model: Card,
                            order: [['position', 'ASC']]
                        }],
                        order: [['position', 'ASC']]
                    }],
                    where: { board_id: params.id }
                };
                break;
            case 'card' :
                model = Card;
                option = { 
                    where: { card_id: params.id }
                };
                break;
            case 'favorite' :
                model = Favorite;
                option = { 
                    where: { user_id: params.id },
                    order: [['updatedAt', 'ASC']]
                };
                break;
            }

            const result = await model.findAll(
                option
            );

            if(result.length === 0) {
                res.status(400).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                res.send(result);
            }
        }catch(err) {
            console.log(err);
            res.status(500).send({
                error: 'fetch error'
            });
        }
    },

    async updatePostData(req, res) {
        try{
            let model;
            let bodyObject;
            let option;

            switch(Object.keys(req.body)[0]) {
            case 'board' :
                model = Board;
                bodyObject = req.body.board;
                option = { where: { board_id: bodyObject.board_id } };
                break;
            case 'list' :
                model = List;
                bodyObject = req.body.list;
                option = { where: { list_id: bodyObject.list_id } };
                break;
            case 'card' :
                model = Card;
                bodyObject = req.body.card;
                option = { where: { card_id: bodyObject.card_id } };
                break;            
            }
            const result = await model.update(
                bodyObject,
                option
            );

            if(result[0] === 0) {
                res.status(500).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                const resultObject = await model.findOne(option);
                res.send(resultObject);
            }
        }catch(err) {
            res.status(500).send({
                error: 'Update error'
            });
        }
    },

    async deletePostData(req, res) {
        try{
            let model;
            let option;

            switch(req.url.split('/')[1]) {
            case 'board' :
                model = Board;
                option = { where: { board_id: req.params.id } };
                break;
            case 'list' :
                model = List;
                option = { where: { list_id: req.params.id } };
                break;
            case 'card' :
                model = Card;
                option = { where: { card_id: req.params.id } };
                break;       
            case 'favorite' :
                model = Favorite;
                option = { where: { favorite_id: req.params.id } };    
                break;
            }
            
            const result = await model.destroy(
                option
            );

            if(result === 0) {
                res.status(400).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                res.send('success');
            }
        }catch(err) {
            console.log(err);
            res.status(500).send({
                error: 'delete error'
            });
        }
    }
};
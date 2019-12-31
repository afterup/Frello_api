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
    }
};
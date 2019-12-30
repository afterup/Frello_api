const { Board, Favorite, List, Card } = require('../models');

module.exports = {
    async indexAllBoard(req, res) {
        try{
            console.log(req.body.user_id);
            const board = await Board.findAll({
                where: { user_id: req.body.user_id }
            });
            res.send(board);
        }catch(err) {
            res.status(500).send({
                error: 'fetch error'
            });
        }
    },
    async postBoard(req, res) {
        try{
            const board = await Board.create(req.body);
            res.send(board);
        }catch(err) {
            res.status(500).send({
                error: 'require title, background, user_id'
            });
        }
    },
    
    async indexBoard(req, res) {
        try{
            console.log(req.params);
            const board = await Board.findAll({
                include: [{ model: List, include: [Card] }],
                where: { board_id: req.params.board_id }
            });

            if(board.length === 0) {
                res.status(500).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                res.send(board);
            }
        }catch(err) {
            res.status(500).send({
                error: 'fetch error'
            });
        }
    },


    async indexFavoriteBoard(req, res) {
        try{
            const favorite = await Favorite.findAll({
                where: { user_id: req.body.user_id }
            });
            res.send(favorite);
        }catch(err) {
            res.status(500).send({
                error: 'favorite create error'
            });
        }
    },
    async postFavoriteBoard(req, res) {
        try{
            const favorite = await Favorite.create(req.body);
            res.send(favorite);
        }catch(err) {
            res.status(500).send({
                error: 'favorite create error'
            });
        }
    }


};
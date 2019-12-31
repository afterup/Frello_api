const { Board, Favorite, List, Card } = require('../models');
const Sequelize = require('sequelize');

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
                res.status(400).send({
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
    async updateBoard(req, res) {
        try{
            console.log(req.body);
            const board = await Board.update(
                req.body,
                { where: { board_id: req.body.board_id } }
            );

            if(board[0] === 0) {
                res.status(400).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                const result = await Board.findOne({ where: { board_id: req.body.board_id } });
                res.send(result);
            }
        }catch(err) {
            res.status(500).send({
                error: 'update error'
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
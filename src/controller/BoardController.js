const { Board, Favorite } = require('../models');

module.exports = {
    async index(req, res) {
        try{
            const board = await Board.findAll({
                limit: 10
            });
            res.send(board);
        }catch(err) {
            res.status(500).send({
                error: 'fetch error'
            });
        }
    },
    async post(req, res) {
        try{
            const board = await Board.create(req.body);
            res.send(board);
        }catch(err) {
            res.status(500).send({
                error: 'create error'
            });
        }
    },

    async indexFavoriteBoard(req, res) {
        try{
            const favorite = await Favorite.findAll({
                limit: 10
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
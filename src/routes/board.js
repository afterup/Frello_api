const { Board, List, Card, Favorite } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { QueryTypes } = require('sequelize');
const router = require('express').Router();
const auth = require('../middlewares/auth');

// routes '/board' 

router.post('/', auth.required, 
    function(req, res, next) {
        console.log(req.payload);
        Board.create({
            user_id: req.payload.user_id,
            title: req.body.board.title,
            background: req.body.board.background
        }).then((result) => {
            res.status(201).send({ board: result });
        }).catch((err) => {
            res.status(500).send({ error: { message: err.message } });
        });
    }
);

router.get('/', auth.required, 
    function(req, res) {
        console.log(req.payload);
        Board.findAll({ 
            where: { user_id: req.payload.user_id },
            order: [['updatedAt', 'DESC']]
        })
            .then((boards) => {
                res.status(200).send({
                    boards: boards
                });
            })
            .catch(err => {
                res.status(500).send({ error: { message: err.message } });
            });
    }
);

router.get('/:id', 
    async function(req, res) {
        // const query = `
        // SELECT b.board_id, b.user_id, b.title, b.background, b.createdAt, b.updatedAt, l.title, c.description, c.updatedAt FROM boards AS b 
        // JOIN lists AS l 
        // ON l.board_id = b.board_id
        // JOIN cards AS c
        // ON l.list_id = c.list_id
        // WHERE b.board_id= :board_id;
        // `;

        // const board = await Board.sequelize.query(
        //     query,
        //     {
        //         replacements: { board_id: req.params.id },
        //         type: QueryTypes.SELECT
        //     });
        // console.log(board);

        Board.findOne({
            where: { board_id: req.params.id },
            include: [{ 
                model: List, 
                include: [{
                    model: Card
                }],
                order: [[Card, 'position', 'ASC']]
            }],
            order: [
                [List, 'position', 'ASC']
            ]
        })
            .then((board) => {
                res.status(200).send({
                    board: board
                });
            }).catch(err => {
                res.status(500).send({ error: { message: err.message } });
            });
    }
);

router.put('/:id', auth.required,
    async function(req, res) {
        try{
            const boardUserId = await Board.findOne({
                attributes: ['user_id'],
                where: { board_id: req.params.id }
            });

            if(!boardUserId) {
                return res.status(406).send({ error: { message: 'board_id not exist' } });
            }

            if(boardUserId.user_id === req.payload.user_id) {
                await Board.update(
                    req.body.board, 
                    { where: { board_id: req.params.id } }
                );
                res.status(200).send({ message: 'success' });
            }else {
                return res.status(403).send({ error: { message: 'Forbidden' } });
            }
        }catch(err) {
            res.status(500).send({ error: { message: err.message } });
        }
    }
);

router.delete('/:id', auth.required,
    async function(req, res) {
        const boardUserId = await Board.findOne({
            attributes: ['user_id'],
            where: { board_id: req.params.id }
        });

        if(!boardUserId) {
            return res.status(406).send({ error: { message: 'board_id not exist' } });
        }

        if(boardUserId.user_id === req.payload.user_id) {
            Board.destroy({
                where: { board_id: req.params.id }
            }).then(() => {
                res.status(200).send({ message: 'success' });
            });
        }else{
            res.status(403).send({ error: { message: 'Forbidden' } });
        }
    }
);


module.exports = router;
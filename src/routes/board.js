const { Board, List, Card } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();
const auth = require('../middlewares/auth');

// routes '/board' 

router.post('/', auth.required, 
    function(req, res, next) {
        console.log(req.payload);
        Board.create({
            user_id: req.payload.user_id,
            title: req.body.board.title,
            background: req.body.board.title
        }).then((result) => {
            res.status(201).send(result);
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
    function(req, res) {
        Board.findOne({
            where: { board_id: req.params.id },
            include: [{ 
                model: List, 
                include: [{
                    model: Card,
                    order: [['position', 'ASC']]
                }],
                order: [['position', 'ASC']]
            }]
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
            if(req.body.board.user_id.toString() === req.payload.user_id.toString()) {
                const board = await Board.findOne({ where: { board_id: req.params.id } });
                if(!board) {
                    return res.status(406).send({ error: { message: 'board_id not exist' } });
                }
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
    function(req, res) {
        if(req.body.user_id.toString() === req.payload.user_id.toString()) {
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
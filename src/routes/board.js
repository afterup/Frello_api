const { Board, List, Card } = require('../models');
const sequelize = require('sequelize');
const router = require('express').Router();
const auth = require('../middlewares/auth');

// routes '/board' 

router.post('/', auth.required, function(req, res, next) {
    console.log(req.payload);
    Board.create({
        user_id: req.payload.user_id,
        title: req.body.board.title,
        background: req.body.board.title
    }).then((result) => {
        res.status(201).send(result);
    }).catch((err) => {
        res.status(500).send({ error: { body: err.message } });
    });
});

router.get('/', auth.required, function(req, res) {
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
            res.status(500).send({ error: { body: err.message } });
        });
});

router.get('/:id', function(req, res) {
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
            res.status(500).send({ error: { body: err.message } });
        });
});


module.exports = router;
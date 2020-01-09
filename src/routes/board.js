const { Board } = require('../models');
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


module.exports = router;
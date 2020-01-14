const { Board, Favorite } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const router = require('express').Router();
const auth = require('../middlewares/auth');

// routes '/favorite' 

router.get('/', auth.required,
    async function(req, res) {
        try{
            const favorite = await Favorite.findAll({
                where: { user_id: req.payload.user_id },
                includes: [{
                    model: Board,
                    order: [['updatedAt', 'ASC']]
                }]
            });
            res.status(201).send({ favorite: favorite });
        }catch(err) {
            res.status(500).send({ error: { message: err.message } });
        }
    });

router.post('/:id', auth.required,
    async function(req, res) {
        try{
            const board = await Board.findOne({ where: { board_id: req.params.id } });
            if(!board) {
                return res.status(403).send({ error: { message: 'Not Found Board' } });
            }
            const favorite = await Favorite.create({
                user_id: req.payload.user_id,
                board_id: req.params.id
            });
            res.status(201).send({ favorite: favorite });
        }catch(err) {
            res.status(500).send({ error: { message: err.message } });
        }
    }
);

router.delete('/:id', auth.required,
    async function(req, res) {
        try{
            const favoriteId = await Favorite.findOne({
                where: {
                    [Op.or]: [{ board_id: req.params.id }, { user_id: req.payload.user_id }]
                }
            });

            if(!favoriteId) {
                return res.status(406).send({ error: { message: 'favorite not exist' } });
            }

            await Favorite.destroy({ where: { favorite_id: favoriteId.favorite_id } });
            res.status(200).send({ message: 'success' });
        }catch(err) {
            res.status(500).send({ error: { message: err.message } });
        }
    }
);


module.exports = router;
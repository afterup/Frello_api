const { Board, List, Card, Favorite } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { QueryTypes } = require('sequelize');
const router = require('express').Router();
const auth = require('../middlewares/auth');

// routes '/board'

router.post('/', auth.required, function(req, res) {
	const { title, background } = req.body.board;

	Board.create({
		user_id: req.payload.user_id,
		title,
		background,
	})
		.then(result => {
			res.status(201).send({ board: result });
		})
		.catch(err => {
			res.status(500).send({ error: { message: err.message } });
		});
});

router.get('/', auth.required, function(req, res) {
	console.log(req.payload);
	Board.findAll({
		where: { user_id: req.payload.user_id },
		order: [['updatedAt', 'DESC']],
	})
		.then(boards => {
			res.status(200).send({
				boards: boards,
			});
		})
		.catch(err => {
			res.status(500).send({ error: { message: err.message } });
		});
});

router.get('/:id', async function(req, res) {
    Board.findOne({
        where: { board_id: req.params.id },
        include: [
            {
                model: List,
                include: [
                    {
                        model: Card
                    }
                ]
            }
        ],
        order: [[List, 'position', 'ASC'], [List, Card, 'position', 'ASC']]
    })
        .then(board => {
            res.status(200).send({
                board: board
            });
        })
        .catch(err => {
            res.status(500).send({ error: { message: err.message } });
        });
});

router.put('/:id', auth.required, async function(req, res) {
	try {
		const boardUserId = await Board.findOne({
			attributes: ['user_id'],
			where: { board_id: req.params.id },
		});

		if (!boardUserId) {
			return res.status(406).send({ error: { message: 'board_id not exist' } });
		}

		if (boardUserId.user_id === req.payload.user_id) {
			await Board.update(req.body.board, { where: { board_id: req.params.id } });
			res.status(200).send({ message: 'success' });
		} else {
			return res.status(403).send({ error: { message: 'Forbidden' } });
		}
	} catch (err) {
		res.status(500).send({ error: { message: err.message } });
	}
});

router.delete('/:id', auth.required, async function(req, res) {
	const boardUserId = await Board.findOne({
		attributes: ['user_id'],
		where: { board_id: req.params.id },
	});

	if (!boardUserId) {
		return res.status(406).send({ error: { message: 'board_id not exist' } });
	}

	if (boardUserId.user_id === req.payload.user_id) {
		Board.destroy({
			where: { board_id: req.params.id },
		}).then(() => {
			res.status(200).send({ message: 'success' });
		});
	} else {
		res.status(403).send({ error: { message: 'Forbidden' } });
	}
});

router.put('/:id/favorite', auth.required, async function(req, res) {
	try {
		const board = await Board.findOne({ where: { board_id: req.params.id } });
		if (!board) {
			return res.status(403).send({ error: { message: 'Not Found Board' } });
		}

		console.log(req.body.favorite);

		const favorite = await Board.update(req.body, { where: { board_id: req.params.id } });
		res.status(200).send({ message: 'success' });
	} catch (err) {
		res.status(500).send({ error: { message: err.message } });
	}
});

module.exports = router;

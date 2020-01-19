const { List } = require('../models');
const router = require('express').Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;
const auth = require('../middlewares/auth');

// routes '/list'

router.post('/', auth.required,
    async function(req, res) {
        /* eslint-disable camelcase */
        const { board_id, title } = req.body.list;
        let position;

        const maximumPosition = await List.findOne({
            limit: 1,
            where: {
                board_id: board_id
            },
            order: [['position', 'desc']]
        });

        console.log(maximumPosition);

        if(maximumPosition) {
            position = maximumPosition.position + 65535;
        }else {
            position = 65535;
        }

        console.log(position);

        List.create({
            user_id: req.payload.user_id,
            board_id: board_id,
            title: title,
            position: position
        }).then((result) => {
            res.status(201).send({ list: result });
        }).catch(err => {
            res.status(500).send({ error: { message: err.message } });
        });
    }
);

router.put('/:id', auth.required,
    async function(req, res) {
        try{
            const listUserId = await List.findOne({
                attributes: ['user_id'],
                where: { list_id: req.params.id }
            });

            if(!listUserId) {
                return res.status(406).send({ error: { message: 'list_id not exist' } });
            }

            const { title, bothList } = req.body.list;

            if(listUserId.user_id === req.payload.user_id) {
                if(title) {
                    await List.update(
                        { title },
                        { where: { list_id: req.params.id } }
                    );
                }else if(bothList) {
                    const { leftListPosition, rightListPosition } = bothList;
                    let position;

                    if(leftListPosition) {
                        if(rightListPosition) {
                            // 두 포지션 사이의 난수 생성
                            position = Math.floor(Math.random() * (rightListPosition - leftListPosition)) + leftListPosition;
                        }else {
                            position = leftListPosition + Math.floor(Math.random() * 5000);
                        }
                    }else {
                        position = rightListPosition - Math.floor(Math.random() * 5000);
                    }

                    await List.update(
                        { position },
                        { where: { list_id: req.params.id } }
                    );
                }

                const list = await List.findOne({
                    where: { list_id: req.params.id }
                });

                return res.status(200).send({ message: 'success', list: list });
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
        try{
            const listUserId = await List.findOne({
                attributes: ['user_id'],
                where: { list_id: req.params.id }
            });

            if(!listUserId) {
                return res.status(406).send({ error: { message: 'list_id not exist' } });
            }
    
            if(listUserId.user_id === req.payload.user_id) {
                List.destroy({
                    where: { list_id: req.params.id }
                }).then(() => {
                    res.status(200).send({ message: 'success' });
                });
            }else {
                res.status(403).send({ error: { message: 'Forbidden' } });
            }
        }catch(err) {
            res.status(500).send({ error: { message: err.message } });
        }
    }
);




module.exports = router;
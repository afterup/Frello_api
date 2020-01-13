const { List } = require('../models');
const router = require('express').Router();
const auth = require('../middlewares/auth');

// routes '/list'

router.post('/', auth.required,
    function(req, res) {
        console.log(req.payload);
        const reqList = req.body.list;

        List.create({
            user_id: req.payload.user_id,
            board_id: reqList.board_id,
            title: reqList.title,
            position: reqList.position
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

            if(listUserId.user_id === req.payload.user_id) {
                const list = await List.update(
                    req.body.list,
                    { where: { list_id: req.params.id } }
                );
                console.log(list);
                return res.status(200).send({ message: 'success' });
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
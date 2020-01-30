const { List } = require('../models');
const router = require('express').Router();
const sequelize = require('sequelize');
const auth = require('../middlewares/auth');

// routes '/list'

async function checkList(listId) {
    const listUserId = await List.findOne({
        attributes: ['user_id'],
        where: { list_id: listId }
    });
    return listUserId;
}

router.post('/', auth.required,
    async function(req, res) {
        async function setPosition(boardId) {
            let position;
            const largestPosition = await List.findOne({
                limit: 1,
                where: { board_id: boardId },
                order: [['position', 'desc']]
            });
            largestPosition ? position = largestPosition.position + 65535 : position = 65535;

            return position;
        }

        try{
            /* eslint-disable camelcase */
            const { board_id, title } = req.body.list;
            const { user_id } = req.user;

            const position = await setPosition(board_id);
            console.log(position);
            
            const list = await List.create({ user_id, board_id, title, position });
            return res.status(201).send({ list: list }); 
        }catch(err) {
            return res.status(500).send({ error: { message: err.message } });
        }
    }
);



router.put('/:id', auth.required,
    async function(req, res) {
        function bothPosition(bothItem) {
            const { leftPosition, rightPosition } = bothItem;
            let position;
        
            if(leftPosition) {
                if(rightPosition) {
                    // 두 포지션 사이의 난수 생성
                    position = Math.floor(Math.random() * (rightPosition - leftPosition)) + leftPosition;
                }else {
                    position = leftPosition + Math.floor(Math.random() * 5000);
                }
            }else {
                position = rightPosition - Math.floor(Math.random() * 5000);
            }
            return position;
        }

        try{
            const { title, bothItem } = req.body.list;

            const listUserId = await checkList(req.params.id);
            if(!listUserId) return res.status(406).send({ error: { message: 'list_id not exist' } });

            if(listUserId.user_id === req.user.user_id) {
                if(title) { // update title
                    await List.update(
                        { title },
                        { where: { list_id: req.params.id } }
                    );
                }else if(bothItem) { // move list
                    const position = bothPosition(bothItem);

                    await List.findOne({ where: { position } });
                    await List.update(
                        { position },
                        { where: { list_id: req.params.id } }
                    ); 
                }

                const list = await List.findOne({ where: { list_id: req.params.id } });

                return res.status(200).send({ message: 'success', list: list });
            }else {
                return res.status(403).send({ error: { message: 'Forbidden' } });
            }
        }catch(err) {
            return res.status(500).send({ error: { message: err.message } });
        }
    }
);

router.delete('/:id', auth.required,
    async function(req, res) {
        try{
            const listUserId = await checkList(req.params.id);
            if(!listUserId) { return res.status(406).send({ error: { message: 'list_id not exist' } }); }
    
            if(listUserId.user_id === req.user.user_id) {
                await List.destroy({
                    where: { list_id: req.params.id }
                });
                return res.status(200).send({ message: 'success' });
            }else {
                return res.status(403).send({ error: { message: 'Forbidden' } });
            }
        }catch(err) {
            return res.status(500).send({ error: { message: err.message } });
        }
    }
);

module.exports = router;
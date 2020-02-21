import { checkExistId } from '../../utillities/utillity';
import { List } from '../../models';
import { createSetPosition, createMovePosition, duplicatePosition } from '../../utillities/taskPosition';
import sequelize from 'sequelize';
const Op = sequelize.Op;

export async function createList(req, res) {
    try{
        /* eslint-disable camelcase */
        const { board_id, title } = req.body.list;

        const position = await createSetPosition({ whereObject: { board_id: board_id }, model: List });
      
        const list = await List.create({ user_id: req.user.user_id, board_id, title, position });
        list.dataValues.Cards = [];

        return res.status(201).send({ list: list }); 
    }catch(err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}

export async function deleteList(req, res) {
    try{
        const list = await checkExistId({ whereObject: { list_id: req.params.id }, model: List }, res);

        if(list.user_id === req.user.user_id) {
            await List.destroy({ where: { list_id: req.params.id } });
            return res.status(200).send({ message: 'SUCCESS' });
        }else {
            return res.status(403).send({ error: { message: 'FORBIDDEN' } });
        }
    }catch(err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}

export async function updateList(req, res) {
    function updateList(property) {
        return List.update(property, { where: { list_id: req.params.id } });
    }

    try{
        const { title, bothPosition, board_id } = req.body.list;

        console.log(bothPosition, '-----');
        const list = await checkExistId({ whereObject: { list_id: req.params.id }, model: List }, res);
        console.log(bothPosition, '-----');

        if(list.user_id === req.user.user_id) {
            if(title) { 
                await updateList(req.body.list);
            }else if(bothPosition) {
                /* move list */
                const newPosition = await createMovePosition({ bothPosition });
                const duplicateCheckPosition = await duplicatePosition({
                    whereObject: { board_id }, 
                    position: newPosition, 
                    model: List,
                    Op
                });

                console.log(duplicateCheckPosition);
                await updateList({ position: duplicateCheckPosition });
            }

            const list = await List.findOne({ where: { list_id: req.params.id } });
            return res.status(200).send({ message: 'SUCCESS', list: list });
        }else {
            return res.status(403).send({ error: { message: 'FORBIDDEN' } });
        }
    }catch(err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}
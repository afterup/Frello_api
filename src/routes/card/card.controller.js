import { checkExistId } from '../../utillities/utillity';
import { Card, sequelize } from '../../models';
import { createSetPosition, createMovePosition, duplicatePosition } from '../../utillities/taskPosition';
const Op = sequelize.Op;

export async function createCard(req, res) {
    try{
        /* eslint-disable camelcase */
        const { list_id, title } = req.body.card;
        const { user_id } = req.user;

        const position = await createSetPosition({ whereObject: { list_id }, model: Card });

        const card = await Card.create({ user_id, list_id, title, position });
        return res.status(201).send({ card });
    }catch(err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}

export async function fetchCard(req, res) {
    try{
        const card = await Card.findOne({ where: { card_id: req.params.id } });

        if(card) { return res.status(200).send({ card: card }); } else { return res.status(403).send({ error: { message: 'FORBIDDEN' } }); };
    }catch(err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}

export async function updateCard(req, res) {
    function updateCard(property) { 
        return Card.update(property, { where: { card_id: req.params.id } }); 
    }
  
    try{
        const { type } = req.body.card;
        const card = await checkExistId({ whereObject: { card_id: req.params.id }, model: Card }, res);
      
        if(card.user_id === req.user.user_id) {
            if(type === 'update') { 
                await updateCard(req.body.card);
            }else{ 
            /* move card */
                const { bothPosition, listId } = req.body.card;
                
                const newPosition = await createMovePosition({ bothPosition });
                const duplicateCheckPosition = await duplicatePosition({
                    whereObject: { list_id: listId }, 
                    position: newPosition, 
                    model: Card,
                    Op
                });
              
                console.log(duplicateCheckPosition);
                await updateCard({ position: duplicateCheckPosition, list_id: listId });
            }
            const card = await Card.findOne({ where: { card_id: req.params.id } });
            return res.status(200).send({ message: 'SUCCESS', card });
        }else {
            return res.status(403).send({ error: { message: 'FORBIDDEN' } });
        }
    }catch(err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}

export async function deleteCard(req, res) {
    try{
        const card = await checkExistId({ whereObject: { card_id: req.params.id }, model: Card }, res);

        if(card.user_id === req.user.user_id) {
            await Card.destroy({ where: { card_id: req.params.id } });
            return res.status(200).send({ message: 'success' });
        }else{
            return res.status(403).send({ error: { message: 'Forbidden' } });
        }
    }catch(err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}

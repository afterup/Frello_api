import { checkExistId } from '../../utillities/utillity';
import { Board, List, Card, User } from '../../models';

export async function createBoard(req, res) {
    try{
        const { title, background } = req.body.board;
        const board = await Board.create({
            user_id: req.user.user_id,
            title,
            background
        });
        return res.status(201).send({ board: board });
    } catch(err) {
        return res.status(500).send({ error: { message: err.message } });
    };
}

export async function fetchAllBoard(req, res) {
    try{
        const boards = await Board.findAll({
            where: { user_id: req.user.user_id },
            order: [['updatedAt', 'DESC']]
        });
        return res.status(200).send({ boards: boards });
    }catch(err) { 
        return res.status(500).send({ error: { message: err.message } }); 
    };
}

export async function fetchOneBoard(req, res) {
    try{
    // board 안에 속한 list, card, user를 동시에 전달합니다.
        const board = await Board.findOne({
            where: { board_id: req.params.id },
            include: [{
                model: List, 
                include: [{ model: Card, attributes: ['card_id', 'position', 'list_id', 'title', 'updatedAt', 'user_id'] }] 
            }, {
                model: User,
                attributes: ['username']
            }],
            order: [[List, 'position', 'ASC'], [List, Card, 'position', 'ASC']]
        });
  
        return res.status(200).send({ board: board });
    }catch(err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}

export async function updateBoard(req, res) {
    try {
        const board = await checkExistId({ whereObject: { board_id: req.params.id }, model: Board }, res);

        if (board.user_id === req.user.user_id) {
            await Board.update(req.body.board, { where: { board_id: req.params.id } });
            const board = await Board.findOne({ where: { board_id: req.params.id } });

            return res.status(200).send({ message: 'SUCCESS', board });
        } else {
            return res.status(403).send({ error: { message: 'FORBIDDEN' } });
        }
    } catch (err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}

export async function deleteBoard(req, res) {
    const board = await checkExistId({ whereObject: { board_id: req.params.id }, model: Board }, res);

    if (board.user_id === req.user.user_id) {
        Board.destroy({ where: { board_id: req.params.id } })
            .then(() => { return res.status(200).send({ message: 'SUCCESS' }); });
    } else {
        return res.status(403).send({ error: { message: 'FORBIDDEN' } });
    }
}

export async function updateFavoriteBoard(req, res) {
    try {
        const board = await checkExistId({ whereObject: { board_id: req.params.id }, model: Board }, res);
        await Board.update(req.body, { where: { board_id: req.params.id } });
        return res.status(200).send({ message: 'success' });
    } catch (err) {
        return res.status(500).send({ error: { message: err.message } });
    }
}



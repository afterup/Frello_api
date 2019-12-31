const { Board, Favorite, List, Card } = require('../models');

module.exports = {

    async indexBoard(req, res) {
        try{
            console.log(req.params);
            const board = await Board.findAll({
                include: [{ model: List, include: [Card] }],
                where: { board_id: req.params.board_id }
            });

            if(board.length === 0) {
                res.status(400).send({
                    error: '유효하지 않는 아이디입니다.'
                });
            }else{
                res.send(board);
            }
        }catch(err) {
            res.status(500).send({
                error: 'fetch error'
            });
        }
    }

};
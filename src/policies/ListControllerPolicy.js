const Joi = require('Joi');

module.exports = {
    postList (req, res, next) {
        const schema = {
            title: Joi.string().max(1000),
            author_id: Joi.string(),
            board_id: Joi.string(),
            position: Joi.number()
        };

        const { error } = Joi.validate(req.body, schema);

        if(error) {
            switch(error.details[0].context.key) {
            case 'title':
                res.status(400).send({
                    error: '제목을 확인해주세요'
                });
                break;
            case 'position':
                res.status(400).send({
                    error: '포지션을 입력해주세요'
                });
                break;
            default:
                res.status(400).send({
                    error: '오류가 발생하였습니다'
                });
            }
        }else {
            next();
        }
    } 
};
const Joi = require('Joi');

module.exports = {
    postBoard (req, res, next) {
        const schema = {
            title: Joi.string().max(30),
            background: Joi.string().max(20),
            author_id: Joi.string()
        };

        const { error } = Joi.validate(req.body, schema);

        if(error) {
            switch(error.details[0].context.key) {
            case 'title':
                res.status(400).send({
                    error: '제목을 확인해주세요'
                });
                break;
            case 'background':
                res.status(400).send({
                    error: '배경화면 입력 오류'
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
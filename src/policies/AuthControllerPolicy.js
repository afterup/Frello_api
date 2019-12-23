const Joi = require('Joi');

module.exports = {
    register (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            username: Joi.string().min(3).max(20),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,30}$')
            )
        };

        const { error, value } = Joi.validate(req.body, schema);

        if(error) {
            switch(error.details[0].context.key) {
            case 'email':
                res.status(400).send({
                    error: '이메일을 확인해주세요'
                });
                break;
            case 'username':
                res.status(400).send({
                    error: '이름을 확인해주세요'
                });
                break;
            case 'password':
                res.status(400).send({
                    error: '비밀번호를 확인해주세요'
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
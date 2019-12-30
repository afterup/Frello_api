const Joi = require('@hapi/Joi');
const { checkPostError } = require('./CheckError');

module.exports = {
    indexCard (req, res, next) {
        const schema = Joi.object({
            card_id: Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            checkPostError(res, error);
        }else {
            next();
        }
    },
    postCard (req, res, next) {
        const schema = Joi.object({
            title: Joi.string().max(1000).required(),
            description: Joi.string().max(2000).allow(null),
            user_id: Joi.string().required(),
            list_id: Joi.string().required(),
            position: Joi.number().required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            checkPostError(res, error);
        }else {
            next();
        }
    } 
};
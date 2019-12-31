const Joi = require('@hapi/Joi');
const { checkPostError } = require('./CheckError');

module.exports = {
    postList (req, res, next) {
        const schema = Joi.object({
            title: Joi.string().max(1000).required(),
            user_id: Joi.string().required(),
            board_id: Joi.string().required(),
            position: Joi.number().required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            checkPostError(res, error);
        }else {
            next();
        }
    },
    updateList (req, res, next) {
        const schema = Joi.object({
            title: Joi.string().max(1000).required(),
            position: Joi.number().allow(null),
            list_id: Joi.string().required(),
            user_id: Joi.string().required(),
            board_id: Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            checkPostError(res, error);
        }else {
            next();
        }
    } 
};
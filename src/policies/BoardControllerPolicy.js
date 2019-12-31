const Joi = require('@hapi/Joi');
const { checkPostError } = require('./CheckError');

module.exports = {
    indexAllBoard(req, res, next) {
        const schema = Joi.object({
            user_id: Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            checkPostError(res, error);
        }else {
            next();
        }
    },

    indexFavoriteBoard(req, res, next) {
        const schema = Joi.object({
            user_id: Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            checkPostError(res, error);
        }else {
            next();
        }
    }





};
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

    postBoard (req, res, next) {
        const schema = Joi.object({
            title: Joi.string().max(30).required(),
            background: Joi.string().max(20).required(),
            user_id: Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            checkPostError(res, error);
        }else {
            next();
        }
    },

    updateBoard (req, res, next) {
        const schema = Joi.object({
            title: Joi.string().max(30).required(),
            background: Joi.string().max(20).allow(null),
            board_id: Joi.string().required()
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
    },

    postFavoriteBoard(req, res, next) {
        const schema = Joi.object({
            board_id: Joi.string().required(),
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
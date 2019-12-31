const Joi = require('@hapi/Joi');
const { checkPostError } = require('./CheckError');

const boardSchema = Joi.object().keys({
    board: Joi.object({
        title: Joi.string().max(30).required(),
        background: Joi.string().max(20).required(),
        user_id: Joi.string().required()
    })
});

const listSchema = Joi.object({
    list: Joi.object({
        title: Joi.string().max(1000).required(),
        user_id: Joi.string().required(),
        board_id: Joi.number().required(),
        position: Joi.number().required()
    })
});

const cardSchema = Joi.object().keys({
    card: Joi.object({
        title: Joi.string().max(1000).required(),
        description: Joi.string().max(2000).allow(null),
        user_id: Joi.string().required(),
        list_id: Joi.number().required(),
        position: Joi.number().required()
    })
});

const favoriteSchema = Joi.object().keys({
    favorite: Joi.object({
        user_id: Joi.string().required(),
        board_id: Joi.number().required()
    })
});

module.exports = {
    createPostData(req, res, next) {
        let schema;

        switch(Object.keys(req.body)[0]) {
        case 'board' :
            schema = boardSchema;
            break;
        case 'list' :
            schema = listSchema;
            break;
        case 'card' :
            schema = cardSchema;
            break;
        case 'favorite' :
            schema = favoriteSchema;
        }

        const { error } = schema.validate(req.body);

        if(error) {
            checkPostError(res, error);
        }else {
            next();
        }
    }
};
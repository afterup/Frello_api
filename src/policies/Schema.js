const Joi = require('@hapi/Joi');

/* Auth Schema */
const registerSchema = Joi.object().keys({
    user: Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().min(3).max(20).required(),
        password: Joi.string()
            .regex(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required()
    })
});

const loginSchema = Joi.object().keys({
    user: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
            .regex(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .required()
    })
});

const userUpdateSchema = Joi.object().keys({
    user: Joi.object({
        email: Joi.string().email().allow(null),
        username: Joi.string().min(3).max(20).allow(null),
        password: Joi.string()
            .regex(new RegExp('^[a-zA-Z0-9]{8,30}$'))
            .allow(null),
        user_id: Joi.string().required()
    })
});

const userDeleteSchema = Joi.object().keys({
    user: Joi.object({
        user_id: Joi.string().required()
    })
});

/* Board Schema */
const boardSchema = Joi.object().keys({
    board: Joi.object({
        title: Joi.string().max(30).required(),
        background: Joi.string().max(20).allow(null),
        user_id: Joi.string().required()
    })
});


const boardUpdateSchema = Joi.object().keys({
    board: Joi.object({
        title: Joi.string().max(30).required(),
        background: Joi.string().max(20).allow(null),
        board_id: Joi.number().required()
    })
});

/* List Schema */
const listSchema = Joi.object().keys({
    list: Joi.object({
        title: Joi.string().max(1000).required(),
        user_id: Joi.string().required(),
        board_id: Joi.number().required(),
        position: Joi.number().required()
    })
});

const listUpdateSchema = Joi.object().keys({
    list: Joi.object({
        title: Joi.string().max(1000).required(),
        position: Joi.number().allow(null),
        list_id: Joi.number().required(),
        user_id: Joi.string().required(),
        board_id: Joi.number().required()
    })
});

/* Card Schema */
const cardSchema = Joi.object().keys({
    card: Joi.object({
        title: Joi.string().max(1000).required(),
        description: Joi.string().max(2000).allow(null),
        user_id: Joi.string().required(),
        list_id: Joi.number().required(),
        position: Joi.number().required()
    })
});

const cardUpdateSchema = Joi.object().keys({
    card: Joi.object({
        title: Joi.string().max(1000).required(),
        description: Joi.string().max(2000).allow(null),
        position: Joi.number().allow(null),
        card_id: Joi.number().required(),
        list_id: Joi.number().required(),
        user_id: Joi.string().required()
    })
});

/* Favorite Schema */
const favoriteSchema = Joi.object().keys({
    favorite: Joi.object({
        user_id: Joi.string().required(),
        board_id: Joi.number().required()
    })
});


module.exports = {
    registerSchema,
    loginSchema,
    userUpdateSchema,
    userDeleteSchema,
    boardSchema,
    boardUpdateSchema,
    listSchema,
    listUpdateSchema,
    cardSchema,
    cardUpdateSchema,
    favoriteSchema
};
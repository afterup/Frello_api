const { checkPostError } = require('./CheckError');
const Joi = require('@hapi/joi');
const {
    boardSchema,
    boardUpdateSchema,
    listSchema,
    listUpdateSchema,
    cardSchema,
    cardUpdateSchema,
    favoriteSchema
} = require('./Schema');

function checkNext(body, schema, res, next) {
    const { error } = schema.validate(body);
    if(error) {
        checkPostError(res, error);
    }else {
        next();
    }
}

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
            break;
        default:
            res.status(400).send({ error: '잘못된 데이터 전송' });
            return;
        }
        checkNext(req.body, schema, res, next);
    },
    fetchPostData(req, res, next) {
        if(Object.keys(req.params)[0] === 'username') {
            const schema = Joi.object({
                username: Joi.string().required()
            });
        
            checkNext(req.params, schema, res, next);
        }else {
            const schema = Joi.object({
                id: Joi.number().required()
            });
        
            checkNext(req.params, schema, res, next);
        }
    },
    updatePostData (req, res, next) {
        let schema;

        switch(Object.keys(req.body)[0]) {
        case 'board' :
            schema = boardUpdateSchema;
            break;
        case 'list' :
            schema = listUpdateSchema;
            break;
        case 'card' :
            schema = cardUpdateSchema;
            break;
        default:
            res.status(400).send({ error: '잘못된 데이터 전송' });
            return;
        }
        checkNext(req.body, schema, res, next);
    },

    deletePostData(req, res, next) {
        const schema = Joi.object({
            id: Joi.number().required()
        });
        checkNext(req.params, schema, res, next);
    }


};
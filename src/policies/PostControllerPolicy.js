const { checkPostError } = require('./CheckError');
const {
    boardSchema,
    boardUpdateSchema,
    boardIdSchema,
    listSchema,
    listUpdateSchema,
    listIdSchema,
    cardSchema,
    cardUpdateSchema,
    cardIdSchema,
    favoriteSchema,
    favoriteUserIdSchema,
    favoriteIdSchema
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
        }
        checkNext(req.body, schema, res, next);
    },
    fetchPostData(req, res, next) {
        let schema;

        switch(Object.keys(req.body)[0]) {
        case 'board' :
            schema = boardIdSchema;
            break;
        case 'card' :
            schema = cardIdSchema;
            break;
        case 'list' :
            schema = listIdSchema;
            break; 
        case 'favorite' :
            schema = favoriteUserIdSchema;
            break;
        default:
            res.status(400).send({ error: '잘못된 데이터 전송' });
            return;
        }
        checkNext(req.body, schema, res, next);
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
        let schema;

        switch(Object.keys(req.body)[0]) {
        case 'board' :
            schema = boardIdSchema;
            break;
        case 'card' :
            schema = cardIdSchema;
            break;
        case 'list' :
            schema = listIdSchema;
            break; 
        case 'favorite' :
            schema = favoriteIdSchema;
            break;
        default:
            res.status(400).send({ error: '잘못된 데이터 전송' });
            return;
        }
        checkNext(req.body, schema, res, next);
    }


};
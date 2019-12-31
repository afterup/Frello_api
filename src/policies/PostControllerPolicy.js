const { checkPostError } = require('./CheckError');
const {
    boardSchema,
    boardUpdateSchema,
    listSchema,
    listUpdateSchema,
    cardSchema,
    cardUpdateSchema,
    favoriteSchema
} = require('./Schema');

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
        }

        const { error } = schema.validate(req.body);
        if(error) {
            checkPostError(res, error);
        }else {
            next();
        }
    }


};
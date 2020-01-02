const { checkAuthError } = require('./CheckError');
const {
    registerSchema,
    loginSchema,
    userUpdateSchema,
    userDeleteSchema
} = require('./Schema');

function checkNext(body, schema, res, next) {
    const { error } = schema.validate(body);

    if(error) {
        checkAuthError(res, error);
    }else {
        next();
    }
}

module.exports = {
    register (req, res, next) {
        const schema = registerSchema;
        checkNext(req.body, schema, res, next);
    },
    
    login(req, res, next) {
        const schema = loginSchema;
        checkNext(req.body, schema, res, next);
    },

    updateUser (req, res, next) {
        const schema = userUpdateSchema;
        checkNext(req.body, schema, res, next);
    },

    deleteUser (req, res, next) {
        const schema = userDeleteSchema;
        checkNext(req.body, schema, res, next);
    }
};
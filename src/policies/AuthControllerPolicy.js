const { checkAuthError } = require('./CheckError');
const {
    registerSchema,
    loginSchema,
    userUpdateSchema
} = require('./Schema');

module.exports = {
    register (req, res, next) {
        const schema = registerSchema;

        const { error } = schema.validate(req.body);

        if(error) {
            checkAuthError(res, error);
        }else {
            next();
        }
    },
    
    login(req, res, next) {
        const schema = loginSchema;

        const { error } = schema.validate(req.body);

        if(error) {
            checkAuthError(res, error);
        }else {
            next();
        }
    },

    updateUser (req, res, next) {
        const schema = userUpdateSchema;

        const { error } = schema.validate(req.body);

        if(error) {
            checkAuthError(res, error);
        }else {
            next();
        }
    }
};
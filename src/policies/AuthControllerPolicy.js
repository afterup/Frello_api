const Joi = require('@hapi/Joi');
const { checkAuthError } = require('./CheckError');

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            username: Joi.string().min(3).max(20).required(),
            password: Joi.string()
                .regex(new RegExp('^[a-zA-Z0-9]{8,30}$'))
                .required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            checkAuthError(res, error);
        }else {
            next();
        }
    },
    
    login(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string()
                .regex(new RegExp('^[a-zA-Z0-9]{8,30}$'))
                .required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            checkAuthError(res, error);
        }else {
            next();
        }
    }
};
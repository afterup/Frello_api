const AuthController = require('../controller/AuthController');
const AuthControllerPolicy = require('../policies/AuthControllerPolicy');

module.exports = (app) => {
    app.post('/signup', 
        AuthControllerPolicy.register,
        AuthController.register
    );

    app.post('/login', 
        AuthController.login
    );
};
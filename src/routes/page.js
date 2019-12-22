const AuthController = require('../controller/AuthController');

module.exports = (app) => {
    app.post('/register', 
        AuthController.register
    );
};
const AuthController = require('../controller/AuthController');
const BoardController = require('../controller/BoardController');
const AuthControllerPolicy = require('../policies/AuthControllerPolicy');

module.exports = (app) => {
    app.post('/signup', 
        AuthControllerPolicy.register,
        AuthController.register
    );

    app.post('/login', 
        AuthController.login
    );

    app.get('/board', 
        BoardController.index
    );

    app.post('/board', 
        BoardController.post
    );
};
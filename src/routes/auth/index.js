const AuthController = require('../../controller/AuthController');
const AuthControllerPolicy = require('../../policies/AuthControllerPolicy');

module.exports = (app) => {
    app.post('/signup', 
        AuthControllerPolicy.register,
        AuthController.register
    );

    app.post('/login', 
        AuthControllerPolicy.login,
        AuthController.login
    );

    app.patch('/user', 
        AuthControllerPolicy.updateUser,
        AuthController.updateUser
    );

    app.delete('/user/:id', 
        AuthControllerPolicy.deleteUser,
        AuthController.deleteUser
    );
};
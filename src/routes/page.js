const AuthController = require('../controller/AuthController');
const BoardController = require('../controller/BoardController');
const ListController = require('../controller/ListController');
const CardController = require('../controller/CardController');
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

    app.get('/board/favorite', 
        BoardController.indexFavoriteBoard
    );

    app.post('/board/favorite', 
        BoardController.postFavoriteBoard
    );

    app.get('/list', 
        ListController.index
    );

    app.post('/list', 
        ListController.post
    );   

    app.get('/card', 
        CardController.index
    );

    app.post('/card', 
        CardController.post
    );   
};
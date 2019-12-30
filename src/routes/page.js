const AuthController = require('../controller/AuthController');
const BoardController = require('../controller/BoardController');
const ListController = require('../controller/ListController');
const CardController = require('../controller/CardController');
const AuthControllerPolicy = require('../policies/AuthControllerPolicy');
const BoardControllerPolicy = require('../policies/BoardControllerPolicy');

module.exports = (app) => {
    app.post('/signup', 
        AuthControllerPolicy.register,
        AuthController.register
    );

    app.post('/login', 
        AuthController.login
    );

    app.get('/board', 
        BoardController.indexAllBoard
    );

    app.post('/board', 
        BoardControllerPolicy.postBoard,
        BoardController.postBoard
    );

    app.get('/board/:id', 
        BoardController.indexBoard
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
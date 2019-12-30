const AuthController = require('../controller/AuthController');
const BoardController = require('../controller/BoardController');
const ListController = require('../controller/ListController');
const CardController = require('../controller/CardController');
const AuthControllerPolicy = require('../policies/AuthControllerPolicy');
const BoardControllerPolicy = require('../policies/BoardControllerPolicy');
const ListControllerPolicy = require('../policies/ListControllerPolicy');

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

    app.get('/board/:board_id', 
        BoardController.indexBoard
    );

    app.get('/board/favorite', 
        BoardController.indexFavoriteBoard
    );

    app.post('/board/favorite', 
        BoardController.postFavoriteBoard
    );

    app.post('/list', 
        ListControllerPolicy.postList,
        ListController.postList
    );   

    app.post('/card', 
        CardController.post
    );   
};
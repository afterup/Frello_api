const AuthController = require('../controller/AuthController');
const BoardController = require('../controller/BoardController');
const ListController = require('../controller/ListController');
const CardController = require('../controller/CardController');
const AuthControllerPolicy = require('../policies/AuthControllerPolicy');
const BoardControllerPolicy = require('../policies/BoardControllerPolicy');
const ListControllerPolicy = require('../policies/ListControllerPolicy');
const CardControllerPolicy = require('../policies/CardControllerPolicy');

module.exports = (app) => {
    app.post('/signup', 
        AuthControllerPolicy.register,
        AuthController.register
    );

    app.post('/login', 
        AuthControllerPolicy.login,
        AuthController.login
    );

    app.get('/board', 
        BoardControllerPolicy.indexAllBoard,
        BoardController.indexAllBoard
    );

    app.post('/board', 
        BoardControllerPolicy.postBoard,
        BoardController.postBoard
    );

    app.patch('/board', 
        BoardControllerPolicy.updateBoard,
        BoardController.updateBoard
    );

    app.get('/board/:board_id', 
        BoardController.indexBoard
    );

    app.get('/favorite', 
        BoardControllerPolicy.indexFavoriteBoard,
        BoardController.indexFavoriteBoard
    );

    app.post('/favorite', 
        BoardControllerPolicy.postFavoriteBoard,
        BoardController.postFavoriteBoard
    );

    app.post('/list', 
        ListControllerPolicy.postList,
        ListController.postList
    );   

    app.patch('/list', 
        ListControllerPolicy.updateList,
        ListController.updateList
    );   

    app.get('/card', 
        CardControllerPolicy.indexCard,
        CardController.indexCard
    );   

    app.post('/card', 
        CardControllerPolicy.postCard,
        CardController.postCard
    );   

    app.patch('/card', 
        CardControllerPolicy.updateCard,
        CardController.updateCard
    );   
};
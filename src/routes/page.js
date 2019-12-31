const AuthController = require('../controller/AuthController');
const PostController = require('../controller/PostController');

const BoardController = require('../controller/BoardController');
const ListController = require('../controller/ListController');
const CardController = require('../controller/CardController');

const AuthControllerPolicy = require('../policies/AuthControllerPolicy');
const PostControllerPolicy = require('../policies/PostControllerPolicy');

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
        PostControllerPolicy.createPostData,
        PostController.createPostData
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
        PostControllerPolicy.createPostData,
        PostController.createPostData
    );

    app.post('/list', 
        PostControllerPolicy.createPostData,
        PostController.createPostData
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
        PostControllerPolicy.createPostData,
        PostController.createPostData
    );   

    app.patch('/card', 
        CardControllerPolicy.updateCard,
        CardController.updateCard
    );   
};
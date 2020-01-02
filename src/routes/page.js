const AuthController = require('../controller/AuthController');
const PostController = require('../controller/PostController');
const AuthControllerPolicy = require('../policies/AuthControllerPolicy');
const PostControllerPolicy = require('../policies/PostControllerPolicy');

const BoardController = require('../controller/BoardController');

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

    app.get('/board', 
        PostControllerPolicy.fetchPostData,
        PostController.fetchPostData
    );

    app.post('/board', 
        PostControllerPolicy.createPostData,
        PostController.createPostData
    );

    app.patch('/board', 
        PostControllerPolicy.updatePostData,
        PostController.updatePostData
    );

    app.delete('/board',
        PostControllerPolicy.deletePostData,
        PostController.deletePostData
    );

    app.get('/board/:board_id', 
        BoardController.indexBoard
    );

    app.get('/favorite', 
        PostControllerPolicy.fetchPostData,
        PostController.fetchPostData
    );

    app.post('/favorite', 
        PostControllerPolicy.createPostData,
        PostController.createPostData
    );

    app.delete('/favorite', 
        PostControllerPolicy.deletePostData,
        PostController.deletePostData
    );

    app.post('/list', 
        PostControllerPolicy.createPostData,
        PostController.createPostData
    );   

    app.patch('/list', 
        PostControllerPolicy.updatePostData,
        PostController.updatePostData
    );   

    app.delete('/list', 
        PostControllerPolicy.deletePostData,
        PostController.deletePostData
    );   

    app.get('/card', 
        PostControllerPolicy.fetchPostData,
        PostController.fetchPostData
    );   

    app.post('/card', 
        PostControllerPolicy.createPostData,
        PostController.createPostData
    );   

    app.patch('/card', 
        PostControllerPolicy.updatePostData,
        PostController.updatePostData
    );   

    app.delete('/card', 
        PostControllerPolicy.deletePostData,
        PostController.deletePostData
    );   
};
const AuthController = require('../controller/AuthController');
const PostController = require('../controller/PostController');
const AuthControllerPolicy = require('../policies/AuthControllerPolicy');
const PostControllerPolicy = require('../policies/PostControllerPolicy');

module.exports = (app) => {
    /* Auth */
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

    /* Board */
    app.get('/board/:id', 
        PostControllerPolicy.fetchPostData,
        PostController.fetchPostData
    );
    
    app.get('/boards/:username', 
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

    app.delete('/board/:id',
        PostControllerPolicy.deletePostData,
        PostController.deletePostData
    );


    /* Favorite */
    app.get('/favorite/:id', 
        PostControllerPolicy.fetchPostData,
        PostController.fetchPostData
    );

    app.post('/favorite', 
        PostControllerPolicy.createPostData,
        PostController.createPostData
    );

    app.delete('/favorite/:id', 
        PostControllerPolicy.deletePostData,
        PostController.deletePostData
    );

    /* List */
    app.post('/list', 
        PostControllerPolicy.createPostData,
        PostController.createPostData
    );   

    app.patch('/list', 
        PostControllerPolicy.updatePostData,
        PostController.updatePostData
    );   

    app.delete('/list/:id', 
        PostControllerPolicy.deletePostData,
        PostController.deletePostData
    );   

    /* Card */
    app.get('/card/:id', 
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

    app.delete('/card/:id', 
        PostControllerPolicy.deletePostData,
        PostController.deletePostData
    );   
};
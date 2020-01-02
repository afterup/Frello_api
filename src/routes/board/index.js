const PostController = require('../../controller/PostController');
const PostControllerPolicy = require('../../policies/PostControllerPolicy');

module.exports = (app) => {
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
};
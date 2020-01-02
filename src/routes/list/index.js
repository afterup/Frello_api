const PostController = require('../../controller/PostController');
const PostControllerPolicy = require('../../policies/PostControllerPolicy');

module.exports = (app) => {
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
};
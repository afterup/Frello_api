const PostController = require('../../controller/PostController');
const PostControllerPolicy = require('../../policies/PostControllerPolicy');

module.exports = (app) => {
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


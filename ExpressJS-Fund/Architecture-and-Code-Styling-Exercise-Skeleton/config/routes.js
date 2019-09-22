const controllers = require('../controllers/index');
const restrictedPages = require('../config/auth');

module.exports = (app) => {

    app.get('/', controllers.homeController.index);
    app.get('/user/register', restrictedPages.isAnonymous, controllers.userController.registerGet);
    app.post('/user/register', restrictedPages.isAnonymous, controllers.userController.registerPost);
    app.get('/user/login', restrictedPages.isAnonymous, controllers.userController.loginGet);
    app.post('/user/login', restrictedPages.isAnonymous, controllers.userController.loginPost);
    app.get('/user/logout', restrictedPages.isAuthed, controllers.userController.logout);
    //TODO Add other app routes and restrict certain pages using auth.js

    // Article routes
    app.get('/article/create', restrictedPages.isAuthed, controllers.articleController.createGet);
    app.post('/article/create', restrictedPages.isAuthed, controllers.articleController.createPost);
    app.get('/article/details/:articleId', controllers.articleController.details);
    // TODO: add check if author
    app.get('/article/edit/:articleId', controllers.articleController.editGet);
    app.post('/article/edit/:articleId', controllers.articleController.editPost);
    app.get('/article/delete/:articleId', controllers.articleController.deleteGet);
    app.post('/article/delete/:articleId', controllers.articleController.deletePost);
};


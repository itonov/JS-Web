const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/register', restrictedPages.isAnonymous, controllers.user.registerPost);
    app.get('/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/login', restrictedPages.isAnonymous, controllers.user.loginPost);
    app.post('/logout', restrictedPages.isAuthed, controllers.user.logout);
    app.get('/profile', restrictedPages.isAuthed, controllers.user.profile);
    app.post('/leave/:teamId', restrictedPages.isAuthed, controllers.user.leaveTeam);

    // team routes
    app.get('/team/all', restrictedPages.isAuthed, controllers.team.viewAllGet);
    app.post('/team/all', restrictedPages.isAuthed, controllers.team.viewAllPost);
    app.get('/team/create', restrictedPages.hasRole('Admin'), controllers.team.createGet);
    app.post('/team/create', restrictedPages.hasRole('Admin'), controllers.team.createPost);

    // project routes
    app.get('/project/all', restrictedPages.isAuthed, controllers.project.viewAllGet);
    app.post('/project/all', restrictedPages.isAuthed, controllers.project.viewAllPost);
    app.get('/project/create', restrictedPages.hasRole('Admin'), controllers.project.createGet);
    app.post('/project/create', restrictedPages.hasRole('Admin'), controllers.project.createPost);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
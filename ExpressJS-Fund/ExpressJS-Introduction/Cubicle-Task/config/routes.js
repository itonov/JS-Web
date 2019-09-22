const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');

module.exports = app => {
    app.get('/', homeController.homeGet);
    app.get('/create', cubeController.createGet);
    app.post('/create', cubeController.createPost);
};
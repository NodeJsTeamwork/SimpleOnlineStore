var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.createUser);

    app.post('/login', auth.login);
    app.get('/logout', auth.logout);
    app.get('/login', controllers.users.getLogin);

    app.get('/products/admin/add', controllers.products.getAdd);
    app.post('/products/admin/add', controllers.products.createProduct);
    app.get('/products/admin/my', controllers.products.getProductsByUser);
    
    app.get('/live-chat', controllers.liveChat.getChat);
    
    app.get('/profile', controllers.users.getProfile);
    app.post('/profile', controllers.users.updateUser);

    app.get('/', function (req, res) {
      res.render('index', {currentUser: req.user});
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
}

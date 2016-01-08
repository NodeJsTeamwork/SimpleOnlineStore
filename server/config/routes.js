var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.createUser);

    app.post('/login', auth.login);
    app.get('/logout', auth.logout);
    app.get('/login', controllers.users.getLogin);

    app.get('/admin/products/add', controllers.products.getAdd);
    app.post('/admin/products/add', controllers.products.createProduct);
    app.get('/admin/products/my', controllers.products.getProductsByUser);
    
    app.get('/admin/users', controllers.users.getAll);
    
    app.get('/live-chat', controllers.liveChat.getChat);
    
    app.get('/profile', controllers.users.getProfile);
    app.get('/admin/profile', controllers.users.getProfileByAdmin);
    app.post('/profile', controllers.users.updateUser);

    app.get('/', function (req, res) {
      res.render('index', {currentUser: req.user});
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
}

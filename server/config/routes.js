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
    app.get('/admin/users', controllers.users.getAll);
    app.get('/admin/profile', controllers.users.getProfileByAdmin);

    app.get('/cart/remove', controllers.products.removeFromCart);
    app.get('/cart/add', controllers.users.getAddCartConfirmation);
    app.get('/cart', controllers.users.getCart);
    
    app.get('/checkout', controllers.users.getCheckout);
    
    app.get('/products', controllers.products.getProducts);
    
    app.get('/live-chat', controllers.liveChat.getChat);
    
    app.get('/profile', controllers.users.getProfile);
    app.post('/profile', controllers.users.updateUser);
    
    app.post('/admin/cart/add', controllers.users.addItemToCart);
    app.post('/admin/cart/remove', controllers.users.removeItemFromCart);

    app.get('/', function (req, res) {
      res.render('index', {currentUser: req.user});
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
}

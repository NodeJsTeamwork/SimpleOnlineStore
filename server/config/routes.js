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

    app.post('/cart/add', controllers.users.addItemToCart);
    app.post('/cart/remove', controllers.users.removeItemFromCart);
    app.get('/cart/remove/:id', controllers.users.removeFromCart);
    app.get('/cart', controllers.users.getCart);
    
    app.get('/checkout', controllers.orders.getCheckout);
    app.get('/orders',controllers.orders.getOrders);
    app.get('/order/:id',controllers.orders.getOrderDetails);
    app.post('/orders',controllers.orders.createOrder);

    app.get('/product/:id', controllers.products.getProductDetails);
    app.get('/products', controllers.products.getProducts);
    
    app.get('/live-chat', controllers.liveChat.getChat);
    
    app.get('/profile', controllers.users.getProfile);
    app.post('/profile', controllers.users.updateUser);

    app.get('/', controllers.home.getHome);
    
    app.get('*', controllers.home.getHome);
};

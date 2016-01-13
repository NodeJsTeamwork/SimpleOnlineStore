module.exports = function (usersData, ordersData) {
    var controller = {
        getCheckout: function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            else {
                usersData.getUserByIdWithCart(req.user._id, function (err, user) {
                    if (err) {
                        console.log('Users could not be loaded: ' + err);
                    }
                    var cart = user.cart;
                    cart['sum'] = user.calculateCartSum(cart);
                    res.render('orders/checkout', { currentUser: req.user, cart: cart });
                });
            }
        },
        createOrder: function (req, res, next) {
            var newOrderData = req.body;
            newOrderData.user = req.user._id;
            newOrderData.products = req.user.cart;
            usersData.getUserByIdWithCart(req.user._id, function (err, user) {
                if (err) {
                    console.log('Users could not be loaded: ' + err);
                }
                var cart = user.cart;
                newOrderData.price = user.calculateCartSum(cart);
                ordersData.createOrder(newOrderData, function (err, order) {
                    if (err) {
                        req.session.error = 'Unable to create and order';
                        res.redirect('/checkout', { currentUser: req.user });
                        return;
                    }

                    debugger;
                    usersData.updateUser({ _id: req.user._id }, { $push: { "orders": order._id } }, function (err, user) {
                        if (err) {
                            console.log("ERROR", err);
                            req.session.error = 'Unable to add order';
                        }
                        console.log('Updated!!!', user);
                    });
                    usersData.updateUser({ _id: req.user._id }, {
                        $push: {
                            "cart": {
                                '$each': [],
                                '$slice': 0
                            }
                        }
                    }, function (err, user) {
                        if (err) {
                            console.log("ERROR", err);
                            req.session.error = 'Unable to clear cart';
                        }
                        console.log('Updated!!!', user);
                        res.redirect('/');
                    });
                });
            });
        },
        getOrders: function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            } else {
                usersData.getUserByIdWithOrder(req.user._id, function (err, user) {
                    if (err) {
                        console.log('Users could not be loaded: ' + err);
                    }
                    var orders = user.orders;
                    res.render('orders/orders', { currentUser: req.user, orders: orders });
                });
            }
        },
        getOrderDetails: function (req, res, next) {
            res.render('orders/orderDetails');
        }
    };
    
    return controller;
};

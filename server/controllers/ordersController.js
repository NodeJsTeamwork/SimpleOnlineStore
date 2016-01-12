var encryption = require('../utilities/cripto'),
    ordersData = require('../data/ordersData'),
    usersData = require('../data/usersData'),
    User = require('mongoose').model('User');

module.exports = {
    getCheckout: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            User.findById({_id: req.user._id})
                .populate('cart')
                .exec(function (err, user) {
                    if (err) {
                        console.log('Users could not be loaded: ' + err);
                    }
                    var sum = user.calculateCartSum(user.cart);
                    res.render('checkout/checkout', {currentUser: req.user, sum: sum});
                });
        }
    },
    createOrder: function (req, res, next) {
        var newOrderData = req.body;
        newOrderData.user = req.user._id;
        newOrderData.products = req.user.cart;
        ordersData.createOrder(newOrderData, function (err, order) {
            if (err) {
                req.session.error = 'Unable to create and order';
                res.redirect('/checkout', {currentUser: req.user});
                return;
            }

            debugger;
            usersData.updateUser({_id: req.user._id}, {$push: {"orders": order._id}}, function (err, user) {
                if (err) {
                    console.log("ERROR", err);
                    req.session.error = 'Unable to add order';
                }
                console.log('Updated!!!', user);

                res.redirect('/');
            });
            usersData.updateUser({_id: req.user._id}, {
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
        })
    }
};

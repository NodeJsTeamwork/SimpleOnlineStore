module.exports = function (usersData, productsData) {
    var contoller = {
        getCart: function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            else {
                usersData.getUserByIdWithCart(req.user._id, function (err, user) {
                    if (err) {
                        console.log('Users could not be loaded: ' + err);
                    }
                    var cart = user.cart;
                    cart['total'] = user.calculateCartSum(cart);
                    res.render('cart/cart', { currentUser: req.user, cart: cart });
                });
            }
        },
        addItemToCart: function (req, res, next) {
            var newProductData = req.body;
            newProductData.user = req.user._id;
            usersData.updateUser({ _id: req.user._id }, { $push: { cart: newProductData.itemId } }, function (err, user) {
                if (err) {
                    console.log("ERROR", err);
                    req.session.error = 'Unable to add to cart';
                    return;
                }
                res.redirect('/cart');
            });
        },
        removeItemFromCart: function (req, res, next) {
            var newProductData = req.body;
            newProductData.user = req.user._id;
            usersData.updateUser({ _id: req.user._id }, { $pull: { cart: newProductData.itemId } }, function (err, user) {
                if (err) {
                    console.log("ERROR", err);
                    req.session.error = 'Unable to remove product';
                    return;
                }
                res.redirect('/cart');
            });
        },
        removeFromCart: function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            } else {
                var product = req.params.id ? { id: req.params.id } : {};
                productsData.getProductById(product.id, function (err, product) {
                    if (err) {
                        console.log('Product could not be loaded: ' + err);
                        return;
                    }
                    res.render('products/productDetails', { currentUser: req.user, product: product, inCart: true });
                });
            }
        }
    };

    return contoller;
};

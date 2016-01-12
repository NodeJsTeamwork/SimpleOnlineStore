var encryption = require('../utilities/cripto'),
    usersData = require('../data/usersData'),
    productsData = require('../data/productsData'),
    User = require('mongoose').model('User');

module.exports = {
    getRegister: function (req, res, next) {
        if (req.user) {
            res.redirect('/');
        }

        else {
            res.render('users/register');
        }
    },
    createUser: function (req, res, next) {
        var newUserData = req.body;

        if (newUserData.password !== newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        }

        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            usersData.createUser(newUserData, function (err, user) {
                if (err) {
                    req.session.error = 'Username exists!';
                    res.redirect('/register');
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()});
                    }

                    else {
                        res.redirect('/');
                    }
                });
            });
        }
    },
    updateUser: function (req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            if (updatedUserData.password !== updatedUserData.confirmPassword) {
                req.session.error = 'Passwords do not match!';
                res.redirect('/profile');
            } else {
                usersData.updateUser({_id: req.body._id}, updatedUserData, function (err, user) {
                    res.redirect('/profile');
                })
            }
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    getLogin: function (req, res, next) {
        if (req.user) {
            res.redirect('/');
        }
        else {
            res.render('users/login');
        }
    },
    getProfile: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            res.render('profile/profile', {currentUser: req.user, userToUpdate: req.user});
        }
    },
    getAll: function (req, res, next) {
        var page = req.query.page ? req.query.page : 1;
        var limit = req.query.pageSize ? req.query.pageSize : 10;
        var sortBy = {};
        var type = req.query.type;

        if (req.query.sortBy) {
            sortBy[req.query.sortBy] = type;
        }

        User.paginate({}, {page: page, limit: limit, sort: sortBy}, function (err, result) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.render('users/users', {currentUser: req.user, users: result.docs});
        })
    },
    getProfileByAdmin: function (req, res, next) {
        var userId = req.query.id;
        if (!userId) {
            res.redirect('/');
        }

        User.findById(userId, function (err, user) {
            if (err) {
                console.log('User could not be loaded: ' + err);
                req.session.error = 'User with this id does not exist';
                res.redirect('/');
            }

            res.render('profile/profile', {currentUser: req.user, userToUpdate: user});
        });
    },
    getCart: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            User.findById({_id: req.user._id})
                .populate('cart')
                .exec(function (err, user) {
                    if (err) {
                        console.log('Users could not be loaded: ' + err);
                    }
                    var cart= user.cart;
                    cart['total'] = user.calculateCartSum(cart);
                    res.render('cart/cart', {currentUser: req.user, cart: cart});
                });
        }
    },
    addItemToCart: function (req, res, next) {
        var newProductData = req.body;
        newProductData.user = req.user._id;
        usersData.updateUser({_id: req.user._id}, {$push: {"cart": newProductData.itemId}}, function (err, user) {
            if (err) {
                console.log("ERROR", err);
                req.session.error = 'Unable to add to cart';
            }
            console.log('Updated!!!', user);
            res.redirect('/cart');
        });
    },
    removeItemFromCart: function (req, res, next) {
        var newProductData = req.body;
        newProductData.user = req.user._id;
        usersData.updateUser({_id: req.user._id}, {$pop: {"cart": newProductData.itemId}}, function (err, user) {
            if (err) {
                console.log("ERROR", err);
                req.session.error = 'Unable to remove product';
            }
            console.log('Updated!!!', user);
            res.redirect('/cart');
        });
    },
    removeFromCart: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            var product = req.query.itemId ? {id: req.query.itemId} : {};
            productsData.getProductById(product.id, function (err, product) {
                if (err) {
                    console.log('Product could not be loaded: ' + err);
                }
                var collection = [product];
                res.render('cart/productDetails', {currentUser: req.user, collection: collection, inCart:true});
            });
        }
    }
};

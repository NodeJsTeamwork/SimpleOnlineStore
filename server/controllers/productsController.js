var productsData = require('../data/productsData'),
    User = require('mongoose').model('User'),
    Product = require('mongoose').model('Product'),
    usersData = require('../data/usersData'),
    mongoosePaginate = require('mongoose-paginate');

module.exports = {
    getAdd: function (req, res, next) {
        res.render('products/add', {currentUser: req.user});
    },
    createProduct: function (req, res, next) {
        var newProductData = req.body;
        newProductData.user = req.user._id;
        productsData.createProduct(newProductData, function (err, product) {
            if (err) {
                req.session.error = 'Unable to add product';
                res.redirect('/products/add', {currentUser: req.user});
                return;
            }

            debugger;
            usersData.updateUser({_id: req.user._id}, {$push: {"products": product._id}}, function (err, user) {
                if (err) {
                    console.log("ERROR", err);
                    req.session.error = 'Unable to add product';
                }
                console.log('Updated!!!', user);

                res.redirect('/');
            });

        })
    },
    getProducts: function (req, res, next) {
        var customQuery = req.query.userId ? {user: req.query.userId} : {};
        
        if (req.query.category) {
            customQuery['category'] = req.query.category;
        }
       
        var page = req.query.page ? req.query.page : 1;
        var limit = req.query.pageSize ? req.query.pageSize : 10;
        var sortBy = {};
        var type = req.query.type;

        if (req.query.sortBy) {
            sortBy[req.query.sortBy] = type;
        }

        Product.paginate(customQuery, {page: page, limit: limit, sort: sortBy}, function (err, result) {
            if (err) {
                console.log('Products could not be loaded: ' + err);
            }

            res.render('products/products', {currentUser: req.user, collection: result.docs, type: 'Product'});
        })
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
                res.render('cart/removeFromCart', {currentUser: req.user, collection: collection});
            });
        }
    }
};
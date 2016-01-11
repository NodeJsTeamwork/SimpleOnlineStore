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
        var userQuery = req.query.userId ? {user: req.query.userId} : {};
        var page = req.query.page ? req.query.page : 1;
        var limit = req.query.pageSize ? req.query.pageSize : 10;
        var sortBy = {};
        var type = req.query.type;

        if (req.query.sortBy) {
            sortBy[req.query.sortBy] = type;
        }

        Product.paginate(userQuery, {page: page, limit: limit, sort: sortBy}, function (err, result) {
            if (err) {
                console.log('Products could not be loaded: ' + err);
            }

            res.render('products/products', {currentUser: req.user, collection: result.docs, type: 'Product'});
        })
    },
    getSpecificProducts: function (req, res, next) {
        var userQuery = req.query.userId ? {user: req.query.userId} : {};
        
        // if there is a query string substring the url before the '?' symbol
        // if there is no query string substing the url to the ulr.length
        var queryStringStart = req.url.indexOf('?');
        queryStringStart == -1 ? queryStringStart = req.url.length : queryStringStart;
        var specificProductType = req.url.substring(10, queryStringStart).toLowerCase();
        
        // if the product type is not chairs, tables or cabinets -> redirect
        if (specificProductType !== 'chairs' && specificProductType !== 'tables'
            && specificProductType !== 'cabinets') {
            
            res.redirect('/');
            return;
        }
        
        // make the first letter uppercase and cut the last letter (e.g. chairs -> Chair)
        specificProductType = specificProductType.slice(0, -1);
        specificProductType = specificProductType.charAt(0).toUpperCase() + specificProductType.slice(1);
        
        // add the category field to the seach query
        userQuery.category = specificProductType;
        
        var page = req.query.page ? req.query.page : 1;
        var limit = req.query.pageSize ? req.query.pageSize : 10;
        var sortBy = {};
        var type = req.query.type;

        if (req.query.sortBy) {
            sortBy[req.query.sortBy] = type;
        }

        Product.paginate(userQuery, {page: page, limit: limit, sort: sortBy}, function (err, result) {
            if (err) {
                console.log('Products could not be loaded: ' + err);
            }

            res.render('products/products', {currentUser: req.user, collection: result.docs, type: specificProductType});
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
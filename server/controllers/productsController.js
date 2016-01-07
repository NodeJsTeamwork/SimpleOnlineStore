var productsData = require('../data/productsData'),
	Product = require('mongoose').model('Product');

module.exports = {
	getAdd: function (req, res, next) {
		res.render('products/add');
	},
	createProduct: function (req, res, next) {
		var newProductData = req.body;
		newProductData.user = req.user._id;
		productsData.createProduct(newProductData, function(err) {
			if (err) {
				req.session.error = 'Unable to add product';
                res.redirect('/products/add');
                return;
			}

			res.redirect('/');			
		})
	},
	getProductsByUser: function(req, res, next) {
        Product.find({user: req.user._id}).exec(function(err, collection) {
            if (err) {
                console.log('Products could not be loaded: ' + err);
            };

            res.render('products/products', {currentUser: req.user, collection: collection});
        })
    }
};
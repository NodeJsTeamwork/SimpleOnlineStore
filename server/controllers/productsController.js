var productsData = require('../data/productsData'),
	User = require('mongoose').model('User'),
	usersData = require('../data/usersData');

module.exports = {
	getAdd: function (req, res, next) {
		res.render('products/add', {currentUser: req.user});
	},
	createProduct: function (req, res, next) {
		var newProductData = req.body;
		newProductData.user = req.user._id;
		productsData.createProduct(newProductData, function(err, product) {
			if (err) {
				req.session.error = 'Unable to add product';
                res.redirect('/products/add', {currentUser: req.user});
                return;
			};

            debugger;
			usersData.updateUser({_id:req.user._id}, {$push: {"products": product._id}}, function (err, user) {
				if (err) {
					console.log("ERROR", err)
                    req.session.error = 'Unable to add product';
                }
                console.log('Updated!!!', user);
				
				res.redirect('/');			
			});

		})
	},
	getProductsByUser: function(req, res, next) {
        User.findById(req.user._id).populate('products').exec(function(err, user) {
            if (err) {
                console.log('Products could not be loaded: ' + err);
            };
            
            res.render('products/products', {currentUser: req.user, collection: user.products});
        })
    }
};
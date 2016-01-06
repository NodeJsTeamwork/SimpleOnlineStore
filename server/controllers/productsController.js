var productsData = require('../data/productsData');

module.exports = {
	getAdd: function (req, res, next) {
		res.render('products/add');
	},
	createProduct: function (req, res, next) {
		var newProductData = req.body;
		productsData.createProduct(newProductData, function(err) {
			if (err) {
				req.session.error = 'Unable to add product';
                res.redirect('/products/add');
                return;
			}

			res.redirect('/');			
		})
	}
};
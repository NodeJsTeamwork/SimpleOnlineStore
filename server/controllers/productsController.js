var productsData = require('../data/productsData');

module.exports = {
	getAdd: function (req, res, next) {
		res.render('products/add');
	}
};
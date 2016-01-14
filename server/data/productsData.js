var Product = require('mongoose').model('Product');

module.exports = {
    createProduct: function (product, callback) {
        Product.create(product, callback);
    },
    getLatestProducts: function (callback) {
        Product.paginate({}, {page: 1, limit: 10}, callback);
    },
    getProductById: function (id, callback) {
        Product.findById({_id: id}, callback);
    },
    getPagedProducts: function (customQuery, pagingQuery, callback) {
        Product.paginate(customQuery, pagingQuery, callback);
    }
};

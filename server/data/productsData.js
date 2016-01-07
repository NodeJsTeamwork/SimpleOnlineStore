var Product = require('mongoose').model('Product');

module.exports = {
  createProduct: function (product, callback) {
    Product.create(product, callback);
  }
};

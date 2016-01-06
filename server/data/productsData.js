var Product = require('mongoose').model('Product');

module.exports = {
  createProduct: function (user, callback) {
    Product.create(product, callback);
  }
};

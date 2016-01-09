var Product = require('mongoose').model('Product');

module.exports = {
  createProduct: function (product, callback) {
    Product.create(product, callback);
  },
  getLatestProducts: function (callback) {
      Product.find()
      // the sort parameter will be dateOfCreation or rating
             .sort('name')
             .limit(10)
             .exec(callback);
  }
};

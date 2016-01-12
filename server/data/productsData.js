var mongoose=require('mongoose'),
    Product = mongoose.model('Product');

module.exports = {
  createProduct: function (product, callback) {
    Product.create(product, callback);
  },
  getLatestProducts: function (callback) {
      Product.paginate({}, {page: 1, limit: 10}, callback);
  },
  getProductById: function(id, callback){
    var idToSearch=mongoose.Types.ObjectId(id);
    Product.findById(idToSearch, callback);
  }
};

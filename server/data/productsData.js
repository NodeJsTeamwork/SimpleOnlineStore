var mongoose=require('mongoose'),
    Product = mongoose.model('Product');

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
  },
  getProductById: function(id, callback){
    var idToSearch=mongoose.Types.ObjectId(id);
    Product.findById(idToSearch, callback);
  }
};

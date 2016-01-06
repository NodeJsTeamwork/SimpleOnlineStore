var mongoose = require('mongoose');

module.exports.init = function () {
  var productSchema = mongoose.Schema({
      category: String,
      name: String,
      description: String,
      price: Number,
      timesBought: Number
  });

  var Product = mongoose.model('Product', productSchema);
};

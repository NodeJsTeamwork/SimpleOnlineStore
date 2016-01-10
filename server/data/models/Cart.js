var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

module.exports.init = function () {
    var productSchema = new mongoose.Schema({
        price: Number,
        products: [],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    });

    productSchema.plugin(mongoosePaginate);

    var Product = mongoose.model('Product', productSchema);
};

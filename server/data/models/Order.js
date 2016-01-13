var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

module.exports.init = function () {
    var orderSchema = new mongoose.Schema({
        purchased: {type: Date, default: Date.now},
        price: Number,
        address: String,
        products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    });

    orderSchema.plugin(mongoosePaginate);

    var Order = mongoose.model('Order', orderSchema);
};

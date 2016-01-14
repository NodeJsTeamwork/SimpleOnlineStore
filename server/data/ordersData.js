var Order = require('mongoose').model('Order');

module.exports = {
    createOrder: function (user, callback) {
        Order.create(user, callback);
    },
    getOrderById: function(id, callback){
        Order.findById({_id: id}, callback);
    },
    getOrderByIdWithProducts: function (id, callback) {
        Order.findById({_id: id})
            .populate('products')
            .exec(callback);
    }
};

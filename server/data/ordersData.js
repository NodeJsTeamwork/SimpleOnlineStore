var Order = require('mongoose').model('Order');

module.exports = {
    createOrder: function (user, callback) {
        Order.create(user, callback);
    }
};

var mongoose = require('mongoose'),
  UserModel = require('../data/models/User'),
  ProductModel = require('../data/models/Product'),
  OrderModel = require('../data/models/Order'),
  MessageModel = require('../data/models/Message');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    ProductModel.init();
    OrderModel.init();
    UserModel.init();
    MessageModel.init();
};

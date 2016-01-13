var encryption = require('../utilities/cripto'),
    usersData = require('../data/usersData'),
    productsData = require('../data/productsData');

var UsersController = require('./UsersController')(encryption, usersData, productsData);
var ProductsController = require('./ProductsController')(usersData, productsData);
var LiveChatController = require('./LiveChatController');
var OrdersController = require('./OrdersController');
var HomeController = require('./HomeController');

module.exports = {
  users: UsersController,
  products: ProductsController,
  liveChat: LiveChatController,
  orders: OrdersController,
  home: HomeController
};

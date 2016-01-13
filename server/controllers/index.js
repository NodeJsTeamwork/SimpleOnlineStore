var encryption = require('../utilities/cripto'),
    usersData = require('../data/usersData'),
    productsData = require('../data/productsData'),
    messagesData = require('../data/messagesData');

var UsersController = require('./UsersController')(usersData, productsData, encryption);
var ProductsController = require('./ProductsController')(usersData, productsData);
var LiveChatController = require('./LiveChatController')(messagesData);
var OrdersController = require('./OrdersController');
var HomeController = require('./HomeController')(productsData);

module.exports = {
  users: UsersController,
  products: ProductsController,
  liveChat: LiveChatController,
  orders: OrdersController,
  home: HomeController
};

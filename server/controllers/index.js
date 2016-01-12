var UsersController = require('./UsersController');
var ProductsController = require('./ProductsController');
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

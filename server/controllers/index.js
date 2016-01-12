var UsersController = require('./UsersController');
var ProductsController = require('./ProductsController');
var LiveChatController = require('./LiveChatController');
var OrdersController = require('./OrdersController');

module.exports = {
  users: UsersController,
  products: ProductsController,
  liveChat: LiveChatController,
  orders: OrdersController
};

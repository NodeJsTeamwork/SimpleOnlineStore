var UsersController = require('./UsersController');
var ProductsController = require('./ProductsController');
var LiveChatController = require('./LiveChatController');

module.exports = {
  users: UsersController,
  products: ProductsController,
  liveChat: LiveChatController
};

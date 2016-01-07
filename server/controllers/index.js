var UsersController = require('./UsersController');
var ProductsController = require('./ProductsController');
var LiveChatController = require('./LiveChatController');
var ProfileController = require('./ProfileController');

module.exports = {
  users: UsersController,
  products: ProductsController,
  liveChat: LiveChatController,
  profile: ProfileController
};

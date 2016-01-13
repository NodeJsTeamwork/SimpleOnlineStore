var User = require('mongoose').model('User');

module.exports = {
  createUser: function (user, callback) {
    User.create(user, callback);
  },
  
  updateUser: function (query, user, callback) {
      User.update(query, user, callback);
  },
  getPagedUsers: function (query, callback) {
      User.paginate({}, query, callback);
  },
  getUserById: function (id, callback) {
       User.findById(id, callback);
  },
  getUserByIdWithCart: function (id, callback) {
      User.findById({_id: id})
                .populate('cart')
                .exec(callback)
  }
};

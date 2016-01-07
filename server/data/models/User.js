var mongoose = require('mongoose'),
    encryption = require('../../utilities/cripto');

module.exports.init = function () {
  var userSchema = mongoose.Schema({
      username: { type: String, require: '{PATH} is required', unique: true },
      salt: String,
      hashPass: String,
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] ,
      roles: [String]
  });

  userSchema.method({
      authenticate: function(password) {
          if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
              return true;
          }
          else {
              return false;
          }
      }
  })

  var User = mongoose.model('User', userSchema);
};

var mongoose = require('mongoose'),
    encryption = require('../../utilities/cripto'),
    mongoosePaginate = require('mongoose-paginate');

module.exports.init = function () {
  var userSchema = new mongoose.Schema({
      username: { type: String, require: '{PATH} is required', unique: true },
      firstName: String,
      lastName: String,
      phone: String,
      salt: String,
      hashPass: String,
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] ,
      cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] ,
      roles: [String]
  });
  
  userSchema.plugin(mongoosePaginate);

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
  
  User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '1234');
            User.create({username: 'stamat', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            
        }
    });
};

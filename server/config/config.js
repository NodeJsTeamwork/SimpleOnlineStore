var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://stamat:1234@ds037415.mongolab.com:37415/onlinestore',
        port: process.env.PORT || 3030
    }
};

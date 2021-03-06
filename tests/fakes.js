module.exports = {
    cripto: {
        generateSalt: function () {
            return 'FakeSalt';
        },
        generateHashedPassword: function () {
            return 'FakeHash';
        }
    },
    usersData: {
        createUser: function (newUserData, callback) {
            callback();
        },
        updateUser: function (id, newUserData, callback) {
            callback();
        },
        getPagedUsers: function (query, callback) {
            var results = {
                docs: []
            }
            callback(null, results);
        },
        getUserById: function (userId, callback) {
            var user = {
                _id: 5
            }
            callback(null, user);
        },
        getUserByIdWithCart: function (userId, callback) {
            var user = {
                cart: {},
                calculateCartSum: function () {
                    return 5;
                }
            }
            callback(null, user);
        },
        getUsersByIdWithOrder: function () { }
    },
    productsData: {
        createProduct: function (product, callback) {
            var createdProduct = {};
            callback(null, createdProduct);
        },
        getLatestProducts: function (callback) {
            var latestProducts = {
                docs: [
                    {
                        id: 1
                    },
                    {
                        id: 2
                    }
                ]
            };

            callback(null, latestProducts);
        },
        getProductById: function (productId, callback) {
            var product = {};
            callback(null, product);
        },
        getPagedProducts: function (customQuery, query, callback) {
            var results = {
                docs: []
            }
            callback(null, results);
        }
    },
    messagesData: {
        getAllMessages: function(callback) {
            var messages = [1, 2, 3];
            callback(null, messages);
        }
    }

};
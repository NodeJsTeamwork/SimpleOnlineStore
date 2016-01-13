module.exports = function (productsData) {
    var controller = {
        getHome: function (req, res, next) {
            productsData.getLatestProducts(function (err, result) {
                if (err) {
                    console.log('Products could not be loaded: ' + err);
                }

                res.render('index', { currentUser: req.user, collection: result.docs.reverse() });
            })
        }
    };
    
    return controller;
};
module.exports = {
    getProfile: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }

        else {
            res.render('profile/profile', { currentUser: req.user });
        }
    }
}
module.exports = {
	getChat: function (req, res, next) {
		res.render('live-chat/live-chat', {currentUser: req.user});
	}
}
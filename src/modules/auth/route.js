var express = require('express');
var router = express.Router();
var Ctrl = require('./controller');

/**LOGIN**/
router.post('/login', function(req, res) {
	Ctrl.login(req,res);
});
/**NEW USER**/
router.post('/signup', function(req, res) {
	Ctrl.signup(req,res);
});

module.exports = router;
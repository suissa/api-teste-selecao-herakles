var express = require('express');
var router = express.Router();
var Ctrl = require('./controller');

/**LOGIN**/
router.post('/login', Ctrl.login);
/**NEW USER**/
router.post('/signup', Ctrl.signup);

module.exports = router;
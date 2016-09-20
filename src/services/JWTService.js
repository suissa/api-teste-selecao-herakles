var jwt = require('jsonwebtoken');

var jwtService = function() {
	this.secret = "yabgsiuyagbsiayugsbiuaygsb";
};

jwtService.prototype.generate = function(data) {
	return jwt.sign(data,this.secret);
};

jwtService.prototype.verify = function(data) {
	return jwt.verify(data, this.secret);
};

module.exports = jwtService;
var app = require('express')();
var jwt = new (require('../services/JWTService'))();
var User = require('../models/User');

/**MIDDLEWARE NIVEL MODULE**/
app.use(function(req,res,next) {
	var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        try {
			var decoded = jwt.verify(bearerToken);
			User.findOne({
				where: {
					id:decoded.user.id,
					email:decoded.user.email
				}
			}).then(function(result) {
				if (!result) res.json({'error':'Não autorizado!'});
				result.password = null;
				setTimeout(function(){
					req.user = result;
					next()
				},100);
			});
		} catch(err) {
			res.json({'error':'Não autorizado!'});
		}
    } else {
        res.json({'error':'Não autorizado!'});
    }
});

app.use('/users',require('../modules/user/route'));
app.use('/postits',require('../modules/postit/route'));

module.exports = app;
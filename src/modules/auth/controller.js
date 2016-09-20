var Model = require('../../models/User');
var bcrypt = require('bcrypt');
var Q = require('q');
var jwt = new (require('../../services/JWTService'))();
var UserController = require('../user/controller');

module.exports = {

	verify:function(req,res) {
		try {
			res.json(jwt.verify(req.body.token));
		} catch(err) {
			res.json(err);
		}
	},

	index:function(req,res) {
		res.json(jwt.generate({user:'teste'}));
	},

	login:function(req, res) {
		var _verify = function() {
			var defer = Q.defer();
			if (req.body.email&&req.body.password) {
				defer.resolve(req.body);
			} else {
				defer.reject({error:'Dados Incompletos!'});
			}
			return defer.promise;
		};
		var _email = function(data) {
			var defer = Q.defer();
			Model.findOne({
				where:{
					email:data.email
				}
			}).then(function(result) {
				if(!result) defer.reject({error:"Email Invalido!"});
				defer.resolve({
					data:data,
					result:result
				});
			});
		    return defer.promise;
		};
		var _bcrypt = function(data) {
			var defer = Q.defer();
			bcrypt.compare(data.data.password, data.result.password, function(err, res) {
				if (err) {
					defer.reject({error:'Password Invalido!'});
				} else {
					if (res) {
						data.result.password = null;
						setTimeout(function(){
							defer.resolve(data.result);
						},100);
					} else {
						defer.reject({error:'Password Invalido!'});
					}
				}
			});
			return defer.promise;
		};
		var _token = function(data) {
			var defer = Q.defer();
			defer.resolve(jwt.generate({user:data}));
			return defer.promise;
		};
		var processes = [
			_verify,
			_email,
			_bcrypt,
			_token
		];
		var getFinalResult = function() {
		    return processes.reduce(function(nextProcess,f) {
		        return nextProcess.then(f);
		    },Q());
		};
		getFinalResult().then(
		    function(response) {
		        res.json(response);
		    },
		    function(error){
		    	res.json({
		    		error:error
		    	});
		    }
		);
	},
	signup:function(req, res) {
		UserController.create(req, res);
	}
};
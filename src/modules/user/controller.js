var Model = require('../../models/User');
var bcrypt = require('bcrypt');
var Q = require('q');

module.exports = {
	paramId:function(req, res, next, id) {
		req.resultparamid = {
			id: id,
			name: '',
			email: ''
		}
		next();
	},
	index:function(req, res) {
		Model.findAll().then(function (users) {
			res.json(users);
		});
	},
	create:function(req, res) {
		var _verify = function() {
			var defer = Q.defer();
			if (req.body.name&&req.body.email&&req.body.password) {
				defer.resolve(req.body);
			} else {
				defer.reject({error:'Dados Incompletos!'});
			}
			return defer.promise;
		};
		var _bcrypt = function(data) {
			var defer = Q.defer();
			bcrypt.hash(data.password,10,function(err,hash) {
				if (err) defer.reject({error:err});
				data.password = hash;
				defer.resolve(data);
			});
			return defer.promise;
		};
		var _insert = function(data) {
			var defer = Q.defer();
			Model.create(data).then(function(result) {
				defer.resolve(result);
			});
		    return defer.promise;
		};
		var processes = [
			_verify,
			_bcrypt,
			_insert
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
	}
};
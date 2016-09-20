var Model = require('../../models/Postit');
var bcrypt = require('bcrypt');
var Q = require('q');

module.exports = {
	paramId:function(req, res, next, id) {
		Model.findOne({
			where: {
				id: id
			}
		}).then(function(result) {
			console.log('ID: '+id+' RESULT: '+result);
			req.resultparam = result;
			next();
		});
	},
	index:function(req, res) {
		Model.findAll().then(function (users) {
			res.json(users);
		});
	},
	create:function(req, res) {
		var _verify = function() {
			var defer = Q.defer();
			if (req.body.description) {
				defer.resolve(req.body);
			} else {
				defer.reject({error:'Dados Incompletos!'});
			}
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
	},
	update:function(req, res) {
		var model = req.resultparam;
		var _verify = function() {
			var defer = Q.defer();
			if (req.body.description) {
				defer.resolve(req.body);
			} else {
				defer.reject({error:'Dados Incompletos!'});
			}
			return defer.promise;
		};
		var _update = function(data) {
			var defer = Q.defer();
			model.update(data,{}).then(function(result) {
				defer.resolve(result);
			});
		    return defer.promise;
		};
		var processes = [
			_verify,
			_update
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
	delete:function(req, res) {
		req.resultparam.destroy().then(function(result) {
			res.json(result);
		});
	},
	byId:function(req, res) {
		res.json(req.resultparam);
	},
	search:function(req, res, search) {
		Model.findAll({
			where: {
				$or:{
					description:{
						$iLike: '%'+search+'%'
					},
					text:{
						$iLike: '%'+search+'%'
					}
				}
			}
		}).then(function(result) {
			res.json(result);
		});
	}
};
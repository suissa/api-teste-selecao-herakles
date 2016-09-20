var express = require('express');
var router = express.Router();
var Ctrl = require('./controller');

// Middleware
router.use(function(req, res, next) {
	next();
});
// Filtrando Parametros
router.param('id', Ctrl.paramId);
// Index
router.get('/', function(req, res) {
	Ctrl.index(req,res);
});
// Create
router.post('/', function(req, res) {
	Ctrl.create(req,res);
});
// Update
router.put('/:id', function(req, res) {
	Ctrl.update(req,res);
});
// Delete
router.delete('/:id', function(req, res) {
	Ctrl.delete(req,res);
});
// By ID
router.get('/:id', function(req, res) {
	Ctrl.byId(req,res);
});
// Search
router.get('/search/:search', function(req, res) {
	Ctrl.search(req,res,req.params.search);
});

module.exports = router;
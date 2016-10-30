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
router.get('/', Ctrl.index);
// Create
router.post('/', Ctrl.create);
// Update
router.put('/:id', Ctrl.update);
// Delete
router.delete('/:id', Ctrl.delete);
// By ID
router.get('/:id', Ctrl.byId);
// Search
router.get('/search/:search', Ctrl.search);

module.exports = router;
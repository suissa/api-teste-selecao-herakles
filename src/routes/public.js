var app = require('express')();

app.get('/',function(req, res) {
	res.json(['Herakles']);
});

app.use('/auth',require('../modules/auth/route'));

module.exports = app;
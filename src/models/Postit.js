var Sequelize = require('sequelize');
var sequelize = require('../config/database.config');

var Postit = sequelize.define('postit', {
	description: Sequelize.STRING,
	text: Sequelize.TEXT
});

Postit.sync();

module.exports = Postit;
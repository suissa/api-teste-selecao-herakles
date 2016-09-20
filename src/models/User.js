var Sequelize = require('sequelize');
var sequelize = require('../config/database.config');

var User = sequelize.define('users', {
	name: Sequelize.STRING,
	email: {
		type:Sequelize.STRING,
		unique: true
	},
	password: Sequelize.STRING
});

User.sync();

module.exports = User;
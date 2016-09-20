var Sequelize = require('sequelize');
var sequelize = require('../config/database.config');
/**setting module**/
var User = sequelize.define('users', {
	name: Sequelize.STRING,
	email: {
		type:Sequelize.STRING,
		unique: true
	},
	password: Sequelize.STRING
});
/**CREATE TABLE**/
User.sync();

module.exports = User;
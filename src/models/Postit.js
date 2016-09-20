var Sequelize = require('sequelize');
var sequelize = require('../config/database.config');
/**setting module**/
var Postit = sequelize.define('postit', {
	description: Sequelize.STRING,
	text: Sequelize.TEXT
});
/**CREATE TABLE**/
Postit.sync();

module.exports = Postit;
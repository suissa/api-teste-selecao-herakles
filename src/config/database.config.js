var Sequelize = require('sequelize');
module.exports = new Sequelize('herakles_selecao', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
});
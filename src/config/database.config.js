var Sequelize = require('sequelize');
/**CONNECTION DATABASE**/

module.exports = new Sequelize('herakles_selecao', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
});

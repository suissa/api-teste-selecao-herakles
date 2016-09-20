var app = require('express')();
var bodyParser = require('body-parser');
var helmet = require('helmet');

/**SET PORT**/
app.set('port', (process.env.PORT || 3000));

/**HELMET**/
app.use(helmet());

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

/**Headers**/
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,JSON,JSONP');
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
	next();
});

/********************************ROUTES********************************/
/**ROUTES PUBLIC**/
app.use('/public',require('./src/routes/public'));
/**ROUTES API**/
app.use('/api',require('./src/routes/api'));

/**INIT SERVER**/
app.listen(app.get('port'),function(){
	console.log('Servidor Rodando! Porta: ' + app.get('port'));
});
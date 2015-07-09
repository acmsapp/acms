var d = require('domain').create();

//Manejando las excepciones/errores del servidor
d.on('error', function (er) {
	var express = require('express'),
	app = express(),
	config = require('./config').init(app),
	db = require('monk')(config.DB_URL);
	console.log('----ERROR----');
	console.error(er.message);
	console.error(er.stack);
	var error = {
		fecha : new Date(),
		mensaje : er.message,
		stack : er.stack
	};
	db.get('LOGERROR').insert(error, function (err) {
		if (err) {
			//Poner error en archivo log-dia
			var fs = require('fs');
			var urlfs = __dirname + "/log/log-" + new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate() + ".txt";
			var txtError = "Date: " + error.fecha + ", Message: " + error.mensaje + ", Stack: " + error.stack + "\n";
			fs.appendFile(urlfs, txtError, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log("The log was saved in " + urlfs);
				}
			});
		}
	});
});

//Configuracion e implementacion del servidor
d.run(function () {
	//Librerias
	var express = require('express');
	var bodyParser = require('body-parser');
	var path = require('path');
	var http = require('http');
	var request = require('request');
	var jwt = require('express-jwt');
	var mail = require('./mail');
	//Aplicacion
	var app = express();
	//Seguimos con la configuracion
	var config = require('./config').init(app);
	mail.init(config);
	//Base de Datos
	var db = require('monk')(config.DB_URL);
	//Variables privadas
	var prefix = '/api';
	var secret = 'asd243131';

	//Configuracion de express
	app.use(bodyParser.json({ limit: '100mb' }));
	app.use(bodyParser.urlencoded({
			extended : true
		}));
	app.use('/api', jwt({
		secret : secret
	}));
	app.use('/', express.static(path.join(__dirname, 'app')));
	app.db = db;

	//Rutas
	
	
	//Configuracion del server
	var puertoHTML = config.APP_PORT;
	//Server HTTP
  http.createServer(app).listen(puertoHTML, function (req, res) {
		console.log('HTTP SERVER: ' + puertoHTML);
	});
});

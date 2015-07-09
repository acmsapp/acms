var config = {
	development : {
		APP_PORT : process.env.PORT || 8080,
		WS_URL: 'http://localhost:7101/AMSolicitud-ws-context-root/resources', //cambiar 192.168.1.84 por la ip de tu computadora
		REP_URL: 'http://localhost:3000/',
		DB_URL: '192.168.1.205:27017/auxmutuo',
		SERVER_URL: 'http://localhost:8080', //cambiar 192.168.1.84 por la ip de tu computadora
		CONFIRM_ACCOUNT_LINK : 'http://192.168.1.20:8080/user/confirm',
		CHANGE_PASSWORD_LINK : 'http://192.168.1.20:8080/#/changepassword',
		MAIL_USR : 'finanzas@simetricaconsulting.com',
		MAIL_PASS : 'Web#8094722300',
		MAIL:{
			MAIL_USR: 'medicalcore@simetricaconsulting.com',
			MAIL_PASS: 'Web#8094722300',
			ACTIVAR_SUBJECT: 'Activar cuenta Auxilio Mutuo',
			FORGOT_SUBJECT: 'Cambiar Contraseña Auxilio Mutuo',
			REPORT_SUBJECT: 'Reporte'
		}
		
	},
	testing : {
		APP_PORT : process.env.PORT || 8080,
		WS_URL: 'http://192.168.1.20:7101/AMSolicitud-ws-context-root/resources',
		REP_URL: 'http://testing.simetricaconsulting.net:3000/',
		DB_URL: '192.168.1.205:27017/auxmutuo',
		SERVER_URL: 'http://testing.simetricaconsulting.net:8080',
		MAIL:{
			USER: 'medicalcore@simetricaconsulting.com',
			PASS: 'Web#8094722300',
			ACTIVAR_SUBJECT: 'Activar cuenta Auxilio Mutuo',
			FORGOT_SUBJECT: 'Cambiar Contraseña Auxilio Mutuo',
			REPORT_SUBJECT: 'Reporte'
		}
		
	}
}
var mode;
function getEnv() {
	var mde = mode || 'development';
	return config[mde];
}
function init(app) {
	mode = app.get('env');
	return config[mode];
}
exports.getEnv = getEnv;
exports.init = init;

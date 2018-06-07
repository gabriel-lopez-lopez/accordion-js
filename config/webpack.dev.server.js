/** 
 * Archivo de configuración para el servidor de desarrollo de Webpack
 * 
 */

// Dependencias
const path = require('path');
const webpack = require('webpack');

// Configuración de rutas de directorios y archivos
const appPaths = require('./paths');

// Proxy middleware
const { prepareProxy } = require('./proxy');
// Configuración del proxy establecida en el archivo package.json
const proxySetting = require(appPaths.packageJson).proxy;
// Configuración final del Proxy para el servidor de desarrollo de Webpack
const webPackDevServerProxy = prepareProxy(proxySetting, appPaths.dirPublic);

console.log();
console.log('webPackDevServerProxy', webPackDevServerProxy);
console.log();
console.log('process.env.HTTPS:', process.env.HTTPS);
console.log('process.env.HOST:', process.env.HOST);
console.log('process.env.PORT:', process.env.PORT);
console.log();

// Configuración Servidor de desarrollo
const devServer = {
	// Habilita HTTPS si la variable de entorno HTTPS se ha establecido a verdadero
	https: process.env.HTTPS === 'true' ? true : false,
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 3001,
	// Para que las rutas sean del tipo http://localhost:8080/ruta y no http://localhost:8080/#/ruta
    historyApiFallback: true, // verdadero para indext.html sobre 404. Objeto para múltiples rutas
	compress: true,
	stats: 'minimal',
	// HMR (Hot Module Replacement). Depende de webpack.HotModuleReplacementPlugin
	hot: true,
	// Este parámetro habilita que el servidor de desarrollo habra el navegador 
	open: true,
	// Proxy
	proxy: webPackDevServerProxy,
	// Webpack utiliza el sistema de archivos para recibir notificaciones de cambios de archivos
	watchOptions: {
		ignored: /node_modules/
	}
};

module.exports = devServer;
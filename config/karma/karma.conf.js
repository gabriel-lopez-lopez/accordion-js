/**
 * Karma configuration
 *
 */

const fs = require('fs');
const path = require('path');
const appPaths = require('../paths');

// Directorio principal de la aplicación
const appDirectory = fs.realpathSync(process.cwd());
// Resuelve una ruta relativa en absoluta con relación al directorio principal de la aplicación
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// Entorno de desarrollo
process.env.NODE_ENV = 'test';

// Cobertura del código
const coverage = process.env.COVERAGE === 'true';

// Configuración de webpack
const webpackConfig = require(resolveApp('./config/webpack.development.js'));

// Preprocesador
const preprocessor = ['webpack'];

// Informes
const reporters = (() => {
	// Posibles valores: dots, progress
	const reporters = ['progress'];
	// Si se ejecuta la cobertura del código
	if (coverage) {
		reporters.push('coverage');
		preprocessor.push('coverage');
	}
	return reporters;
})();

console.log();
console.log('KARMA coverage:', coverage);
console.log('KARMA reporters:', reporters);
console.log();

module.exports = (config) => {

	config.set({


		basePath: path.resolve(appDirectory),


		frameworks: ['mocha', 'chai-dom', 'chai', 'chai-http', 'sinon'],


		files: [
			'test/karma/*.test.js'
		],


		preprocessors: {
			'test/karma/*.test.js': preprocessor
		},


		webpack: webpackConfig,


		webpackMiddleware: {
			stats: 'errors-only'
		},


		// Informes disponibles de los resultados de los tests
		reporters,


		// Puerto del servidor
		port: 9876,


		// Habilita / deshabilita colores en la salida tanto de los como de informes
		colors: true,


		// Nivel de log
		// Valores posibles: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// Habilita / deshabilita la visualización de archivos y ejecuta pruebas cada vez que cambia algún archivo
		// autoWatch: true,

		// Configuración para los informes de cobertura de código
		coverageReporter: {
			dir: 'coverage-karma',
			// includeAllSources: true,
			reporters: [
				{ type: 'text' },
				{ type: "html", subdir: "html" },
				{ type: 'text-summary' }
			]
		},


		// Cuando un navegador falla, karma intentará relanzarlo.
		// Esto define cuántas veces karma debería relanzar un navegador antes de darse por vencido.
		retryLimit: 0,


		// Representa el tiempo máximo de arranque permitido para que un navegador se inicie
		// y se conecte a Karma. Si cualquier navegador no es capturado dentro del tiempo de
		// espera, Karma lo matará e intentará lanzarlo nuevamente y, después de tres intentos
		// de capturarlo, Karma se dará por vencido.
		captureTimeout: 5000,


		// Navegadores
		browsers: [
			'Chrome',
			// 'Edge',
			// 'IE',
			// 'Firefox',
			// 'Safari'
		],


		// El navegador puede desconectarse,  desconecte,
		// pero la ejecución real de la prueba todavía se ejecuta sin ningún problema.
		// Karma no trata una desconexión como una falla inmediata y esperará
		// este valor definido.
		// Si el navegador se vuelve a conectar durante ese tiempo, todo está bien.
		browserDisconnectTimeout: 5000,


		// Si durante la ejecución de la prueba, Karma no recibe ningún mensaje de un navegador
		// dentro de este valor definido, se desconectará del navegador.
		browserNoActivityTimeout: 5000,


		// Modo integración continua
		// Si es verdadero, Karma captura los navegadores, ejecuta las pruebas y sale.
		// singleRun: false,


		// Nivel de concurrencia
		// Cuantos navegadores deben iniciarse simultánemente
		concurrency: Infinity,


		plugins: [
			'karma-coverage',
			'karma-mocha',
			'karma-chai',
			'karma-chai-dom',
			'karma-chai-http',
			'karma-webpack',
			'karma-chrome-launcher',
			'karma-edge-launcher',
			'karma-ie-launcher',
			'karma-firefox-launcher',
			'karma-safari-launcher',
			'karma-sinon',
			'karma-sinon-ie',
		]

	});

}

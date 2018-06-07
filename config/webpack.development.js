/**
 * Archivo de configuración Webpack para entornos de desarrollo
 *
 */

// Dependencias
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

// Webpack Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const eslintFormatter = require("eslint/lib/formatters/stylish");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Configuración de rutas de directorios y archivos
const appPaths = require('./paths');

// Impide que se importen archivos desde fuera de src/ (o node_modules/)
const ModuleScopePlugin = require('./module.scope');

// Configuración del servidor de desarrollo de Webpack
const devServer = require('./webpack.dev.server.js');

/**
 * El cargador "postcss" aplica el autoprefixer a nuestro CSS.
 * El cargador "css" resuelve las rutas en CSS y agrega los recursos como dependencias.
 * El cargador de "estilo" convierte CSS en módulos JS que inyectan etiquetas <style>.
 * En producción, utilizamos un complemento para extraer ese CSS a un archivo, pero
 * en el cargador de "estilo" en desarrollo habilita la edición en caliente de CSS.
 *
 */
const postCSSLoader = {
	loader: require.resolve('postcss-loader'),
	options: {
		// ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
		plugins: () => [
			require('postcss-flexbugs-fixes'),
			autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9', // React no soporta IE8 en ningún caso
					'safari >= 9'
				],
				flexbox: 'no-2009'
			})
		],
	}
};

// Objeto global process del Servidor Node
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

console.log('appPaths:', appPaths);
console.log();

module.exports = {

	// El punto o puntos para entrar a la aplicación.
	// En este punto, la aplicación comienza a ejecutarse.
	// Si se pasa una matriz, se ejecutarán todos los elementos.
	entry: [
		// Polyfills por defecto
		require.resolve('babel-polyfill'),
		// Punto de entrada a la aplicación
		appPaths.dirSrc + '/index'
	],
	// Salida
	// La Salida de nivel superior contiene un conjunto de opciones que le informan al paquete web
	// cómo y dónde debe generar sus paquetes, activos y cualquier otra cosa que agrupe o cargue con Webpack
	output: {
		// Esto no produce un archivo real.
		// Es solo la ruta virtual que es servido por WebpackDevServer en desarrollo.
		// Este es el paquete de JS que contiene el código de todos los puntos de entrada y en tiempo de ejecución de Webpack.
		filename: appPaths.assets.js + '/bundle.[hash:8].js',
		// Archivos adicionales de JS si se usa la división de código (code splitting).
		chunkFilename: appPaths.assets.js + '/[name].[hash:8].chunk.js',
		// La siguiente línea no se usa en el desarrollo, pero WebpackDevServer falla sin ella:
		path: path.resolve(__dirname, appPaths.dirPublic),
		// URL desde la que se sirve la aplicación. Se usa "/" en desarrollo.
		publicPath: '/',
		// Señalar las entradas del mapa de origen a la ubicación original del disco
		devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath)
	},

	// Controla si y cómo se generan los mapas fuente.
	devtool: 'cheap-module-source-map',

	// Opciones para montar rapidamente un Servidor de desarrollo
	devServer: devServer,

	// @see (@link https://webpack.js.org/configuration/resolve/#resolve)
	resolve: {
		// Alternativa para donde Webpack debe buscar módulos.
		// Colocamos estas rutas en segundo lugar porque queremos `node_modules` primero
		// para "ganar" si hay algún conflicto. Esto coincide con el mecanismo de resolución de Nodo.
		// @see (@link https://github.com/facebookincubator/create-react-app/issues/253)
		modules: ['node_modules', appPaths.nodeModules],
		// Valores predeterminados razonables soportados por el ecosistema Node.
		extensions: ['.js'],
		plugins: [
			// Impide que se importen archivos desde fuera de src/ (o node_modules/).
			// Esto a menudo causa confusión porque solo se procesan archivos dentro de src/ con Babel.
			// Para solucionar esto, se evita que se importen archivos fuera de src/
			// Si se desea, se puede vincular los archivos en node_modules/ y dejar que la resolución del módulo se active.
			// Hay que asegúrarse de que los archivos fuente estén compilados, ya que no serán procesados de ninguna manera.
			new ModuleScopePlugin(appPaths.dirSrc),
		]
	},

	// Tipos de módulos
	module: {
		// Las exportaciones faltantes mostrarán un error en lugar de una advertencia
		strictExportPresence: true,

		// Matriz de Reglas que coinciden con las solicitudes cuando se crean módulos.
		// Estas reglas pueden modificar cómo se crea el módulo.
		// Pueden aplicarse cargadores al módulo o modificar el analizador.
		rules: [

			// Primero se ejecuta el linter
			// Esto es importante hacerlo antes de que Babel procese el JS
			{
				include: appPaths.dirSrc,
				test: /\.(js)$/,
				enforce: 'pre',
				use: [
					{
						options: {
							formatter: eslintFormatter
						},
						loader: require.resolve('eslint-loader')
					}
				],
			},

			// ** AGREGAR / ACTUALIZAR CARGADORES **
			// "file-loader" maneja todos los recursos a menos que esté explícitamente excluido.
			// La lista `exclude` *debe* actualizarse con cada cambio a las extensiones del cargador.
			// Al agregar un nuevo cargador, debes agregar su `test`
			// como una nueva entrada en la lista `exclude` para "file-loader"

			// "file-loader" se asegura de que esos resursos sean servidos por WebpackDevServer.
			// Cuando se 'importa' un recurso, obtienes su nombre de archivo (virtual).
			// En producción, se copiarían a la carpeta "build/".

			{
				exclude: [
					/\.html$/,
					/\.(js)$/,
					/\.css$/,
					/\.sass$/,
					/\.scss$/,
					/\.json$/,
					/\.bmp$/,
					/\.gif$/,
					/\.ico$/,
					/\.jpe?g$/,
					/\.png$/,
					/\.svg$/,
					/\.eot$/,
					/\.ttf$/,
					/\.woff$/,
					/\.woff2$/
				],
				loader: require.resolve('file-loader'),
				options: {
					name: appPaths.assets + '/[name].[ext]'
				}
			},

			{
				// "url-loader" funciona como cargador de "archivos", excepto que incorpora recursos
				// menores que el límite especificado en bytes como URL de datos y así evitar solicitudes.

				// Solo se usa la primera Regla que coincide.
				oneOf: [

					// JS
					{
						test: /\.(js)$/,
						// Soluciona los problemas que la librería tiene en IE11
						// @see (@link https://github.com/smooth-code/error-overlay-webpack-plugin/issues/13)
						exclude: /node_modules\/(?!(error-overlay-webpack-plugin)\/).*/,
						loader: require.resolve('babel-loader'),
						options: {
							presets: ['env'],
						}
					},

					// BMP - GIF - ICO - JPEG -JPG - PNG
					{
						test: [/\.(bmp|gif|ico|jpe?g|png)$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: appPaths.assets.images + '/[name].[ext]',
							fallback: 'file-loader'
						}
					},

					// SVG
					{
						test: /\.svg$/,
						loader: require.resolve('url-loader'),
						options: {
							// No aplicar limit
							// @see (@link https://github.com/facebook/create-react-app/issues/1153)

							limit: 10000, // Lo aplico en este desarrollo por que hay fuentes tipográficas en SVG

							name: appPaths.assets.svg + '/[name].[ext]',
							fallback: 'file-loader'
						}
					},

					// FONTS
					{
						test: /\.(eot|ttf|woff|woff2)$/,
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: appPaths.assets.fonts + '/[name].[ext]',
							fallback: 'file-loader'
						}
					},

					// Este orden de carga de los cargadores de estilos asegura que primero
					// empaquete los archivos CSS (por ejemplo de terceros) y luego los
					// archivos SASS del proyecto.
					// No deberíamos escribir archivos CSS en el proyecto.
					// Si se hace no se asegura una importación en el orden correcto.
					//
					// La otra opción sería generar primero un paqueta con estilos de terceros
					// y luego otro paquete con los estilos del proyecto.

					// CSS
					{
						test: /\.css$/,
						exclude: /node_modules/,
						use: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: [
								{
									loader: 'css-loader',
									options: {
										// Si se tiene problemas con rutas que no se resuelven, agregar esta configuración
										// @See (@link https://github.com/webpack-contrib/css-loader#url)
										url: true,
										minimize: true,
										sourceMap: true
									}
								},
								postCSSLoader
							]
						})
					},

					// SASS - SCSS
					{
						test: /\.(sass|scss)$/,
						exclude: /node_modules/,
						use: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: [
								{
									loader: 'css-loader',
									options: {
										// Si se tiene problemas con rutas que no se resuelven, agregar esta configuración
										// @See (@link https://github.com/webpack-contrib/css-loader#url)
										url: true,
										minimize: true,
										sourceMap: true
									}
								},
								{
									loader: 'sass-loader',
									options: {
										// Si se tiene problemas con rutas que no se resuelven, agregar esta configuración
										// @See (@link https://github.com/webpack-contrib/css-loader#url)
										name: '[name].[ext]',
										url: true,
										minimize: true,
										sourceMap: true
									}
								},
								postCSSLoader
							]
						})
					}

				]
			}

			// ** STOP ** ¿Estás agregando un nuevo cargador?
			// Recuerde agregar la(s) nueva(s) extensión(es) a la lista de exclusión del cargador "file-loader"

		]
	},

	plugins: [

		/**
		 * Extrae el texto de un paquete, o paquetes, en un archivo separado.
		 * @see (@link https://github.com/webpack-contrib/extract-text-webpack-plugin)
		 */
		new ExtractTextPlugin({
			filename: appPaths.assets.css + '/main.[chunkhash:8].min.css',
			allChunks: true
		}),

		/**
		 * Creación de archivos HTML para servir los archivos empaquetados por webpack.
		 * @see (@link https://webpack.js.org/plugins/html-webpack-plugin/)
		 */
		new HtmlWebpackPlugin({
			favicon: appPaths.dirSrc + '/' + appPaths.assets.root + '/favicon.ico',
			template: appPaths.dirSrc + '/' + appPaths.assets.root + '/index.html'
		}),

		/**
		 * Permite ohabilitar el módulo activo, también conocido como HMR (Hot Module Replacement).
		 * @see (@link https://webpack.js.org/plugins/hot-module-replacement-plugin/)
		 */
		new webpack.HotModuleReplacementPlugin(),

		/**
		 * Captura errores con estilo
		 * @see (@link https://github.com/smooth-code/error-overlay-webpack-plugin)
		 */
		new ErrorOverlayPlugin()

	]

};

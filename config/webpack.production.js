/**
 * Archivo de configuración Webpack para entornos de producción
 *
 */

// Dependencias
const webpack = require('webpack');
const path = require('path');

// Webpack Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Configuración para entornos de desarrollo para Webpack
const webpackConfigDevelopment = require('./webpack.development');

// Rutas de directorios
const appPaths = require('./paths');

// Webpack usa "publicPath" para determinar de dónde se está sirviendo la aplicación.
// Requiere una barra al final o los recursos del archivo obtendrán una ruta incorrecta.
const publicPath = appPaths.servedPath;

console.log()
console.log('publicPath ===>', publicPath)
console.log()

module.exports = Merge(webpackConfigDevelopment, {

	// Salida
	// La Salida de nivel superior contiene un conjunto de opciones que le informan al paquete web
	// cómo y dónde debe generar sus paquetes, activos y cualquier otra cosa que agrupe o cargue con Webpack
	output: {
		// La siguiente línea no se usa en el desarrollo, pero WebpackDevServer falla sin ella:
		path: path.resolve(__dirname, appPaths.dirBuild),
		// Se infiere en "public path" (como / ó /my-project) desde homepage.
		publicPath: publicPath
	},

	devtool: false,

	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				default: {
					enforce: true,
					priority: 1
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: 2,
					name: 'vendors',
					enforce: true,
					chunks: 'all'
				}
			}
		}
	},

	plugins: [

		/**
		 * Limpia el directorio final de la construcción.
		 * Es una buena práctica limpiar el directorio final de la construcción
		 * antes de cada compilación, de modo que solo almacenará los archivos usados.
		 * @see (@link https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder)
		 */
		new CleanWebpackPlugin(appPaths.dirBuild, { root: process.cwd() }),

		/**
		 * Especificar el entorno
		 * @see (@link https://webpack.js.org/guides/production/#specify-the-environment)
		 */
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
				'BABEL_ENV': JSON.stringify('production')
			}
		}),

		/**
		 * Minimizar JavaScript
		 * @see (@link https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)
		 */
		new UglifyJSPlugin({
			exclude: /node_modules/,
			uglifyOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true
				},
				output: {
					comments: false,
					beautify: false,
					// Activo porque emoji y regex no se minimizan correctamente usando el valor predeterminado
					// @see (@link https://github.com/facebookincubator/create-react-app/issues/2488)
					ascii_only: true
				}
			}
		}),

		/**
		 * Creación de archivos HTML para servir los archivos empaquetados por webpack.
		 * @see (@link https://webpack.js.org/plugins/html-webpack-plugin/)
		 */
		new HtmlWebpackPlugin({
			favicon: appPaths.dirSrc + '/' + appPaths.assets.root + '/favicon.ico',
			filename: appPaths.dirBuild + '/index.html',
			template: appPaths.dirSrc + '/' + appPaths.assets.root + '/index.html',
			minify: {
				collapseWhitespace: true,
				html5: true,
				keepClosingSlash: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		})

	]
});

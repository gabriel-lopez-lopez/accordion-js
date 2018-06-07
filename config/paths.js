/**
 * Archivo con las rutas de los principales archivos y directorios
 * para su uso en la construcción de empaquetados para los diferentes entornos.
 *
 */

// Dependencias
const path = require('path');
const fs = require('fs');
const url = require('url');

// Directorio principal de la aplicación
const appDirectory = fs.realpathSync(process.cwd());

console.log('appDirectory', appDirectory);

// NODE_PATH
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter(folder => folder && !path.isAbsolute(folder))
    .map(folder => path.resolve(appDirectory, folder))
    .join(path.delimiter);

// Resuelve una ruta relativa en absoluta con relación al directorio principal de la aplicación
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;


function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}


const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

// Utilizamos la variable de entorno "PUBLIC_URL" o el campo "homepage" para inferir
// en la "ruta pública" en la que se sirve la aplicación.
// Webpack necesita saberlo para poner los hrefs <script> correctos en HTML incluso en
// aplicaciones de una sola página que pueden servir en el index.html URLs anidadas como
// por ejemplo /todos/42.
// No podemos usar una ruta relativa en HTML porque no queremos cargar algo
// como "/todos/42/static/js/bundle.7289d.js". Tenemos que saber la raíz.
function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
}

// Constante que define la ruta principal de los recursos
const path_assets = 'assets';

module.exports = {

    // Rutas para los diferentes tipos de recursos
    assets: {
        // Ruta principal
        root: path_assets,
        // recursos de CSS
        css: path_assets + '/css',
        // recursos de fuentes webs
        fonts: path_assets + '/fonts',
        // Recursos gráficos
        images: path_assets + '/images',
        // recursos de JS
        js: path_assets + '/js',
        // recursos de SVG
        svg: path_assets + '/svg'
    },

    // Directorio principal donde se encuentra el código de desarrollo
    dirSrc: resolveApp('src'),

    // Directorio donde se genera la construcción de producción
    dirBuild: resolveApp('build'),

    // Directorio donde se genera la construcción de desarrollo
    dirPublic: resolveApp('public'),

    // Archivo package.json
    packageJson: resolveApp('package.json'),

    // Directorio node_modules
    nodeModules: resolveApp('node_modules'),

    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),

};

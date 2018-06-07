/** 
 * Prepara la configuración del Proxy para el servidor de desarrollo de Webpack
 * 
 */

// Dependencias
const address = require('address');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const url = require('url');

function resolveLoopback(proxy) {
    const o = url.parse(proxy);
    o.host = undefined;
    if (o.hostname !== 'localhost') {
        return proxy;
    }
    // Desafortunadamente, muchos idiomas (a diferencia del nodo) aún no son compatibles con IPv6.
    // Esto significa que aunque localhost resuelve a :: 1, la aplicación
    // debe recurrir a IPv4 (en 127.0.0.1).
    // Podemos volver a habilitar esto en unos años.
    /*try {
      o.hostname = address.ipv6() ? '::1' : '127.0.0.1';
    } catch (_ignored) {
      o.hostname = '127.0.0.1';
    }*/

    try {
        // Verifica si estamos en una red; si lo estamos, es probable que podamos resolver localhost.
        // De lo contrario, podemos estar seguros y asumir que el localhost es IPv4 para la máxima compatibilidad.
        if (!address.ip()) {
            o.hostname = '127.0.0.1';
        }
    } catch (_ignored) {
        o.hostname = '127.0.0.1';
    }
    return url.format(o);
}

/**
 * Función personalizada para httpProxyMiddleware.
 * Permite registrar mensajes de error personalizados en la consola.
 * @param {Object|String} proxy Objeto con la configuración del proxy o cadena simple 
 */
function onProxyError(proxy) {
    return (err, req, res) => {
        const host = req.headers && req.headers.host;
        console.log(
            chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) + ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.'
        );
        console.log(
            'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' + chalk.cyan(err.code) + ').'
        );
        console.log();

        // Envía inmediatamente la respuesta de error adecuada al cliente.
        // De lo contrario, la solicitud eventualmente finalizará con ERR_EMPTY_RESPONSE en el lado del cliente.
        if (res.writeHead && !res.headersSent) {
            res.writeHead(500);
        }
        res.end(
            'Proxy error: Could not proxy request ' + req.url + ' from ' + host + ' to ' + proxy + ' (' + err.code + ').'
        );
    };
}

/**
 * Prepara la configuración del Proxy para el servidor de desarrollo de Webpack
 * @param {Object|String} proxy Objeto con la configuración del proxy o cadena simple 
 * @param {String} appPublicFolder Directorio de la carpeta pública
 */
function prepareProxy(proxy, appPublicFolder) {

    /**
     * `proxy` permite especificar servidores alternativos para solicitudes específicas.
     * Puede ser una cadena o un objeto que se ajuste a la configuración del proxy del servidor de desarrollo Webpack
     * @see (@link https://webpack.github.io/docs/webpack-dev-server.html)
     */
    if (!proxy) {
        return undefined;
    }
    if (typeof proxy !== 'object' && typeof proxy !== 'string') {
        console.log(
            chalk.red('When specified, "proxy" in package.json must be a string or an object.')
        );
        console.log(
            chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".')
        );
        console.log(
            chalk.red('Either remove "proxy" from package.json, or make it an object.')
        );
        process.exit(1);
    }

    /**
     * Por otra parte si se especifica el proxy le dejaremos manejar cualquier solicitud excepto los archivos en la carpeta pública.
     * @param {String} pathname 
     */
    function mayProxy(pathname) {
        const maybePublicPath = path.resolve(appPublicFolder, pathname.slice(1));
        return !fs.existsSync(maybePublicPath);
    }

    /**
     * Soporte proxy como una cadena para los que esten usando la opción de proxy simple
     */
    if (typeof proxy === 'string') {
        if (!/^http(s)?:\/\//.test(proxy)) {
            console.log(
                chalk.red('When "proxy" is specified in package.json it must start with either http:// or https://')
            );
            process.exit(1);
        }

        let target;
        if (process.platform === 'win32') {
            target = resolveLoopback(proxy);
        } else {
            target = proxy;
        }

        return [
            {
                target,
                logLevel: 'silent',

                // Para aplicaciones de una sola página (SPA), generalmente queremos recurrir a /index.html.
                // Sin embargo, también queremos respetar `proxy` para llamadas API.
                // Entonces, si `proxy` se especifica como una cadena, debemos decidir qué alternativa utilizar.
                // Utilizamos una heurística: si solicita `accept`s text/html, seleccionamos /index.html.
                // Los navegadores modernos incluyen text/html en el encabezado `accept` al navegar.
                // Sin embargo, las llamadas API como `fetch()` generalmente no aceptarán text/html.
                // Si esta heurística no te es del todo adecuada, utiliza un objeto `proxy` personalizado.
                context: function (pathname, req) {
                    return (
                        mayProxy(pathname) &&
                        req.headers.accept &&
                        req.headers.accept.indexOf('text/html') === -1
                    );
                },
                onProxyReq: proxyReq => {
                    // Los navegadores pueden enviar encabezados de origen incluso con peticiones con el mismo origen.
                    // Para evitar problemas de CORS, tiene que cambiarse el origen para que coincida con la URL objetivo.
                    if (proxyReq.getHeader('origin')) {
                        proxyReq.setHeader('origin', target);
                    }
                },
                onError: onProxyError(target),
                secure: false,
                changeOrigin: true,
                ws: true,
                xfwd: true
            }
        ];
    }

    // De lo contrario, el proxy es un objeto, se crea una matriz de proxies para pasar a webpackDevServer
    return Object.keys(proxy).map(function (context) {
        if (!proxy[context].hasOwnProperty('target')) {
            console.log(
                chalk.red(
                    'When `proxy` in package.json is as an object, each `context` object must have a ' +
                    '`target` property specified as a url string'
                )
            );
            process.exit(1);
        }
        let target;
        if (process.platform === 'win32') {
            target = resolveLoopback(proxy[context].target);
        } else {
            target = proxy[context].target;
        }
        return Object.assign({}, proxy[context], {
            context: function (pathname) {
                return mayProxy(pathname) && pathname.match(context);
            },
            onProxyReq: proxyReq => {
                // Los navegadores pueden enviar encabezados de origen incluso con peticiones con el mismo origen.
                // Para evitar problemas de CORS, tiene que cambiarse el origen para que coincida con la URL objetivo.
                if (proxyReq.getHeader('origin')) {
                    proxyReq.setHeader('origin', target);
                }
            },
            target,
            onError: onProxyError(target),
        });
    });

}

module.exports = {
    prepareProxy
};

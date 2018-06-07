/** 
 * Impide que se importen archivos desde fuera del directorio predeterminado (o de node_modules/)
 * 
 */

// Dependencias
const chalk = require('chalk');
const path = require('path');

module.exports = class ModuleScopePlugin {
    constructor(dirSrc) {
        this.dirSrc = dirSrc;
    }
    apply(resolver) {
        const { dirSrc } = this;
        resolver.plugin('file', (request, callback) => {
            // Editor desconocido, probablemente componentes internos de Webpack
            if (!request.context.issuer) {
                return callback();
            }
            if (
                // Si se resuelve en un node_module, no importa lo que pase después
                request.descriptionFileRoot.indexOf('/node_modules/') !== -1 ||
                request.descriptionFileRoot.indexOf('\\node_modules\\') !== -1 ||
                // Esta solicitud será manual
                !request.__innerRequest_request
            ) {
                return callback();
            }

            // Resuelve el emisor de nuestro dirSrc y asegura de que sea uno de nuestros archivos
            // Tal vez un indexOf === 0 sería mejor?
            const relative = path.relative(dirSrc, request.context.issuer);

            // Si no está en src/ o en un subdirectorio, ¡no es nuestra solicitud!
            if (relative.startsWith('../') || relative.startsWith('..\\')) {
                return callback();
            }

            // Encuentra la ruta de src al archivo solicitado
            const requestRelative = path.relative(
                dirSrc,
                path.resolve(
                    path.dirname(request.context.issuer),
                    request.__innerRequest_request
                )
            );

            // Error si está en un directorio padre de src/
            if (
                requestRelative.startsWith('../') ||
                requestRelative.startsWith('..\\')
            ) {
                callback(
                    new Error(
                        `You attempted to import ${chalk.cyan(
                            request.__innerRequest_request
                        )} which falls outside of the project ${chalk.cyan(
                            'src/'
                        )} directory. ` +
                        `Relative imports outside of ${chalk.cyan(
                            'src/'
                        )} are not supported. ` +
                        `You can either move it inside ${chalk.cyan(
                            'src/'
                        )}, or add a symlink to it from project's ${chalk.cyan(
                            'node_modules/'
                        )}.`
                    ),
                    request
                );
            } else {
                callback();
            }
        });
    }
}
Accordion JS
============

Accordion with native javascript

## Demo

[https://gabriel-lopez-lopez.github.io/accordion-js/](https://gabriel-lopez-lopez.github.io/accordion-js/)

En respuesta al ejercicio [https://github.com/scm-spain/Frontend-Exercise](https://github.com/scm-spain/Frontend-Exercise)

### ¿Qué incluye?

* Javascript Vanilla, Sintaxis ES6, Babel, Webpack 4.
* Autoprefixed CSS mediante PostCSS.
* Servidor de desarrollo webpack-dev con soporte ESLint para advertir de los errores comunes.
* Archivos de configuración para entornos de desarrollo y producción para Webpack 4 que permiten empaquetar las construcciones, CSS, JS, imágenes, etc.

Las diferentes configuraciones de empaquetado, así como el dev-server para Webpack 4 han sido realizadas manualmente.

## Tabla de contenido

Se incluye información sobre diferentes temas, como son:

- [Estructura de directorios](#estructura-de-directorios)
- [Instalación de dependencias](#instalación-de-dependencias)
- [Scripts disponibles](#scripts-disponibles)
- [Navegadores soportados](#navegadores-soportados)
- [Características del lenguaje admitido y Polyfills](#características-del-lenguaje-admitido-y-polyfills)
- [Linter](#linter)
- [Importación de componentes](#importación-de-componentes)
- [Agregar hojas de estilo](#agregar-hojas-de-estilo)
- [Post-procesamiento CSS](#post-procesamiento-css)
- [Imágenes, fuentes tipográficas, archivos...](#imágenes-fuentes-tipográficas-archivos)
- [Página principal index.html](#página-principal-indexhtml)
- [SUIT CSS](#suit-css)
- [Datos con solicitudes AJAX asíncronas mediante XMLHttpRequest y Promesas](#datos-con-solicitudes-ajax-asíncronas-mediante-xmlhttprequest-y-promesas)
- [Solicitudes de API en desarrollo (Proxing)](#solicitudes-de-api-en-desarrollo-proxing)
- [Tests y Cobertura del código](#tests-y-cobertura-del-código)
- [Construcción](#construcción)
- [Despliegue en GitHub Pages](#despliegue-en-github-pages)


### Estructura de directorios

Antes de instalar ninguna dependencia esta es la estructura principal de directorios del proyecto y una pequeña descripción de los archivos más relevantes.

```sh
      config/                     // contiene los archivos de configuración para los empaquetados
          module.scope.js         /*
                                  Impide que se importen archivos desde fuera del directorio predeterminado
                                  (o de node_modules/)
                                  */
          paths.js                /*
                                  Archivo con las rutas de los principales archivos y directorios
                                  para su uso en la construcción de empaquetados para los diferentes entornos.
                                  */

          proxy.js                // Prepara la configuración del Proxy para el servidor de desarrollo de Webpack
          webpack.dev.server.js   // Archivo de configuración para el servidor de desarrollo de Webpack
          webpack.development.js  // Archivo de configuración Webpack para entornos de desarrollo
          webpack.production.js   // Archivo de configuración Webpack para entornos de producción

      src/
          assets/                 // Repositorios de recursos gráficos, fuentes, css
              css/
                fonts/
                images/
                  sui.css         // CSS principal de la APP basado en la libreria SUI
              images/
              favicon.ico
              index.html          // Página principal de la APP

          components/             // Componentes
              ...

          lib/                    // Librerías/Componentes de apoyo
              Component.js        // Clase de la que heredan otros componentes
              ErrorExcepction.js  // Librería para extender objetos nativos mediante su prototipo
              http.js             /*
                                  Encapsula las peticiones HTTP.
                                  De esta manera puede cambiarse más facilmente el provedor de peticiones,
                                  XMLHttpRequest, fetch, axios...
                                  También aquí se podría centralizar la respuesta de las peticiones,
                                  controlar los errores, establecer la configuración de las cabeceras
                                  en las peticiones...
                                  */
              services.js         // API local para solicitudes HTTP a Servicios REST y otras utilidades

          scss/                   // archivos sass
            ...

          index.js                // Archivo principal de la APP

      test                        // Tests

      package-lock.json
      package.json
      README.md
```

Se necesita tener **Node >= 6** en la máquina de desarrollo.

### Instalación de dependencias

Deben instalarse las dependencias con npm antes de poder lanzar cualquier script del proyecto.
Instalarlas con:

```sh
    $ npm install
```

### scripts disponibles

**npm start**

Ejecuta la aplicación en modo de desarrollo en [http://localhost:3001](http://localhost:3001)

La página se volverá a cargar si se realizan modificaciones.
También se verá cualquier error de sintaxis del código en la consola.

**npm run build**

Crea la aplicación para producción en el directorio **build**
Optimiza la construcción para obtener el mejor rendimiento.
La compilación se minimiza y los nombres de archivos empaquetados incluyen valores hash.

**npm run deploy**

Realiza **npm run build** y publica la construcción de producción en **GitHub pages**, realizando previamente una limpieza en la caché (evita errores colaterales)

  **Otros scripts secundarios**

  - **npm run deploy:gh-pages**

    Publica una construcción previa de producción en **GitHub pages**

  - **npm run deploy:cleanup**

    Limpia caché antes de publicar en **GitHub pages**

  - **npm run deploy:start**

    Realiza la publicación en **GitHub pages**

**npm run test**

Ejecuta la automatización de pruebas para **Jest** y **Karma**

  **Otros scripts secundarios**

  - **npm run test:jest**
  - **npm run test:jest:watch**
  - **npm run test:karma**
  - **npm run test:karma:watch**

 **npm run coverage**

Cobertura del código. Lanza simultáneamente los tests tanto de **Jest** como de **Karma**

  **Otros scripts secundarios**

  - **npm run coverage:jest**

    Cobertura de código realizda con Jest.

  - **npm run coveragejest:watch**

    Cobertura de código realizda con Jest y observa los cambios que se realizan en los tests.

  - **npm run coveragekarma**

    Cobertura de código realizda con Karma.

  - **npm run coveragekarma:watch**

    Cobertura de código realizda con Karma y observa los cambios que se realizan en los tests.


### Navegadores soportados

- Chrome Versión 65.0.3325.181 (Build oficial) (64 bits)
- Microsoft Edge 42.17134.1.0 Microsoft EdgeHTML 17.17134
- Internet Explorer 11 Versión 11.48.17134.0

### Características del lenguaje admitido y Polyfills

Este proyecto es compatible con un superconjunto del último estándar de JavaScript.

Polyfills ES6 incluidos:
- [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).

Si se usan otras características de ES6+ que necesitan soporte en tiempo de ejecución (como Array.from() ó Symbol), asegurarse de incluir manualmente los Polyfills adecuados o de que los navegadores a los que apunta ya los admiten.

También hay que tener en cuenta que el uso de algunas características de sintaxis más nuevas como **for...of** ó **[...nonArrayValue]** hace que Babel emita código que depende de las características en tiempo de ejecución de ES6 y podría no funcionar sin múltiples Polyfills. En caso de duda, utilizar [Babel REPL](https://babeljs.io/repl/) para ver a qué se reduce cualquier sintaxis específica.

### Linter

Este proyecto utiliza:

- babel-eslint
- eslint
- eslint-loader
- style-loader

con la configuración expuesta en el archivo **.eslintrc**

```sh

    {
      "extends": "eslint:recommended",
      "env": {
          "browser": true,
          "commonjs": true,
          "node": true,
          "es6": true
      },
      "parserOptions": {
          "ecmaVersion": 6,
          "sourceType": "module"
      },
      "rules": {
          "no-console": "off",
          "strict": [
              "error",
              "global"
          ],
          "curly": "warn",
          "no-unused-vars": "warn"
      }
    }

```

### Importación de componentes

La configuración de este proyecto es compatible con los módulos ES6 gracias a Babel.
También puede usarse require() y module.exports, recomiendo usar import y export en su lugar.

### Agregar hojas de estilo

La configuración de este proyecto usa Webpack para manejar las hojas de estilos. Bien sean archivos css ó scss mediante su preprocesador sass y el cargador sass-loader.

### Post-procesamiento CSS

La configuración de este proyecto minimiza los archivos CSS y agrega los prefijos de los vendedores automáticamente a través de los prefijos automáticos gestionado por el cargador postcss-loader

### Imágenes, fuentes tipográficas, archivos...

Con Webpack, usar archivos estáticos como imágenes y fuentes funciona de manera similar a los CSS.

Pueden importarse archivos directamente en un módulo de JavaScript.
Esto le dice a Webpack que incluya ese archivo en el paquete de construcción.
A diferencia de las importaciones de CSS, la importación de un archivo le proporciona un valor de cadena que es la ruta final a la que puede hacerse referencia en el código, por ejemplo, como el atributo src de una imagen.

Para reducir el número de peticiones al servidor, la importación de imágenes de menos de 10.000 bytes devuelve una URI de datos en lugar de una ruta.
Esto se aplica a las siguientes extensiones de archivo: bmp, gif, jpg, jpeg, png, eot, ttf, woff y woff2

### Página principal index.html

Este archivo se encuentra en el directorio **assets** y puede ser modificado.
Webpack procesará este archivo y lo incluirá en la carpeta de distribución de la compilación **build**

### SUIT CSS

La hoja principal CSS de este proyecto se base en [SUIT CSS](https://suitcss.github.io/)

### Datos con solicitudes AJAX asíncronas mediante XMLHttpRequest y Promesas

Este proyecto utiliza la API **XMLHttpRequest**

### Solicitudes de API en desarrollo (Proxing)

Es conveniente escribir solicitudes HTTP tal que así **/api** sin tener que preocuparse por la redirección a otro host o puerto durante el desarrollo.

Para indicar al servidor de desarrollo que haga un proxy de cualquier solicitud desconocida a este servidor API en desarrollo, se ha agregado el campo **proxy** al archivo **package.json**.
Puede configurarse este campo tal como se indica en el soporte de configuración de **[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options)** o **[http-proxy](https://github.com/nodejitsu/node-http-proxy#options)**.

### Tests y Cobertura del código

Pruebas de automatización realizaas con frameworks y librerías como **Jest**, **karma**, **Mocha**, **Chai**, **Chai-dom**, **Chai-http**, **Sinon**...

Por defecto, para las pruebas con navegador, sólo se encuentra activado Chrome, aunque se pueden probar también Edge, IE, Firefox y Safari.
Sólo se ha dejado Chrome porque parece que con los navegadores Firefox y Safari, si algún test falla, el proceso de Construcción no puede terminar (Modificar los pertinentes scripts).

Los navegadores pueden añadirse o quitarse en el archivo de configuración de Karma, que se encuentra en **config/karma/karma.conf.js**


### Construcción

**npm run build**

Crea una distribución empaquetada de la aplicación en el directorio **build**

### Despliegue en GitHub Pages

**npm run deploy**

Realiza **npm run build** y publica la construcción de producción en **GitHub pages**, realizando previamente una limpieza en la caché (evita errores colaterales)
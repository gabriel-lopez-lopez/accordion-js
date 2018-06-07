/**
 * Methods to call the API
 *
 */

// Components and dependencies
import ErrorException from './ErrorException';

export * from './services';

/**
 * Promise for HTTP requests through XMLHttpRequest
 * @private
 * @param {String} method HTTP Verb
 * @param {String} url HTTP URI
 */
const oRequest = function (method, url) {

    /**
     * Prevent browser caching of AJAX call result
     * @param {String} url HTTP URI
     */
    const bustCacheUrl = function (url) {
        const d = new Date().getTime();
        if (url.indexOf('?') !== -1) {
            return url + '&_=' + d;
        }
        return url + '?' + d;
    };

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, bustCacheUrl(url));
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                if (this.responseType === 'json') {
                    resolve(xhr.response);
                    return;
                }

                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (err) {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }

            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};

/**
 * Public methods
 */
const methods = {
    get: (url) => oRequest('get', url)
        .then(response => response)
        .catch(err => {
            const error = new ErrorException('There was an error in the service call.', 'APIErrorException')
            error.error = err;
            throw error;
        })
};

export default methods;
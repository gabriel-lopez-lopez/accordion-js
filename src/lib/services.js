/**
 * Routes of API services
 *
 */

/**
 * Solve the url of the api depending on whether you are in a development or productive environment.
 * This really would not be necessary if the App is served from a Node application server.
 * But in this case the APP is published in "gh-pages".
 */
 const resolveURL = (devUrl, prodUrl) => {
    return process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
};

/**
 * Services available for the application
 */
const services = {
    api: resolveURL('/api', 'https://gist.githubusercontent.com/gabriel-lopez-lopez/bc87e54680242b68d0f96c8c419bcf2a/raw/a1e4f478f8ff2c8d739e8f3c8455d365bb510b9e/accordion-list-items.json')
};

export {
    services
}

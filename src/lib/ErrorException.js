/**
 * Method to control errors exceptions
 *
 * @param {String} message
 * @param {String} exceptionName
 */
export default function ErrorException(message, exceptionName) {
    this.message = message;
    this.name = exceptionName || 'ErrorException';
}

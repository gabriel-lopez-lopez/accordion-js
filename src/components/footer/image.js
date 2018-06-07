/**
 * Image Component
 *
 */

// Components and dependencies
import ErrorException from '../../lib/ErrorException';

/**
 * Create an image
 * @param {String|Object} src Source or URL of an image
 * @param {String} alt Alternate text for image
 * @param {String} className The class selector for image
 * @param {String} link Link for image
 */
const Image = ({ src, alt, className, link }) => {
    let img = null;
    if (src === undefined) {
        throw new ErrorException('Image Component required src param.');
    } else {
        img = document.createElement('img');
        img.className = className || '';
        img.src = src;
        img.alt = alt || '';
        if (link !== undefined) {
            const ALink = document.createElement('a');
            ALink.href = link.href;
            ALink.target = link.target;
            // Append image at link
            ALink.appendChild(img);
            img = ALink;
        }
    }
    return img;
};

export default Image;
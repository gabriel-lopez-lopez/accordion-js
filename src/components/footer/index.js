/**
 * Footer Component
 *
 */

// Components and dependencies
import Component from '../../lib/Component';
import Image from './image';
// Graphics resources
import ImageLogo from '../../assets/images/gl-logo.png';

// CSS
import './_index.scss'

/**
 * Private class definition Footer.
 * Content to show at the bottom of the page -> HTML <footer>
 * @private
 * @class
 * @extends Component
 */
export default class FooterContent extends Component {
	/**
	 * Private class constructor
	 * @private
	 * @constructor
	 * @param {...Object} arguments variable number of objects
     */
    constructor() {
		super(...arguments);

		// Private methods

		/**
		 * Initialize component
		 */
		this._init = () => {
			if (this.node !== null) {
				// Create DOM image
				const image = Image({
					src: ImageLogo,
					alt: 'Gabriel López',
					className: 'Footer-image',
					link: {
						href: 'https://github.com/gabriel-lopez-lopez/',
						target: '_blank'
					}
				});

				if (image !== null) {
					// Append Image in container node
					this.node.appendChild(image);
				}

				const textNode = document.createTextNode('\u00a9 2018 - Gabriel López');
				// Append text in container node
				this.node.appendChild(textNode);

			}
		};

		// Private instance
		const self = this;

		/**
		 * Public class definition Footer.
		 * @public
		 * @class
		 * @extends Component
		 */
        class FooterContent {
			/**
			 * Public class constructor
			 * @private
			 * @constructor
			 */
			constructor() {
				self._init();
            }

        }

		// Returns a new instance of public class
		return new FooterContent(arguments);
    }
}
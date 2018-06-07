/**
 * Accordion Component
 *
 */

// Components and dependencies
import Component from '../../lib/Component';
import AccordionItems from './items';

// CSS
import './_index.scss'

/**
 * Private class definition Accordion.
 * Represents a DList Object -> HTML <dl>
 * @private
 * @class
 * @extends Component
 */
export default class Accordion extends Component {
	/**
	 * Private class constructor
	 * @private
	 * @constructor
	 * @param {...Object} arguments variable number of objects parameters
     */
    constructor() {
		super(...arguments);

		// Private variables

		// Represents the Component instance of Accordion elements
		this.AccordionItems;

		// The .class default selector for Accordion component
		this.className = 'Accordion';

		// Indicates if the Accordion shows its elements one by one or not
		this.oneOpen = this.oneOpen === undefined ? true : this.oneOpen;

		// Private methods

		/**
		 * Initialize component
		 */
		this._init = () => {
			if (this.node !== null) {
				// DList object
				const $dl = document.createElement('dl');
				$dl.className = this.className;
				// Append DList in container node
				this.node.appendChild($dl);
				// Change the values of the attributes that will
				// be passed to the child component (accordion elements)
				self.selector = `${self.selector} dl.${this.className}`;
				self.node = $dl;
				// Create accordion elements
				this.AccordionItems = new AccordionItems(self);
			}
		};

		// Private instance
		const self = this;

		/**
		 * Public class definition Accordion.
		 * Represents a DList Object -> HTML <dl>
		 * @public
		 * @class
		 * @extends Component
		 */
        class Accordion {
			/**
			 * Public class constructor
			 * @private
			 * @constructor
			 */
			constructor() {
				// Initialize Accordion component
				self._init();

				// Public methods

				// If the component of the accordion has a method
				// to create more components when adding new data
				this.appendData = self.AccordionItems !== undefined &&
					self.AccordionItems.appendData !== undefined &&
					typeof self.AccordionItems.appendData === 'function' ? self.AccordionItems.appendData : () => {}

			}

        }

		// Returns a new instance of public class
		return new Accordion(arguments);
    }
}
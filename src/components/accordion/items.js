/**
 * Accordion elements Component
 *
 */

// Components and dependencies
import Component from '../../lib/Component';
import DListComponent, { DListComponentOptionsMenu } from './item';

/**
 * Private class definition Accordion elements
 * Represents a DList object terms and description -> HTML <dt and dd>
 * @private
 * @class
 * @extends Component
 */
export default class AccordionItems extends Component {
	/**
	 * Private class constructor
	 * @private
	 * @constructor
	 * @param {...Object} arguments variable number of objects parameters
     */
	constructor() {
		super(...arguments);

		// Private methods

		/**
		 * Create the components for the DList object
		 * @param {Object[]} data
		 * @param {Boolean} isNewItem The data that is passed is new, coming from a request for a service
		 */
		this._createDListObjectItems = (data, isNewItem) =>
			DListComponent.call(this, {
				bArrow: true,
				data,
				has_dd: true,
				isLink: true,
				isNewItem: isNewItem !== undefined ? isNewItem : false,
				node: this.node
			});

		/**
		 * Initialize component.
		 * The data is iterated to create the elements of the accordion
		 */
		this._init = () => {

			// Create a menu with options for Accordion
			DListComponentOptionsMenu.call(this);

			this.dataItems.map(d => {
				// Create the components for the DList object terms and description
				this._createDListObjectItems(d);
			});
		};

		// Private Instance
		const self = this;

		/**
		 * Public class definition AccordionItems.
		 * @public
		 * @class
		 * @extends Component
		 */
		class AccordionItems {
			/**
			 * Public class constructor
			 * @private
			 * @constructor
			 */
			constructor() {

				// Initialize Component
				self._init();

				/**
				 * Add new data to the accordion
				 * @param {Object[]} data
				 */
				this.appendData = (data) => {
					// // The data is iterated to create the new elements of the accordion
					data.map((d, i) => {
						// For each data a delay in the creation of the component is applied
						setTimeout(function () {
							// Create the components for the DList object terms and description,
							// but it´s indicating that the records are new, coming from the
							// request of a service
							self._createDListObjectItems(d, true);
						}, (i + 1) * 100);
					});
					return true;
				}
			}
		}

		return new AccordionItems(...arguments);
	}
}
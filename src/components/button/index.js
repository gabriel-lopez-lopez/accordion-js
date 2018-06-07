/**
 * Button add elements in Accordion Component
 *
 */

// Components and dependencies
import Component from '../../lib/Component';

// CSS
import './_index.scss';

/**
 * Private class definition Button add elements in Accordion
 * Represents a button -> HTML <button>
 * @private
 * @class
 * @extends Component
 */
export default class ButtonAddItems extends Component {
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
		 * @param {*} object
		 */
		this._isPromise = (object) => {
			if (Promise && Promise.resolve) {
				return Promise.resolve(object) === object;
			} else {
				throw "Promise not supported in your environment"
			}
		}

		/**
		 * Return function to call passing the data
		 * @param {Object[]} response Function response
		 */
		this._onSuccess = (response) => {
			if (self.onSuccess !== undefined && typeof self.onSuccess === 'function') {
				self.onSuccess(response);
			}
		}

		/**
		 * Click event handler
		 */
		this._onClick = (e) => {

			e.target.disabled = true;

			const oRes = self.onClick();

			// Method of the result it´s a Promise
			if (this._isPromise(oRes)) {
				oRes.then(response => {
					e.target.disabled = false;
					this._onSuccess(response);
				}).catch(err => {
					e.target.disabled = false;
					console.error(err);
				});
			} else {
				e.targer.disabled = false;
				this._onSuccess(oRes);
			}

		}

		/**
		 * Create the button
		 */
		this._createButton = () => {

			const $button = document.createElement('button');
			$button.type = 'button';
			$button.className = `Button Button--addItems ${this.className !== undefined ? this.className : ''}`.trim();
			$button.innerHTML = '+';

			if (typeof self.onClick === 'function') {
				$button.onclick = this._onClick;
			}

			// Append button in container node
			this.node.appendChild($button);
		};

		/**
		 * Initialize component
		 */
		this._init = () => {
			this._createButton();
		};

		// Private Instance
		const self = this;

		/**
		 * Public class definition
		 * Represents a button -> HTML <button>
		 * @public
		 * @class
		 * @extends Component
		 */
		class ButtonAddItems {
			/**
			 * Public class constructor
			 * @private
			 * @constructor
			 */
			constructor() {
				// Initialize Component
				self._init();
			}
		}

		return new ButtonAddItems(...arguments);
	}
}
/**
 * Class Component
 *
 * The idea of this component is that others inherit easy attributes
 * and methods common to components, etc.
 *
 * It is only by way of example, since it has been very light
 * and does not really implement many things
 *
 */

// Components and dependencies
import ErrorException from './ErrorException';

// Private Class Definition
export default class Component {
    // Private class constructor
    constructor() {

        // Private variables

        // ***

		// Private Methods

        // ***

        // Private Instance
		// const self = this;

        // Public Class Definition
        class Component {

            // Public Constructor
            constructor() {

                const args = Array.prototype.slice.call(arguments);

                this.selector = args[0] !== undefined && args[0].selector !== undefined ? args[0].selector : undefined,
                this.node = document.querySelector(this.selector)

                if (this.selector === undefined || this.selector === null || this.node === null) {
                    throw new ErrorException('Class Component required a valid selector.');
                } else {

                    const argsArray = Array.prototype.slice.apply(arguments);
                    argsArray.map(arg => {
                        for (const key in arg) {
                            this[key] = arg[key]
                        }
                    });

                }

            }

        }

        return new Component(...arguments);
    }
}
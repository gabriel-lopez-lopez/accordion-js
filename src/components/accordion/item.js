/**
 * Functionality for the Accordion
 *
 */

// Components and dependencies
import ErrorException from '../../lib/ErrorException';

/**
 * Create the components for the DList object
 *
 * @param {Object} node Node where append DTList object components
 * @param {Object} data
 * @param {Boolean} bArrow If the arrow icon should be displayed
 * @param {Boolean} isLink If it is a link, receive the "click" event
 * @param {Boolean} isNewItem The data that is passed is new, coming from a request for a service
 * @param {Boolean} has_dd If it is a DList objet description
 */
function DListComponent ({
	node,
	data,
	bArrow = false,
	isLink = false,
	isNewItem = false,
	has_dd = false
}) {

	const default_data = {
		text: null,
		title: null
	}

	if (this === undefined || this === null) {
		// Show error. Not blocked, not throw exception
		const error_exception = new ErrorException('DListComponent required context.');
		console.error(error_exception);
	} else {

		data = Object.assign({}, default_data, data);

		if (data.title === null) { return; }

		// Component context
		const self = this;

		// DList object terms
		const $dt = document.createElement('dt');

		// The .class default selector for dt
		let className = '';
		if (isLink) { className += ' Accordion--link'; }
		if (isNewItem) { className += ' is-new'; }
		$dt.className = className.trim();

		/**
		 * Create events for DList terms
		 * @param {Object} $elem Component for which event handlers are created
		 */
		const addEventListener = ($elem) => {
			/**
			 * Event Handler (click)
			 * @param {Object} e Event
			 */
			const onClick = function (e) {
				let target = e.target;
				if (e.target.tagName === "I") { target = target.parentNode; }
				const action = target.classList.contains('is-animating') ? 'remove' : 'add';
				if (self.oneOpen && document.querySelector('.is-animating') !== null) {
					Array.from(document.querySelectorAll('.is-animating')).forEach(item => item.classList.remove('is-animating'));
				}
				target.classList[action]('is-animating');
			};
			/**
			 * Event Handler (click)
			 * @param {Object} e Event
			 */
			const onTransitionEnd = function (e) {
				// Nothing will be done for any transition that ends and
				// that is not a transaction of the element itself.
				if (e.target !== this) { return; }

				// DList description
				const $DList_d = e.target.nextElementSibling;

				const classNameAdd = $DList_d.classList.contains('is-open') ? 'is-close' : 'is-open';
				const classNameRemove = $DList_d.classList.contains('is-open') ? 'is-open' : 'is-close';

				$DList_d.classList.remove(classNameRemove);
				$DList_d.classList.add(classNameAdd);

				// If it already had a declared maximum height it´s removed
				// and if not, it´s established by the height that it has of displacement (scroll)
				if ($DList_d.style.maxHeight) {
					$DList_d.style.maxHeight = null;
				} else {
					$DList_d.style.maxHeight = $DList_d.scrollHeight + "px";
				}
			}

			// Register events
			$elem.addEventListener('click', onClick, false);

			// Register events for DList terms
			$elem.addEventListener('transitionend', onTransitionEnd.bind($elem), false);

		};

		// Paragraph
		const $p = document.createElement('p');
		// Title
		const titleNode = document.createTextNode(data.title);
		// Content
		const textNode = document.createTextNode(data.text);

		// Append text node in in DList object terms
		$dt.appendChild(titleNode);

		if (bArrow) {
			// Represent an arrow
			const $arrow = document.createElement('i');
			// Append arrow node in DList object terms
			$dt.appendChild($arrow);
		}

		// Create events for DList terms
		addEventListener($dt);

		// Append DList terms in container node (DList object)
		node.appendChild($dt);

		if (has_dd) {
			// DList object description
			const $dd = document.createElement('dd');
			// The .class default selector for DList object description
			$dd.className = 'is-close';

			// Append text node in paragraph node
			$p.appendChild(textNode);
			// Append paragraph node in DList object description
			$dd.appendChild($p);

			// Append DList object description in container node (DList object)
			node.appendChild($dd);
		}

		// if the data that is passed is new, coming from a request for a service,
		// half a second passeds to finish by removing a style from the component
		if (isNewItem) {
			setTimeout(() => {
				$dt.classList.remove('is-new')
			}, 500);
		}

	}

}

/**
 * Create a menu with options for Accordion
 */
function DListComponentOptionsMenu () {

	// Context
	const Accordion = this;

	if (Accordion === undefined || Accordion === null) {
		// Show error. Not blocked, not throw exception
		const error_exception = new ErrorException('DListComponentOptionsMenu required context.');
		console.error(error_exception);
	} else {

		const lessTxt = 'show one';
		const moreTxt = 'show more than one';

		// Create link
		const ALink = document.createElement('a');
		ALink.className = 'Link is-active';
		ALink.text = Accordion.oneOpen ? moreTxt : lessTxt;
		ALink.href = '#';

		// Handler events
		ALink.addEventListener('click', function (e) {
			e.preventDefault();
			e.target.text = (e.target.classList.contains('is-active')) ? lessTxt : moreTxt;
			e.target.classList.toggle('is-active');
			// Set in the accordion component the new way of showing the elements
			Accordion.oneOpen = !Accordion.oneOpen;
		});

		// DList object terms
		const $dt = document.createElement('dt');
		$dt.className = 'Accordion--menu';

		// Append text node in in DList terms
		$dt.appendChild(ALink);

		// Append DList terms in container node (DList object)
		Accordion.node.appendChild($dt);

	}

}

export {
	DListComponent,
	DListComponentOptionsMenu
}

export default DListComponent;
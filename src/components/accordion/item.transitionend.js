/**
 * Functionality for the Accordion
 * This method is separated for the tests to have access to the event handler
 *
 */

/**
 * Event Handler (transitionend)
 * @param {Object} e Event
 */
function transitionend(e) {

	if (this === undefined) { return; }

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

export default transitionend;
import DListComponent from '../../src/components/accordion/item';
import transitionend from '../../src/components/accordion/item.transitionend';

import mockupData from '../../src/components/accordion/mockup-data';

describe('Test Functionality methods for Accordion', () => {

	let clock;

	let context = {
		onOpen: true
	};

	let mock_item = {
		node: null,
		data: mockupData[0],
		bArrow: false,
		isLink: false,
		isNewItem: false,
		has_dd: false
	};

	beforeEach(function () {
		clock = sinon.useFakeTimers();
		document.body.innerHTML = '<div id="accordion"><dl class="Accordion"></dl></div>';
	});

	afterEach(function () {
		clock.restore();
	});

	// MAIN DIV
	it('Existe el div con ID accordion', () => {
		expect(document.body.querySelector('div#accordion')).to.exist;
	});

	// DL
	it('El div con ID accordion contiene un DL List y con class Accordion', () => {
		const selector = document.body.querySelector('div#accordion dl');
		expect(selector).to.exist;
		expect(selector).to.have.class('Accordion')
	});

	it('El DL List contiene un DT y con un determinado texto', () => {

		mock_item.node = document.querySelector('dl');
		DListComponent.call(context, mock_item);

		expect(document.querySelector('dl dt')).to.exist;
		expect(document.querySelector('dl dt').innerHTML).to.equal('Title item 0');

		expect(document.querySelector('dl dt')).not.to.class('Accordion--link');
		// También
		// expect(document.querySelector('dl dt')).not.to.have.attribute('class', 'Accordion--link');

	});


	// DT
	it('Si el DT recibe el parámetro isLink=true debe tener una class determinada', () => {

		mock_item.isLink = true;
		mock_item.node = document.querySelector('dl');
		DListComponent.call(context, mock_item);

		expect(document.querySelector('dl dt')).to.class('Accordion--link');
		// También
		// expect(document.querySelector('dl dt')).to.have.attribute('class', 'Accordion--link');

	});

	it('Si el DT recibe el parámetro bArrow=true tendrá un icono flecha (tag: I)', () => {

		mock_item.bArrow = true;
		mock_item.node = document.querySelector('dl');
		DListComponent.call(context, mock_item);

		expect(document.querySelector('dl dt i')).to.exist;

	});

	it('Si el DT recibe los parámetros isLink=true y isNewItem=true debe tener una class determinada', () => {

		mock_item.isLink = true;
		mock_item.isNewItem = true;
		mock_item.node = document.querySelector('dl');
		DListComponent.call(context, mock_item);

		expect(document.querySelector('dl dt')).to.have.attribute('class', 'Accordion--link is-new');

		// A los 500 ms la clase is-new debe haber sido eliminada
		setTimeout(function () {
			expect(document.querySelector('dl dt')).to.have.attribute('class', 'Accordion--link');
		}, 500)
		clock.tick(500);

	});


	// DD
	it('El DL List no contiene un DD si no recibe el parámetro has_dd=true', () => {

		mock_item.node = document.querySelector('dl');
		DListComponent.call(context, mock_item);

		expect(document.querySelector('dl dd')).not.to.exist;

	});

	it('El DL List contiene un DD si recibe el parámetro has_dd=true y además tendrá una class determinada', () => {

		mock_item.has_dd = true;
		mock_item.node = document.querySelector('dl');
		DListComponent.call(context, mock_item);

		expect(document.querySelector('dl dd')).to.exist;
		expect(document.querySelector('dl dd')).to.class('is-close');
		// También
		// expect(document.querySelector('dl dd')).to.have.attribute('class', 'is-close');

	});

	it('El DD contiene un P y con un determinado texto', () => {

		mock_item.has_dd = true;
		mock_item.node = document.querySelector('dl');
		DListComponent.call(context, mock_item);

		expect(document.querySelector('dl dd p')).to.exist;
		expect(document.querySelector('dl dd p').innerHTML).to.equal('Description item 0');
		expect(document.querySelector('dl dd p')).not.to.have.attribute('class');
		// También
		// expect(document.querySelector('dl dd p')).not.to.class();

	});


	// EVENTOS -> DL -> DT + DD
	it('El DL List contiene un DT y un DD, recibe el parámetro isLink=true y has_dd=true y responde correctamente a su controlador de eventos', () => {

		// Primer click, expande la opción del acordeón, agrega la clase is-animating.
		// Segundo click, oculta la opción del acordeón y elimina la clase is-animating.
		// En el primer click establece un max-height para el elemento inmediatamente posterior.
		// En el segundo click elimina el max-height previamente establecido en el elemento inmediatamente posterior.

		mock_item.isLink = true;
		mock_item.has_dd = true;
		mock_item.node = document.querySelector('dl');
		DListComponent.call(context, mock_item);

		const $nextElementSibling = document.querySelector('dl dt').nextElementSibling;

		// Simula el evento transitionend
		const eventSimulateTransitionEnd = new Event('simulateTransitionEnd');
		document.querySelector('dl dt').addEventListener('simulateTransitionEnd', function (e) {
			transitionend.call(document.querySelector('dl dt'), e);
		}, false);


		// Existe DD
		expect($nextElementSibling).to.exist;
		// Existe DD con la clase "is-close"
		expect($nextElementSibling).to.class('is-close');

		// PRIMER CLICK
		document.querySelector('dl dt').click();

		expect(document.querySelector('dl dt')).to.class('is-animating');

		document.querySelector('dl dt').dispatchEvent(eventSimulateTransitionEnd);
		expect($nextElementSibling).to.class('is-open');

		// SEGUNDO CLICK
		document.querySelector('dl dt').click();

		expect(document.querySelector('dl dt')).not.to.class('is-animating');

		document.querySelector('dl dt').dispatchEvent(eventSimulateTransitionEnd);
		expect($nextElementSibling).to.class('is-close');

	});

});
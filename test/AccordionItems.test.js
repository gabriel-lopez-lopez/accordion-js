import AccordionItems from '../src/components/accordion/items';

import mockupData from '../src/components/accordion/mockup-data';


describe('AccordionItems Class test', () => {

	let accordionItems;

	beforeEach(() => {

		document.body.innerHTML = '<div id="app"><dl class="Accordion"></dl></div>';

		accordionItems = new AccordionItems({
			selector: '#app',
			node: document.querySelector('dl.Accordion'),
			dataItems: mockupData,
			oneOpen: true
		});

	});

	it('Verificar si se llamó al método appendData de la clase AccordionItems', () => {

		const spy = jest.spyOn(accordionItems, 'appendData');

		const isAppendData = accordionItems.appendData(mockupData);

		expect(accordionItems.appendData).toHaveBeenCalled();

		spy.mockReset();
		spy.mockRestore();

	});

});
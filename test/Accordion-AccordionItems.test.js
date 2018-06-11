import Accordion from '../src/components/accordion';
import AccordionItems from '../src/components/accordion/items';

import mockupData from '../src/components/accordion/mockup-data';

jest.mock('../src/components/accordion', () => {
	return jest.fn().mockImplementation(() => {
		return { appendData: () => { } };
	});
});

describe('AccordionItems Class test', () => {

	let accordion;
	let accordionItems;

	beforeEach(() => {

		document.body.innerHTML = '<div id="app"><dl class="Accordion"></dl></div>';

		accordion = new Accordion({
			selector: '#app',
			dataItems: mockupData,
			oneOpen: true
		});

		accordionItems = new AccordionItems({
			selector: '#app',
			node: document.querySelector('dl.Accordion'),
			dataItems: mockupData,
			oneOpen: true
		});

	});

	it('Verificar si se llamó al método appendData de la clase AccordionItems', () => {
		expect(Accordion).toHaveBeenCalledTimes(1);
		const spy = jest.spyOn(accordion, 'appendData');
		const isAppendData = accordion.appendData(mockupData);
		expect(accordion.appendData).toHaveBeenCalled();
		spy.mockReset();
		spy.mockRestore();
	});

});
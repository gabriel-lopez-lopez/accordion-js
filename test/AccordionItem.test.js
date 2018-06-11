import Accordion from '../src/components/accordion';
import DListComponent, { DListComponentOptionsMenu } from '../src/components/accordion/item';

import mockupData from '../src/components/accordion/mockup-data';

jest.mock('../src/components/accordion', () => {
	return jest.fn().mockImplementation(() => {
		return { appendData: () => { } };
	});
});


jest.mock('../src/components/accordion/item');

describe('Tests Functionality methods for Accordion test', () => {

	let Kaccordion;

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

	beforeEach(() => {
		document.body.innerHTML = '<div id="app"><dl class="Accordion"></dl></div>';

		Kaccordion = new Accordion({
			selector: '#app',
			dataItems: mockupData,
			oneOpen: true
		});

	});


	it('DListComponent es llamado correctamente y existe el nodo de tipo DL', () => {
		DListComponent.call(context, mock_item);
		expect(DListComponent).toBeCalled();
    });


	it('DListComponentOptionsMenu es llamado correctamente', () => {
		DListComponentOptionsMenu.call(Kaccordion);
		expect(DListComponentOptionsMenu).toBeCalled();
	});

});
import Accordion from '../src/components/accordion';

import mockupData from './mockup-data';

jest.mock('../src/components/accordion', () => {
	// Works and lets you check for constructor calls:
	return jest.fn().mockImplementation(() => {
		return { appendData: () => { } };
	});
});

describe('Accordion Class test', () => {

	let Kaccordion;

	beforeEach(() => {
		// Clear all instances and calls to constructor and all methods:
		Accordion.mockClear();
	});

	it('Verificar si se llamó al constructor de la clase Accordion', () => {

		Kaccordion = new Accordion({
			selector: '#app',
			dataItems: mockupData,
			oneOpen: true
		});

		expect(Accordion).toHaveBeenCalledTimes(1);
	});

	it('Verificar si se llamó al método appendData de la clase Accordion', () => {

		const spy = jest.spyOn(Kaccordion, 'appendData');
		const isAppendData = Kaccordion.appendData(mockupData);

		expect(Kaccordion.appendData).toHaveBeenCalled();

		spy.mockReset();
		spy.mockRestore();

	});

});
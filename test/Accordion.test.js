import Accordion from '../src/components/accordion';

import mockupData from '../src/components/accordion/mockup-data';

jest.mock('../src/components/accordion', () => {
	return jest.fn().mockImplementation(() => {
		return { appendData: () => { } };
	});
});

describe('Accordion Class test', () => {

	let Kaccordion;

	beforeEach(() => {
		Accordion.mockClear();

		Kaccordion = new Accordion({
			selector: '#app',
			dataItems: mockupData,
			oneOpen: true
		});

	});

	it('Verificar si se llamó al constructor de la clase Accordion', () => {
		expect(Accordion).toHaveBeenCalledTimes(1);
	});

	it('Verificar si se llamó al método appendData de la clase Accordion', () => {
		const spy = jest.spyOn(Kaccordion, 'appendData');
		Kaccordion.appendData(mockupData);
		expect(Kaccordion.appendData).toHaveBeenCalled();
		spy.mockReset();
		spy.mockRestore();
	});

});
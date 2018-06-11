import Accordion from '../src/components/accordion';
import ButtonAddItems from '../src/components/button';

import mockupData from '../src/components/accordion/mockup-data';

jest.mock('../src/components/button', () => {
	return jest.fn().mockImplementation(() => {
		return { appendData: () => mockupData };
	});
});

describe('ButtonAddItems Class test', () => {

	let KButtonAddItems;

	beforeEach(() => {
		ButtonAddItems.mockClear();

        document.body.innerHTML = '<div id="app"><div id="button"></div></div>';

		KButtonAddItems = new ButtonAddItems({
            selector: '#button',
            onClick: () => this.onSuccess,
            onSuccess: () => {}
		});

	});

    it('Verificar si se llamó al constructor de la clase ButtonAddItems', () => {
		expect(ButtonAddItems).toHaveBeenCalledTimes(1);
    });

	it('Verificar si se llamó al método appendData de la clase ButtonAddItems y retornó un valor concreto', () => {

        const spy = jest.spyOn(KButtonAddItems, 'appendData');
        const resAppendData = KButtonAddItems.appendData(mockupData);

        expect(KButtonAddItems.appendData).toHaveBeenCalled();
        expect(resAppendData).toEqual(mockupData);

		spy.mockReset();
        spy.mockRestore();

	});

});
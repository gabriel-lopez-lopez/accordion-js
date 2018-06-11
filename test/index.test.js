import Accordion  from '../src/components/accordion';
import FooterContent from '../src/components/footer';
import ButtonAddItems from '../src/components/button';

import mockupData from '../src/components/accordion/mockup-data';

jest.mock('../src/components/accordion', () => {
	return jest.fn().mockImplementation(() => {
		return {}
	});
});

jest.mock('../src/components/footer', () => {
	return jest.fn().mockImplementation(() => {
		return {}
	});
});

jest.mock('../src/components/button', () => {
	return jest.fn().mockImplementation(() => {
		return { appendData: () => {

		}}
	});
});

describe('Test for Components in Main Page', () => {

	beforeEach(() => {
		Accordion.mockClear();
		FooterContent.mockClear();
		ButtonAddItems.mockClear();
	});

	it('Componente Accordion se instancia correctamente', () => {
		document.body.innerHTML = '<div id="app"></div>';
		const KAccordion = new Accordion({
			selector: '#app',
			dataItems: mockupData,
			oneOpen: true
		});
		expect(Accordion).toHaveBeenCalledTimes(1);
	});


	it('Componente FooterContent se instancia correctamente', () => {
		document.body.innerHTML = '<div id="app"></div>';
		const KFooterContent = new FooterContent({
			selector: '#app'
        });
		expect(FooterContent).toHaveBeenCalledTimes(1);
    });


	it('Componente ButtonAddItems se instancia correctamente', () => {
		document.body.innerHTML = '<div id="app"></div>';
        const KButtonAddItems = new ButtonAddItems({
            selector: '#app'
        });
		expect(ButtonAddItems).toHaveBeenCalledTimes(1);
    });

});
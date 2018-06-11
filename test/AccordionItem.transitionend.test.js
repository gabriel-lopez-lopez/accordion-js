import transitionend from '../src/components/accordion/item.transitionend';

jest.mock('../src/components/accordion/item.transitionend');

describe('Tests Functionality for transitionend method', () => {

	beforeEach(() => {
		transitionend.mockClear();
	});


	it('transitionend es llamado correctamente', () => {
		transitionend.call({}, {});
		expect(transitionend).toBeCalled();
    });

});
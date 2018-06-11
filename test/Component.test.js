import Component from '../src/lib/Component';

jest.mock('../src/lib/Component', () => {
	return jest.fn().mockImplementation(() => {
		return {}
	});
});

describe('Component Class test', () => {

	let Kcomponent;

	beforeEach(() => {
		Component.mockClear();
		document.body.innerHTML = '<div id="app"></div>';
	});


	it('Verificar si se llamó al constructor de la clase Componente con el selector y se encontró este', () => {
		Kcomponent = new Component({
			selector: '#app'
		});
		expect(Component).toHaveBeenCalledTimes(1);
	});


	it('Verificar si se llamó al constructor de la clase Componente con el selector y no se encontró este producciendo una excepción', () => {
		Kcomponent = new Component({
			// invalid selector
			selector: '#app2'
		});
		expect(Component).not.toThrow();
	});

});
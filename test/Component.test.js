import Component from '../src/lib/Component';

jest.mock('../src/lib/Component', () => {
	// Works and lets you check for constructor calls:
	return jest.fn().mockImplementation(() => {
		return {}
	});
});

describe('Component Class test', () => {

	let Kcomponent;

	beforeEach(() => {
		// Clear all instances and calls to constructor and all methods:
		Component.mockClear();
	});

	it('Verificar si se llamó al constructor de la clase Componente con el selector y se encontró este', () => {

		document.body.innerHTML = '<div id="app"></div>';

		Kcomponent = new Component({
			selector: '#app'
		});

		expect(Component).toHaveBeenCalledTimes(1);

	});


	it('Verificar si se llamó al constructor de la clase Componente con el selector y no se encontró este producciendo una excepción', () => {

		document.body.innerHTML = '<div id="app"></div>';

		Kcomponent = new Component({
			// invalid selector
			selector: '#app2'
		});

		expect(Component).not.toThrow();

	});

});
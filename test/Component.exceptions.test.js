import Component from '../src/lib/Component';
import ErrorException from '../src/lib/ErrorException';


describe('Component Class test', () => {

	it('Verificar si se produce una excepción cuando se llamó al constructor de la clase Componente sin pasar ningún argumento', () => {

		const exception = new ErrorException('Class Component required a valid selector.');

		const fn = () => new Component();

		expect(fn).toThrow(exception);

	});


	it('Verificar si se lanza la excepción cuando se llamó al constructor de la clase Componente sin pasar un selector', () => {

		const exception = new ErrorException('Class Component required a valid selector.');

		const fn = () => new Component({});

		expect(fn).toThrow(exception);

	});


	it('Verifica la excepción retornada indicando nombre de la excepción', () => {
		const excepcion = new ErrorException('mensaje', 'ERROREXCEPTION');
		expect(excepcion).toEqual({ message: 'mensaje', name: 'ERROREXCEPTION' });
	});


	it('Verifica la excepción retornada cuando no se indica nombre de la excepción', () => {
		const excepcion = new ErrorException('mensaje');
		expect(excepcion).toEqual({ message: 'mensaje', name: 'ErrorException' });
	});

});
import ErrorException from '../src/lib/ErrorException';

describe('ErrorException test', () => {

	it('Verifica la excepción retornada indicando nombre de la excepción', () => {
		const exception = new ErrorException('mensaje', 'ERROREXCEPTION');
		expect(exception).toEqual({ message: 'mensaje', name: 'ERROREXCEPTION' });
	});


	it('Verifica la excepción retornada cuando no se indica nombre de la excepción', () => {
		const exception = new ErrorException('mensaje');
		expect(exception).toEqual({ message: 'mensaje', name: 'ErrorException' });
	});

});
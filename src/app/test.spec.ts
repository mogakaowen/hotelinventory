import { Calculator } from './test';

describe('test', () => {
    it('should add 2 numbers', () => {
        const test = new Calculator();
        expect(test.add(1, 2)).toEqual(3);
    });

    it('should subtract 2 numbers', () => {
        const test = new Calculator();
        expect(test.subtract(1, 2)).toEqual(-1);
    });

    it('should multiply 2 numbers', () => {
        const test = new Calculator();
        expect(test.multiply(1, 2)).toEqual(2);
    });

    it('should divide 2 numbers', () => {
        const test = new Calculator();
        expect(test.divide(1, 2)).toEqual(0.5);
    });
}
)
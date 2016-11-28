/* eslint-env node, mocha */

const expect = require('chai').expect;

const BaseError = require('../lib/error');

describe('Error', () => {
    it('should create simple error', () => {
        const error = new BaseError({code: 'some_error'});
        expect(error.code).to.be.equal('some_error');

        expect(error.message).to.be.equal('[code=some_error]');
    });

    it('should not create error with no code', () => {
        expect(() => new BaseError()).to.throw(Error);
    });

    it('should create complex error', () => {
        const parentError = new Error();
        const error = new BaseError({
            code: 'some_error_code',
            error: parentError,
            message: 'this is my message',
            extra: {
                key: 'value'
            }
        });

        expect(error.code).to.be.equal('some_error_code');
        expect(error.message)
            .to.be.equal('[code=some_error_code,key=value] this is my message');
        expect(error.error).to.be.equal(parentError);
        expect(error.extra).to.be.deep.equal({key: 'value'});
    });
});

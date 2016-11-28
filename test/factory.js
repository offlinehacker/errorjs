/* eslint-env node, mocha */

const expect = require('chai').expect;

const ErrorFactory = require('../lib/factory');
const GeneralError = require('../lib/error');

describe('ErrorFactory', () => {
    it('should create a new ErrorFactory', () => new ErrorFactory());

    it('should create error using ErrorFactory', () => {
        const errorFactory = new ErrorFactory();
        const error = new errorFactory.GeneralError({code: 'some_error_code'});

        expect(error).to.be.instanceof(GeneralError);
    });

    it('should create error with context', () => {
        const errorFactory = new ErrorFactory({
            namespace: 'abcd'
        });
        const error = new errorFactory.GeneralError({code: 'some_error_code'});

        expect(error.extra).to.be.deep.equal({namespace: 'abcd'});
    });
});

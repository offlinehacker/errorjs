// @flow

/* eslint-env node, mocha */

const expect = require('chai').expect;

const ErrorFactory = require('../lib/factory');
const GeneralError = require('../lib/error');

describe('ErrorFactory', () => {
    it('should create a new ErrorFactory', () => {
        new ErrorFactory(); // eslint-disable-line no-new
    });

    it('should create error using ErrorFactory', () => {
        const errorFactory = new ErrorFactory();
        const error = new errorFactory.GeneralError('some_error_code');

        expect(error).to.be.instanceof(GeneralError);
    });

    it('should create error with context', () => {
        const parentErrorFactory = new ErrorFactory();
        const errorFactory = parentErrorFactory.withContext({namespace: 'abcd'});
        const error = new errorFactory.GeneralError('some_error_code');

        expect(error.context).to.be.deep.equal({namespace: 'abcd'});
        expect(error).to.be.instanceof(parentErrorFactory.GeneralError);
    });

    it('should extend factory', () => {
        const factory = new ErrorFactory();

        class MyError extends factory.GeneralError {
            constructor(message: string) {
                super('my_code', message);
            }
        }

        class MyErrorFactory extends factory.ErrorFactory {
            MyError: typeof MyError;

            constructor(context: ?Object) {
                super(context);

                this.MyError = MyError.withContext(context);
            }
        }

        const myFactory = new MyErrorFactory();

        let error = new myFactory.MyError('some_code');
        expect(error).to.be.instanceof(MyError);

        const contextualFactory: MyErrorFactory = myFactory.withContext({key: 'value'});
        error = new contextualFactory.MyError('some_code');
        expect(error.context).to.be.deep.equal({key: 'value'});
    });
});

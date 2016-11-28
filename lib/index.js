// @flow

const ErrorFactory = require('./factory');
const GeneralError = require('./error');
const errors = require('./errors');

class ExtendedErrorFactory extends ErrorFactory {
    errors: *;
    GeneralError: Class<GeneralError>;
    ErrorFactory: Class<ErrorFactory>;

    constructor(context: *) {
        super(context);

        this.errors = errors;
        this.GeneralError = GeneralError;
        this.ErrorFactory = ErrorFactory;
    }
}

module.exports = new ExtendedErrorFactory();

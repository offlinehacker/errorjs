// @flow

const ErrorFactory = require('./factory');
const GeneralError = require('./error');
const errors = require('./errors');

class ExtendedErrorFactory extends ErrorFactory {
    errors: *;
    GeneralError: Class<GeneralError>;

    constructor(context: *) {
        super(context);

        this.errors = errors;
        this.GeneralError = GeneralError;
    }
}

module.exports = new ExtendedErrorFactory();

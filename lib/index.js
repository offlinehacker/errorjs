// @flow

const ErrorFactory = require('./factory');
const Error = require('./error');
const errors = require('./errors');

class ExtendedErrorFactory extends ErrorFactory {
    errors: *;
    Error: Class<Error>;
    ErrorFactory: Class<ErrorFactory>;

    constructor(context: *) {
        super(context);

        this.errors = errors;
        this.Error = Error;
        this.ErrorFactory = ErrorFactory;
    }
}

module.exports = new ExtendedErrorFactory();

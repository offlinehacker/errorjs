// @flow

const ErrorFactory = require('./factory');
const errors = require('./errors');

class ExtendedErrorFactory extends ErrorFactory {
    Factory: typeof ExtendedErrorFactory;

    NotImplementedError: typeof errors.NotImplementedError;
    NotFoundError: typeof errors.NotFoundError;
    UnauthorizedError: typeof errors.UnauthorizedError;
    ConnectionError: typeof errors.ConnectionError;
    ValidationError: typeof errors.ValidationError;
    ConflictError: typeof errors.ConflictError;
    LogicalError: typeof errors.LogicalError;
    InternalError: typeof errors.InternalError;

    constructor(context: ?Object) {
        super(context);

        this.NotImplementedError = errors.NotImplementedError.withContext(context);
        this.NotFoundError = errors.NotFoundError.withContext(context);
        this.UnauthorizedError = errors.UnauthorizedError.withContext(context);
        this.ConnectionError = errors.ConnectionError.withContext(context);
        this.ValidationError = errors.ValidationError.withContext(context);
        this.ConflictError = errors.ConflictError.withContext(context);
        this.LogicalError = errors.LogicalError.withContext(context);
        this.InternalError = errors.InternalError.withContext(context);
    }

    get ErrorFactory(): typeof ExtendedErrorFactory {
        return ExtendedErrorFactory;
    }
}

module.exports = new ExtendedErrorFactory();

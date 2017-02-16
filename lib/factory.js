// @flow

import type {ErrorParameters} from './error';

const GeneralError = require('./error');
const errors = require('./errors');

/** Error factory which optionally attaches context to errors */
class ErrorFactory {
    /**
     * Context to allways pass to errror as extra parameter
     *
     * @private
     */
    _context: Object;

    GeneralError: typeof GeneralError;
    NotImplementedError: typeof errors.NotImplementedError;
    NotFoundError: typeof errors.NotFoundError;
    UnauthorizedError: typeof errors.UnauthorizedError;
    ConnectionError: typeof errors.ConnectionError;
    ValidationError: typeof errors.ValidationError;
    ConflictError: typeof errors.ConflictError;
    LogicalError: typeof errors.LogicalError;
    InternalError: typeof errors.InternalError;

    constructor(context /* :: :Object */ = {}) {
        this._context = context;

        this.intialize();
    }

    intialize() {
        this.GeneralError = this._extend(GeneralError);

        this.NotImplementedError = this._extend(errors.NotImplementedError);
        this.NotFoundError = this._extend(errors.NotFoundError);
        this.UnauthorizedError = this._extend(errors.UnauthorizedError);
        this.ConnectionError = this._extend(errors.ConnectionError);
        this.ValidationError = this._extend(errors.ValidationError);
        this.ConflictError = this._extend(errors.ConflictError);
        this.LogicalError = this._extend(errors.LogicalError);
        this.InternalError = this._extend(errors.InternalError);
    }

    _extend<C: Error>(Type: Class<C>): * {
        const context = this._context;
        return class extends Type {
            namespace: string

            constructor(options: ErrorParameters) {
                options.extra = Object.assign(options.extra || {}, context);
                super(options);

                this.name = super.constructor.name;
            }
        };
    }

    withContext(context /* :: : Object */ = {}) {
        return new ErrorFactory(context);
    }
}

module.exports = ErrorFactory;

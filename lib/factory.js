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

    _base: ?Object;

    GeneralError: typeof GeneralError;
    NotImplementedError: typeof errors.NotImplementedError;
    NotFoundError: typeof errors.NotFoundError;
    UnauthorizedError: typeof errors.UnauthorizedError;
    ConnectionError: typeof errors.ConnectionError;
    ValidationError: typeof errors.ValidationError;
    ConflictError: typeof errors.ConflictError;
    LogicalError: typeof errors.LogicalError;
    InternalError: typeof errors.InternalError;

    constructor(context /* :: :Object */ = {}, base?: ErrorFactory) {
        this._context = context;
        this._base = base;

        this.intialize();
    }

    intialize() {
        const baseOrErrors = this._base || errors;

        this.GeneralError = this._extend(baseOrErrors.GeneralError);

        this.NotImplementedError = this._extend(baseOrErrors.NotImplementedError);
        this.NotFoundError = this._extend(baseOrErrors.NotFoundError);
        this.UnauthorizedError = this._extend(baseOrErrors.UnauthorizedError);
        this.ConnectionError = this._extend(baseOrErrors.ConnectionError);
        this.ValidationError = this._extend(baseOrErrors.ValidationError);
        this.ConflictError = this._extend(baseOrErrors.ConflictError);
        this.LogicalError = this._extend(baseOrErrors.LogicalError);
        this.InternalError = this._extend(baseOrErrors.InternalError);
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
        return new ErrorFactory(context, this);
    }
}

module.exports = ErrorFactory;

// @flow

const GeneralError = require('./error');

/**
 * Error factory which optionally attaches context to errors
 *
 * Extending Factory with custom errors:
 *
 * @example
 *
 * const errors = require('errorjs');
 *
 * class MyError extends errors.NotFoundError {}
 *
 * class MyErrorFactory extends errors.ErrorFactory {
 *     MyError: typeof MyError
 *
 *     constructor(context: ?Object) {
 *         super(context);
 *
 *         this.MyError = MyError.withContext(context);
 *     }
 * }
 *
 * module.exports = new MyErrorFactory();
 */
class ErrorFactory {
    GeneralError: typeof GeneralError;

    constructor(context: ?Object) {
        this.GeneralError = GeneralError.withContext(context);
    }

    /**
     * Defines factory class with predefined context. This allows to reuse error
     * context.
     *
     * @example
     *
     * const errors = require('errorjs');
     *
     * const userErrors = errors.withContext({
     *   userId: 'afece0d2-53a9-4610-b3de-0a8501cd3b91'
     * });
     *
     * const error = new userErrors.UnauthorizedError('user_not_allowed');
     */
    withContext<F: ErrorFactory>(context: ?Object): F {
        const factory = new this.constructor(context);

        return (factory: any);
    }

    get ErrorFactory(): typeof ErrorFactory {
        return ErrorFactory;
    }
}

module.exports = ErrorFactory;

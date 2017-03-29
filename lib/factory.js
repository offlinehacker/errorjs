// @flow

import type {ErrorParameters} from './error';

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
 * class MyErrorFactory extends errors.Factory {
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

    withContext<F: ErrorFactory>(context: ?Object): F {
        const factory = new this.constructor(context);

        return (factory: any);
    }

    get Factory(): typeof ErrorFactory {
        return ErrorFactory;
    }
}

module.exports = ErrorFactory;

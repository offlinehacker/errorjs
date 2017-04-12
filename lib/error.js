// @flow

/**
 * GeneralError
 *
 * Base error for all other errors
 *
 * @example
 *
 * **Extending an error:**
 *
 * const GeneralError = require('errorjs').GeneralError;
 *
 * class MyFatalError extends GeneralError {
 *   get meta() {
 *     return {httpCode: 500}
 *   }
 * }
 */
// $FlowFixMe
class GeneralError extends Error {
    /**
     * Error id
     *
     * @example n8lqujm20w4ckw40scss0o8coco0o004k0oc808o0osksooc'
     */
    id: string;

    /**
     * Error message
     *
     * @example User was not found
     */
    message: string;

    /**
     * Error name
     *
     * @default this.constructor.name
     * @example NotFoundError
     */
    get name(): string {
        return this.constructor.name;
    }

    /**
     * Code of the error
     *
     * @example user_not_found
     */
    get code(): string {
        return this._code;
    }

    /**
     * Context associated with an error
     *
     * @example {"namespace": "errors"}
     */
    get context(): Object {
        return this._context;
    }

    /**
     * Errors associated with this error
     */
    get errors(): Array<Error> {
        return this._errors;
    }

    /**
     * Error meta data
     *
     * @example {httpCode: 400}
     */
    get meta(): Object {
        return {};
    }

    _id: string;
    _code: string;
    _message: ?string;
    _errors: Array<Error>;
    _context: Object

    /** Creates new error */
    constructor(code: string, ...args: Array<Error | Object | string>) {
        super('');

        if (!code) {
            throw new Error('error code must be defined');
        }

        this._errors = [];
        this._context = {};
        for (const arg of args) {
            if (arg instanceof Error) {
                this._errors.push(arg);
            } else if (typeof arg === 'string') {
                this._message = arg;
            } else if (typeof arg === 'object') {
                Object.assign(this._context, arg);
            }
        }

        this._code = code;
        this._id = Math.round(
            (Math.pow(36, 48 + 1) - (Math.random() * Math.pow(36, 48)))
        ).toString(36).slice(1);

        const extraMessage = this._toKVString(
            Object.assign({}, {code: this.code}, this.context)
        );

        this.message = this._message ?
            `[${(extraMessage: any)}] ${this._message}` : `[${(extraMessage: any)}]`;

        for (const error of this._errors) {
            this.message += `\n  ${error.toString().split('\n').join('\n  ')}`;
        }
    }

    /** Converts error to JSON */
    toJSON() {
        return {
            id: this.id,
            code: this.code,
            message: this.message,
            context: this.context
        };
    }

    _toKVString(obj: Object) {
        const result = [];

        Object.keys(obj).forEach(key => {
            result.push(`${key}=${(obj[key]: any)}`);
        });

        return result.join(',');
    }

    /**
     * Defines error class with predefined context. This allows to reuse error
     * context.
     *
     * Note: this is usually used by factory to define group of errors with
     * some context.
     *
     * @example
     *
     * const errors = require('errorjs');
     *
     * const userUnauthorizedError = new errors.UnauthorizedError.withContext({
     *   userId: 'afece0d2-53a9-4610-b3de-0a8501cd3b91'
     * });
     *
     * const error = new userUnauthorizedError('user_not_allowed');
     */
    static withContext<E: GeneralError>(context: ?Object): Class<E> {
        if (!context) {
            return (this: any);
        }

        return (class extends this {
            get context() {
                return Object.assign(super.context, context);
            }

            get name() {
                return super.constructor.name;
            }
        }: any);
    }
}

module.exports = GeneralError;

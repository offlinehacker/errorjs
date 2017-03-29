// @flow

export type ErrorParameters = {
    error?: Error;
    context?: Object;
};

/**
 * GeneralError
 *
 * Base error for all other errors
 *
 * @example
 *
 * const GeneralError = require('errorjs').GeneralError;
 *
 * class MyFatalError extends GeneralError {
 *   constructor() {
 *      get meta() {
 *          return {httpCode: 500}
 *      }
 *   }
 * }
 */
class GeneralError extends Error {
    /**
     * Error id
     *
     * @example n8lqujm20w4ckw40scss0o8coco0o004k0oc808o0osksooc'
     */
    id: string;

    /**
     * Error name
     *
     * @example NotFoundError
     */
    name: string;

    /**
     * Error message
     *
     * @example User was not found
     */
    message: string;

    /**
     * Code of the error
     *
     * @example user_not_found
     */
    get code(): string {
        return this._code;
    }

    /** Parrent error */
    get error(): ?Error {
        return this._error;
    }

    /**
     * Extra error information
     *
     * @example {"namespace": "errors"}
     */
    get context(): Object {
        return this._context;
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
    _error: ?Error;
    _context: Object

    /** Creates new error */
    constructor(code: string, message: ?string, {
        error,
        context = {}
    }: ErrorParameters = {}) {
        super('');

        if (!code) {
            throw new Error('error code must be defined');
        }

        this.name = this.constructor.name;
        this._code = code;
        this._error = error;
        this._context = context;
        this._id = Math.round(
            (Math.pow(36, 48 + 1) - (Math.random() * Math.pow(36, 48)))
        ).toString(36).slice(1);

        const extraMessage = this._toKVString(
            Object.assign({}, {code: this.code}, this.context)
        );

        this.message = message ?
            `[${(extraMessage: any)}] ${message}` : `[${(extraMessage: any)}]`;
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

        for (const [key, val] of Object.entries(obj)) {
            result.push(`${key}=${(val: any)}`);
        }

        return result.join(',');
    }

    static withContext<E: GeneralError>(context: ?Object): Class<E> {
        if (!context) {
            return (this: any);
        }

        return (class extends this {
            get context() {
                return Object.assign(super.context, context);
            }

            constructor(code: string, message: ?string, options: ErrorParameters) {
                super(code, message, options);

                this.name = super.constructor.name;
            }
        }: any);
    }
}

module.exports = GeneralError;

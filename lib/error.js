// @flow

export type ErrorParameters = {
    code: string;
    message?: string;
    error?: Error;
    meta?: Object;
    extra?: Object;
};

/**
 * GeneralError
 *
 * Base error for all other errors
 *
 * @example
 *
 * const GeneralError = require('errorjs/error');
 *
 * class MyFatalError extends GeneralError {
 *   constructor() {
 *      super(Object.assign(options, {
 *          meta: {httpCode: 500}
 *      }));
 *   }
 * }
 */
class GeneralError extends Error {
    /**
     * Error id
     *
     * @example n8lqujm20w4ckw40scss0o8coco0o004k0oc808o0osksooc'
     */
    id: string

    /**
     * Error name
     *
     * @example NotFoundError
     */
    name: string

    /**
     * Code of the error
     *
     * @example user_not_found
     */
    code: string

    /**
     * Error message
     *
     * @example User was not found
     */
    message: string

    /** Parrent error */
    error: ?Error

    /**
     * Extra error information
     *
     * @example {"namespace": "errors"}
     */
    extra: Object

    /**
     * Error meta data
     *
     * @example {httpCode: 400}
     */
    meta: Object

    /** Creates new error */
    constructor({
        code,
        error,
        message = '',
        meta = {},
        extra = {}
    }: ErrorParameters) {
        super('');

        if (!code) {
            throw new Error('error code must be defined');
        }

        this.name = this.constructor.name;
        this.code = code;
        this.error = error;
        this.meta = meta;
        this.extra = extra;
        this.id = Math.round(
            (Math.pow(36, 48 + 1) - (Math.random() * Math.pow(36, 48)))
        ).toString(36).slice(1);

        const extraMessage = this._toKVString(
            Object.assign({}, {code: this.code}, extra)
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
            extra: this.extra
        };
    }

    _toKVString(obj: Object) {
        const result = [];

        for (const [key, value] of Object.entries(obj)) {
            result.push(`${key}=${(value: any)}`);
        }

        return result.join(',');
    }
}

module.exports = GeneralError;

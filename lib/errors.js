// @flow

import type {ErrorParameters} from './error';

const GeneralError = require('./error');

/**
 * NotImplementedError
 *
 * Error raised when functionality is not implemented
 */
class NotImplementedError extends GeneralError {
    constructor(options: ErrorParameters) {
        super(Object.assign(options, {meta: {httpCode: 501}}));
    }
}

/**
 * InternalError
 *
 * Error raised when there has been internal error
 */
class InternalError extends GeneralError {
    constructor(options: ErrorParameters) {
        super(Object.assign(options, {meta: {httpCode: 500}}));
    }
}

/**
 * NotFoundError
 *
 * Error raised when something is not found
 */
class NotFoundError extends GeneralError {
    constructor(options: ErrorParameters) {
        super(Object.assign(options, {meta: {httpCode: 404}}));
    }
}

/**
 * UnauthorizedError
 *
 * Error raised when access has been unauthorized
 */
class UnauthorizedError extends GeneralError {
    constructor(options: ErrorParameters) {
        super(Object.assign(options, {meta: {httpCode: 401}}));
    }
}

/**
 * ConnectionError
 *
 * Error raised when there has been error with a connection
 */
class ConnectionError extends GeneralError {
    constructor(options: ErrorParameters) {
        super(Object.assign(options, {meta: {httpCode: 504}}));
    }
}

/**
 * ValidationError
 *
 * Error raised when there has been error with validation
 */
class ValidationError extends GeneralError {
    constructor(options: ErrorParameters) {
        super(Object.assign(options, {meta: {httpCode: 400}}));
    }
}

/**
 * ConflictError
 *
 * Error raised when there has been conflict
 */
class ConflictError extends GeneralError {
    constructor(options: ErrorParameters) {
        super(Object.assign(options, {meta: {httpCode: 409}}));
    }
}

/**
 * LogicalError
 *
 * Error raised when there was error in a logic
 */
class LogicalError extends GeneralError {
    constructor(options: ErrorParameters) {
        super(Object.assign(options, {meta: {httpCode: 422}}));
    }
}

module.exports = {
    GeneralError,
    NotImplementedError,
    InternalError,
    NotFoundError,
    UnauthorizedError,
    ConnectionError,
    ValidationError,
    ConflictError,
    LogicalError
};

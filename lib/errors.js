// @flow

const GeneralError = require('./error');

/**
 * NotImplementedError
 *
 * Error raised when functionality is not implemented
 */
class NotImplementedError extends GeneralError {
    get meta(): Object {
        return {httpCode: 500};
    }
}

/**
 * InternalError
 *
 * Error raised when there has been internal error
 */
class InternalError extends GeneralError {
    get meta(): Object {
        return {httpCode: 500};
    }
}

/**
 * NotFoundError
 *
 * Error raised when something is not found
 */
class NotFoundError extends GeneralError {
    get meta(): Object {
        return {httpCode: 404};
    }
}

/**
 * UnauthorizedError
 *
 * Error raised when access has been unauthorized
 */
class UnauthorizedError extends GeneralError {
    get meta(): Object {
        return {httpCode: 401};
    }
}

/**
 * ConnectionError
 *
 * Error raised when there has been error with a connection
 */
class ConnectionError extends GeneralError {
    get meta(): Object {
        return {httpCode: 504};
    }
}

/**
 * ValidationError
 *
 * Error raised when there has been error with validation
 */
class ValidationError extends GeneralError {
    get meta(): Object {
        return {httpCode: 400};
    }
}

/**
 * ConflictError
 *
 * Error raised when there has been conflict
 */
class ConflictError extends GeneralError {
    get meta(): Object {
        return {httpCode: 409};
    }
}

/**
 * LogicalError
 *
 * Error raised when there was error in a logic
 */
class LogicalError extends GeneralError {
    get meta(): Object {
        return {httpCode: 422};
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

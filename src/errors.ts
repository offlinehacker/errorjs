import BaseError from "./error";
import ErrorFactory from "./factory";

export default class ExtendedErrorFactory extends ErrorFactory {
  BaseError = class HttpBaseError extends BaseError {
    httpCode: number = 500;
  };

  /**
   * NotImplementedError
   *
   * Error raised when functionality is not implemented
   */
  NotImplementedError = this.defineErrorClass(
    class NotImplementedError extends this.BaseError {}
  );

  /**
   * InternalError
   *
   * Error raised when there has been internal error
   */
  InternalError = this.defineErrorClass(
    class InternalError extends this.BaseError {}
  );

  /**
   * NotFoundError
   *
   * Error raised when something is not found
   */
  NotFoundError = this.defineErrorClass(
    class NotFoundError extends this.BaseError {
      httpCode = 404;
    }
  );

  /**
   * UnauthorizedError
   *
   * Error raised when access has been unauthorized
   */
  UnauthorizedError = this.defineErrorClass(
    class UnauthorizedError extends this.BaseError {
      httpCode = 401;
    }
  );

  /**
   * ConnectionError
   *
   * Error raised when there has been error with a connection
   */
  ConnectionError = this.defineErrorClass(
    class ConnectionError extends this.BaseError {
      httpCode = 504;
    }
  );

  /**
   * ValidationError
   *
   * Error raised when there has been error with validation
   */
  ValidationError = this.defineErrorClass(
    class ValidationError extends this.BaseError {
      httpCode = 400;
    }
  );

  /**
   * ConflictError
   *
   * Error raised when there has been conflict
   */
  ConflictError = this.defineErrorClass(
    class ConflictError extends this.BaseError {
      httpCode = 409;
    }
  );

  /**
   * LogicalError
   *
   * Error raised when there was error in a logic
   */
  LogicalError = this.defineErrorClass(
    class LogicalError extends this.BaseError {
      httpCode = 422;
    }
  );
}

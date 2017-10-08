import BaseError from "./error";

export type Constructor<T = {}> = {
  stackTraceLimit: number;

  new (...args: any[]): T;
  withContext<E extends typeof BaseError>(this: E, context?: Object): E;
  captureStackTrace(thisArg: any, func: any): void;
};

/**
 * BaseErrorFactory
 *
 * BaseErrorFactory is factory for errors, that all other error factories
 * inherit from. It provides error class registration and global error context.
 */
export default class BaseErrorFactory<
  T extends Constructor<BaseError> = typeof BaseError
> {
  BaseError: T = BaseError as any;
  context: Object;

  constructor(context = {}) {
    this.context = context;
  }

  /**
   * Defines a new error class on ErrorFactory
   *
   * @example
   *
   * class MyErrorFactory extends BaseErrorFactory {
   *   MyError = this.defineErrorClass(
   *     class MyError extends this.BaseError {}
   *   );
   * }
   *
   * const factory = new MyErrorFactory();
   *
   * throw new factory.MyError('some_error_code');
   */
  defineErrorClass<T extends typeof BaseError>(error: T): T {
    return error.withContext(this.context);
  }

  /**
   * Creates new error factory with global error context that
   * is avalible on all errors defined on returned error factory.
   *
   * @example
   *
   * class MyErrorFactory extends BaseErrorFactory {
   *   MyError = this.defineErrorClass(
   *     class MyError extends this.BaseError {}
   *   );
   * }
   *
   * const contextualErrorFactory = new MyErrorFactory().withContext({
   *   userId: '123-123'
   * });
   *
   * const error = new contextualErrorFactory.MyError('some_error_code');
   *
   * error.context; // {userId: '123-123'}
   */
  withContext<F extends BaseErrorFactory<T>>(this: F, context: Object = {}): F {
    context = Object.assign({}, context, this.context);

    return new (this.constructor as typeof BaseErrorFactory)(context) as any;
  }
}

import BaseError from "./error";

export type Constructor<T = {}> = {
  stackTraceLimit: number;

  new (...args: any[]): T;
  withContext<E extends typeof BaseError>(this: E, context?: Object): E;
  captureStackTrace(thisArg: any, func: any): void;
};

export default class BaseErrorFactory<
  T extends Constructor<BaseError> = typeof BaseError
> {
  BaseError: T = BaseError as any;
  context: Object;

  constructor(context = {}) {
    this.context = context;
  }

  defineErrorClass<T extends typeof BaseError>(error: T): T {
    return error.withContext(this.context);
  }

  withContext<F extends BaseErrorFactory<T>>(this: F, context: Object = {}): F {
    context = Object.assign({}, context, this.context);

    return new (this.constructor as typeof BaseErrorFactory)(context) as any;
  }
}

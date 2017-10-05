/**
 * BaseError
 *
 * BaseError is base class for all other errors
 */
export default class BaseError extends Error {
  /**
   * Error id
   *
   * @example n8lqujm20w4ckw40scss0o8coco0o004k0oc808o0osksooc'
   */
  public id: string = Math.round(
    Math.pow(36, 48 + 1) - Math.random() * Math.pow(36, 48)
  )
    .toString(36)
    .slice(1);

  /**
   * Code of the error
   *
   * @example user_not_found
   */
  public code: string;

  /**
   * Error name
   *
   * @default this.constructor.name
   * @example NotFoundError
   */
  public name: string = this.constructor.name;

  /**
   * Error message
   *
   * @example [code=user_not_found] user was not found in database
   */
  public message: string;

  /**
   * Message that user passed into error
   */
  public errorMessage?: string;

  /**
   * User formatted message
   */
  public get userMessage() {
    return this.errorMessage || this.defaultUserMessage;
  }

  /**
   * Array of child errors passed to this error
   */
  public errors: Array<Error> = [];

  /**
   * Context assicated with an error
   *
   * @example {username: 'someuser'}
   */
  public context: any = {};

  public defaultUserMessage: string;

  /** Creates new error */
  constructor(code: string, ...args: Array<Error | Object | string>) {
    super("");

    if (!code) {
      throw new Error("error code must be defined");
    }

    this.code = code;

    for (const arg of args) {
      if (arg instanceof Error) {
        this.errors.push(arg);
      } else if (typeof arg === "string") {
        this.errorMessage = arg;
      } else if (typeof arg === "object") {
        Object.assign(this.context, arg);
      }
    }

    Object.defineProperty(this, "message", {
      get: this.formatMessage,
      enumerable: true,
      configurable: false
    });
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
  public static withContext<E extends typeof BaseError>(
    this: E,
    context: any = {}
  ): E {
    const self = this as typeof BaseError;
    return class extends self {
      context: any = Object.assign(this.context, context);
      name = super.constructor.name;
    } as any;
  }

  formatMessage() {
    let message: string;

    const extraMessage = this._toKVString(
      Object.assign({}, { code: this.code }, this.context)
    );

    message = this.userMessage
      ? `[${extraMessage}] ${this.userMessage}`
      : `[${extraMessage}]`;

    for (const error of this.errors) {
      message += `\n  ${error
        .toString()
        .split("\n")
        .join("\n  ")}`;
    }

    return message;
  }

  /**
   * Converts error to JSON
   */
  public toJSON() {
    return {
      id: this.id,
      code: this.code,
      message: this.message,
      context: this.context
    };
  }

  _toKVString(obj: Object) {
    const result: string[] = [];

    Object.keys(obj).forEach(key => {
      result.push(`${key}=${(obj as any)[key] as string}`);
    });

    return result.join(",");
  }
}

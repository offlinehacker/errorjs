import BaseError from "./error";
import ExetendedErrorFactory from "./errors";

const defaultErrorFactory = new ExetendedErrorFactory();

// export all errors from defaultErrorFactory
export const {
  InternalError,
  NotFoundError,
  UnauthorizedError,
  ConnectionError,
  ValidationError,
  ConflictError,
  LogicalError
} = defaultErrorFactory;

// expose defaultErrorFactory as errors
export const errors = defaultErrorFactory;

// export all helper classes
export { default as BaseErrorFactory } from "./factory";
export { default as BaseError } from "./error";
export { default as ExtendedErrorFactory } from "./errors";

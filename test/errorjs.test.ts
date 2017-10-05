import { NotFoundError } from "../src/errorjs";
import { BaseError } from "../src/errorjs";
import { errors } from "../src/errorjs";
import { BaseErrorFactory, ExtendedErrorFactory } from "../src/errorjs";

describe("errorjs", () => {
  it("should have errors exposed", () => {
    expect(new errors.NotFoundError("some_error")).toBeInstanceOf(BaseError);
    expect(new errors.ConflictError("some_error")).toBeInstanceOf(BaseError);
    expect(new errors.ConnectionError("some_error")).toBeInstanceOf(BaseError);
    expect(new errors.InternalError("some_error")).toBeInstanceOf(BaseError);
    expect(new errors.LogicalError("some_error")).toBeInstanceOf(BaseError);
    expect(new errors.NotImplementedError("some_error")).toBeInstanceOf(
      BaseError
    );
    expect(new errors.UnauthorizedError("some_error")).toBeInstanceOf(
      BaseError
    );
    expect(new errors.ValidationError("some_error")).toBeInstanceOf(BaseError);
  });

  it("should create BaseErrorFactory", () => {
    const factory = new BaseErrorFactory();

    expect(factory).toBeInstanceOf(BaseErrorFactory);
  });

  it("should create ExtendedErrorFactory", () => {
    const factory = new ExtendedErrorFactory();

    expect(factory).toBeInstanceOf(ExtendedErrorFactory);

    const error = new factory.ConflictError("some_conflict");

    expect(error).toBeInstanceOf(BaseError);
  });
});

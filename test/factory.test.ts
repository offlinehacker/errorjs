import BaseErrorFactory from "../src/factory";
import BaseError from "../src/error";

describe("BaseErrorFactory", () => {
  it("should define error class", () => {
    class MyErrorFactory extends BaseErrorFactory {
      MyError = this.defineErrorClass(class MyError extends this.BaseError {});
    }

    const factory = new MyErrorFactory();

    const error = new factory.MyError("some_code");

    expect(error).toBeInstanceOf(factory.BaseError);
    expect(error).toBeInstanceOf(BaseError);
  });

  it("should define base error class", () => {
    class MyErrorFactory extends BaseErrorFactory {
      BaseError = class MyBaseError extends BaseError {
        get isUserError() {
          return this.context.userId;
        }
      };
    }

    const factory = new MyErrorFactory();

    let error = new factory.BaseError("some_code", { userId: "123" });
    expect(error.isUserError).toBeTruthy();

    error = new factory.BaseError("some_code");
    expect(error.isUserError).toBeFalsy();
  });

  it("should define context", () => {
    class MyErrorFactory extends BaseErrorFactory {
      MyError = this.defineErrorClass(class MyError extends this.BaseError {});
    }

    const factory = new MyErrorFactory();
    let factoryWithContext = factory.withContext({ userId: "123" });

    let error = new factoryWithContext.MyError("some_code");

    expect(error.context).toEqual({ userId: "123" });

    factoryWithContext = factoryWithContext.withContext({ clientId: "123" });

    error = new factoryWithContext.MyError("some_code");

    expect(error.context).toEqual({ userId: "123", clientId: "123" });
  });
});

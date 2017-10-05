import BaseError from "../src/error";

describe("BaseError", () => {
  it("should create a simple error", () => {
    const baseError = new Error("some other error");
    const error = new BaseError("some_error_code", "some message", baseError, {
      key: "value"
    });

    expect(error.id).toBeDefined();
    expect(error.code).toBe("some_error_code");
    expect(error.name).toBe("BaseError");
    expect(error.message).toBe(
      `[code=some_error_code,key=value] some message
  Error: some other error`
    );
    expect(error.userMessage).toBe("some message");
    expect(error.context).toEqual({ key: "value" });
  });

  it("should provide default user message", () => {
    class MyError extends BaseError {
      defaultUserMessage = "this error is very bad";
    }

    const errorWithDefault = new MyError("some_code");
    expect(errorWithDefault.userMessage).toBe("this error is very bad");

    const errorNoDefault = new MyError("some_code", "some message");
    expect(errorNoDefault.userMessage).toBe("some message");
  });

  it("should provide default error context", () => {
    const MyError = BaseError.withContext({ key: "value" });

    const error = new MyError("some_code");

    expect(error.context).toEqual({ key: "value" });
  });
});

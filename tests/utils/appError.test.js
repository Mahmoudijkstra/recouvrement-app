const AppError = require("../../src/utils/appError");

describe("AppError", () => {
  test("should create an error with message and default status 500", () => {
    const error = new AppError("Something went wrong");

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("Something went wrong");
    expect(error.status).toBe(500);
  });

  test("should create an error with a custom status code", () => {
    const error = new AppError("Not found", 404);

    expect(error.message).toBe("Not found");
    expect(error.status).toBe(404);
  });

  test("should have a stack trace", () => {
    const error = new AppError("Test error", 400);

    expect(error.stack).toBeDefined();
  });
});

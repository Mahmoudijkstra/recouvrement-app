const validate = require("../../src/middlewares/validate");
const Joi = require("joi");

describe("validate middleware", () => {
  let req, res, next;

  const testSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be valid",
      "any.required": "Email is required",
    }),
  });

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  test("should call next() when body is valid", () => {
    req.body = { name: "John", email: "john@test.com" };

    validate(testSchema)(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test("should return 400 when required field is missing", () => {
    req.body = { name: "John" };

    validate(testSchema)(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 400 when email is invalid", () => {
    req.body = { name: "John", email: "not-an-email" };

    validate(testSchema)(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 400 when body is empty", () => {
    req.body = {};

    validate(testSchema)(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

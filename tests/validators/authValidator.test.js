const { registerSchema, loginSchema } = require("../../src/validators/authValidator");

describe("authValidator", () => {
  describe("registerSchema", () => {
    const validData = {
      first_name: "John",
      last_name: "Doe",
      email: "john@company.com",
      password: "password1234",
      confirm_password: "password1234",
      role: "agent",
    };

    test("should pass with valid data", () => {
      const { error } = registerSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    test("should fail when first_name is missing", () => {
      const { error } = registerSchema.validate({ ...validData, first_name: undefined });
      expect(error).toBeDefined();
    });

    test("should fail when email is invalid", () => {
      const { error } = registerSchema.validate({ ...validData, email: "not-email" });
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe("Email must be valid");
    });

    test("should fail when password is too short", () => {
      const { error } = registerSchema.validate({ ...validData, password: "short" });
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe("Password must be at least 10 characters");
    });

    test("should fail when role is invalid", () => {
      const { error } = registerSchema.validate({ ...validData, role: "superadmin" });
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe("Role must be agent, manager, or admin");
    });
  });

  describe("loginSchema", () => {
    test("should pass with valid email and password", () => {
      const { error } = loginSchema.validate({
        email: "john@company.com",
        password: "password1234",
      });
      expect(error).toBeUndefined();
    });

    test("should fail when email is missing", () => {
      const { error } = loginSchema.validate({ password: "password1234" });
      expect(error).toBeDefined();
    });

    test("should fail when password is missing", () => {
      const { error } = loginSchema.validate({ email: "john@company.com" });
      expect(error).toBeDefined();
    });

    test("should fail when email format is invalid", () => {
      const { error } = loginSchema.validate({
        email: "invalid",
        password: "password1234",
      });
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe("Email must be valid");
    });
  });
});

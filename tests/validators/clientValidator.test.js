const { createClientSchema, updateClientSchema } = require("../../src/validators/clientValidator");

describe("clientValidator", () => {
  describe("createClientSchema", () => {
    const validData = {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@client.com",
      phone: "+1234567890",
      address: "123 Business Rd",
    };

    test("should pass with valid data", () => {
      const { error } = createClientSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    test("should pass with only required fields", () => {
      const { error } = createClientSchema.validate({
        first_name: "Jane",
        last_name: "Smith",
        email: "jane@client.com",
      });
      expect(error).toBeUndefined();
    });

    test("should fail when first_name is missing", () => {
      const { error } = createClientSchema.validate({ ...validData, first_name: undefined });
      expect(error).toBeDefined();
    });

    test("should fail when email is invalid", () => {
      const { error } = createClientSchema.validate({ ...validData, email: "bad" });
      expect(error).toBeDefined();
    });
  });

  describe("updateClientSchema", () => {
    test("should pass with partial data", () => {
      const { error } = updateClientSchema.validate({ first_name: "Updated" });
      expect(error).toBeUndefined();
    });

    test("should pass with empty body", () => {
      const { error } = updateClientSchema.validate({});
      expect(error).toBeUndefined();
    });

    test("should fail when email is invalid", () => {
      const { error } = updateClientSchema.validate({ email: "not-email" });
      expect(error).toBeDefined();
    });
  });
});

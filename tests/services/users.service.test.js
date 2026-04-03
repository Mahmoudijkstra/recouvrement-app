const usersService = require("../../src/services/users.service");
const User = require("../../src/models/User");
const AppError = require("../../src/utils/appError");

// Mock the User model
jest.mock("../../src/models/User");

describe("usersService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    test("should return all users", async () => {
      const mockUsers = [
        { _id: "1", first_name: "John", email: "john@test.com" },
        { _id: "2", first_name: "Jane", email: "jane@test.com" },
      ];
      User.find.mockResolvedValue(mockUsers);

      const result = await usersService.getAllUsers();

      expect(User.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUsers);
      expect(result).toHaveLength(2);
    });

    test("should return empty array when no users exist", async () => {
      User.find.mockResolvedValue([]);

      const result = await usersService.getAllUsers();

      expect(result).toEqual([]);
    });
  });

  describe("getUser", () => {
    test("should return a user by id", async () => {
      const mockUser = { _id: "1", first_name: "John", email: "john@test.com" };
      User.findById.mockResolvedValue(mockUser);

      const result = await usersService.getUser("1");

      expect(User.findById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockUser);
    });

    test("should throw AppError 404 when user not found", async () => {
      User.findById.mockResolvedValue(null);

      await expect(usersService.getUser("999")).rejects.toThrow(AppError);
      await expect(usersService.getUser("999")).rejects.toThrow("User not found");
    });
  });

  describe("updateUser", () => {
    test("should update and return the user", async () => {
      const mockUpdated = { _id: "1", first_name: "Updated", email: "john@test.com" };
      User.findByIdAndUpdate.mockResolvedValue(mockUpdated);

      const result = await usersService.updateUser("1", { first_name: "Updated" });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { first_name: "Updated" },
        { new: true, runValidators: true }
      );
      expect(result.first_name).toBe("Updated");
    });

    test("should throw AppError 404 when user not found", async () => {
      User.findByIdAndUpdate.mockResolvedValue(null);

      await expect(usersService.updateUser("999", {})).rejects.toThrow("User not found");
    });
  });

  describe("deleteUser", () => {
    test("should delete and return the user", async () => {
      const mockUser = { _id: "1", first_name: "John" };
      User.findByIdAndDelete.mockResolvedValue(mockUser);

      const result = await usersService.deleteUser("1");

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockUser);
    });

    test("should throw AppError 404 when user not found", async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      await expect(usersService.deleteUser("999")).rejects.toThrow("User not found");
    });
  });
});

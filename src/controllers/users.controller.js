const usersService = require("../services/users.service");
const response = require("../utils/response");

const usersController = {
  async getAllUsers(req, res, next) {
    try {
      const users = await usersService.getAllUsers();
      return response.success(res, users, "All users");
    } catch (err) {
      next(err);
    }
  },

  async getUser(req, res, next) {
    try {
      const id = req.params.id;
      const dbUser = await usersService.getUser(id);
      return response.success(res, dbUser, "User found");
    } catch (err) {
      next(err);
    }
  },

  async updateUser(req, res, next) {
    try {
      const updatedUser = await usersService.updateUser(
        req.params.id,
        req.body,
      );
      return response.success(res, updatedUser, "User updated", 200);
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const dbUser = await usersService.deleteUser(req.params.id);
      return response.success(res, dbUser, "User deleted", 200);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = usersController;

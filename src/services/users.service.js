const AppError = require("../utils/appError");
const User = require("../models/User");

const usersService = {
  async getAllUsers() {
    const users = await User.find();
    return users;
  },

  async getUser(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  },

  async updateUser(id, newUserData) {
    const updatedUser = await User.findByIdAndUpdate(id, newUserData, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }
    return updatedUser;
  },

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  },
};

module.exports = usersService;

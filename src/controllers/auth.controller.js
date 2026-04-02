const authService = require("../services/auth.service");
const response = require("../utils/response");

const authController = {
  async register(req, res, next) {
    try {
      if (await authService.register(req.body))
        return response.success(res, null, "User created");
      return response.error(res);
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      return response.success(res, token, "Login successful");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;

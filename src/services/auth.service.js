const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");
const User = require("../models/User");

const authService = {
  async register(userDetails) {
    const dbUser = await User.findOne({ email: userDetails.email });
    if (dbUser) {
      throw new AppError("Email already used", 409);
    }
    delete userDetails.confirm_password;
    userDetails.password = await bcrypt.hash(
      userDetails.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    return await User.create(userDetails);
  },

  async login(email, password) {
    const dbUser = await User.findOne({ email: email }).select("+password");

    if (!dbUser) {
      throw new AppError("User not found", 404);
    }

    const match = await bcrypt.compare(password, dbUser.password);

    if (!match) {
      throw new AppError("Wrong email or password", 401);
    }
    const secret = process.env.JWT_SECRET;
    const payload = {
      id: dbUser.id,
      first_name: dbUser.first_name,
      last_name: dbUser.last_name,
      email: dbUser.email,
      role: dbUser.role,
    };

    const token = jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  },
};

module.exports = authService;

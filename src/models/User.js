const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
      minLength: 10,
    },
    role: {
      type: String,
      required: true,
      enum: ["agent", "manager", "admin"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);

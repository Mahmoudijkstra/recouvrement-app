const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["call", "email", "sms", "formal_notice", "legal", "visit"],
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    actionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Action", actionSchema);

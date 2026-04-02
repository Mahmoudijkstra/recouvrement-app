const AppError = require("../utils/appError");
const Action = require("../models/Action");

const actionsService = {
  async getAllActions() {
    return await Action.find()
      .populate("client", "first_name last_name email")
      .populate("agent", "first_name last_name email");
  },

  async getAction(id) {
    const action = await Action.findById(id)
      .populate("client", "first_name last_name email")
      .populate("agent", "first_name last_name email");
    if (!action) {
      throw new AppError("Action not found", 404);
    }
    return action;
  },

  async createAction(actionData) {
    return await Action.create(actionData);
  },

  async updateAction(id, newActionData) {
    const updatedAction = await Action.findByIdAndUpdate(id, newActionData, {
      new: true,
      runValidators: true
    });
    if (!updatedAction) {
      throw new AppError("Action not found", 404);
    }
    return updatedAction;
  },

  async deleteAction(id) {
    const action = await Action.findByIdAndDelete(id);
    if (!action) {
      throw new AppError("Action not found", 404);
    }
    return action;
  }
};

module.exports = actionsService;

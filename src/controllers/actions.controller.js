const actionsService = require("../services/actions.service");
const response = require("../utils/response");

const actionsController = {
  async getAllActions(req, res, next) {
    try {
      const actions = await actionsService.getAllActions();
      return response.success(res, actions, "All actions");
    } catch (err) {
      next(err);
    }
  },

  async getAction(req, res, next) {
    try {
      const dbAction = await actionsService.getAction(req.params.id);
      return response.success(res, dbAction, "Action found");
    } catch (err) {
      next(err);
    }
  },

  async createAction(req, res, next) {
    try {
      if (!req.body.agent && req.user && req.user.id) {
        req.body.agent = req.user.id;
      }
      const dbAction = await actionsService.createAction(req.body);
      return response.success(res, dbAction, "Action created", 201);
    } catch (err) {
      next(err);
    }
  },

  async updateAction(req, res, next) {
    try {
      const updatedAction = await actionsService.updateAction(
        req.params.id,
        req.body,
      );
      return response.success(res, updatedAction, "Action updated", 200);
    } catch (err) {
      next(err);
    }
  },

  async deleteAction(req, res, next) {
    try {
      const dbAction = await actionsService.deleteAction(req.params.id);
      return response.success(res, dbAction, "Action deleted", 200);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = actionsController;

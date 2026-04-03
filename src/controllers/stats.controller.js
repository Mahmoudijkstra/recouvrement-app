const statsService = require("../services/stats.service");
const response = require("../utils/response");

const statsController = {
  async getOverview(req, res, next) {
    try {
      const data = await statsService.getOverview();
      return response.success(res, data, "Overview statistics");
    } catch (err) {
      next(err);
    }
  },

  async getInvoicesStats(req, res, next) {
    try {
      const data = await statsService.getInvoicesStats();
      return response.success(res, data, "Invoices statistics");
    } catch (err) {
      next(err);
    }
  },

  async getAgentsStats(req, res, next) {
    try {
      const data = await statsService.getAgentsStats();
      return response.success(res, data, "Agents statistics");
    } catch (err) {
      next(err);
    }
  },

  async getClientsStats(req, res, next) {
    try {
      const data = await statsService.getClientsStats();
      return response.success(res, data, "Clients statistics");
    } catch (err) {
      next(err);
    }
  }
};

module.exports = statsController;

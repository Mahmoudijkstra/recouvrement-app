const paymentsService = require("../services/payments.service");
const response = require("../utils/response");

const paymentsController = {
  async getAllPayments(req, res, next) {
    try {
      const payments = await paymentsService.getAllPayments();
      return response.success(res, payments, "All payments");
    } catch (err) {
      next(err);
    }
  },

  async getPayment(req, res, next) {
    try {
      const dbPayment = await paymentsService.getPayment(req.params.id);
      return response.success(res, dbPayment, "Payment found");
    } catch (err) {
      next(err);
    }
  },

  async createPayment(req, res, next) {
    try {
      const dbPayment = await paymentsService.createPayment(req.body);
      return response.success(res, dbPayment, "Payment recorded and invoice marked as paid", 201);
    } catch (err) {
      next(err);
    }
  },

  async deletePayment(req, res, next) {
    try {
      const dbPayment = await paymentsService.deletePayment(req.params.id);
      return response.success(res, dbPayment, "Payment deleted", 200);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = paymentsController;

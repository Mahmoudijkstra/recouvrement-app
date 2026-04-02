const invoicesService = require("../services/invoices.service");
const response = require("../utils/response");

const invoicesController = {
  async getAllInvoices(req, res, next) {
    try {
      const invoices = await invoicesService.getAllInvoices();
      return response.success(res, invoices, "All invoices");
    } catch (err) {
      next(err);
    }
  },

  async getInvoice(req, res, next) {
    try {
      const dbInvoice = await invoicesService.getInvoice(req.params.id);
      return response.success(res, dbInvoice, "Invoice found");
    } catch (err) {
      next(err);
    }
  },

  async createInvoice(req, res, next) {
    try {
      const dbInvoice = await invoicesService.createInvoice(req.body);
      return response.success(res, dbInvoice, "Invoice created", 201);
    } catch (err) {
      next(err);
    }
  },

  async updateInvoice(req, res, next) {
    try {
      const updatedInvoice = await invoicesService.updateInvoice(
        req.params.id,
        req.body,
      );
      return response.success(res, updatedInvoice, "Invoice updated", 200);
    } catch (err) {
      next(err);
    }
  },

  async deleteInvoice(req, res, next) {
    try {
      const dbInvoice = await invoicesService.deleteInvoice(req.params.id);
      return response.success(res, dbInvoice, "Invoice deleted", 200);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = invoicesController;

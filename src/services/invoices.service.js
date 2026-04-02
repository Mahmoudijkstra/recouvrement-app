const AppError = require("../utils/appError");
const Invoice = require("../models/Invoice");

const invoicesService = {
  async getAllInvoices() {
    return await Invoice.find().populate("client", "first_name last_name email");
  },

  async getInvoice(id) {
    const invoice = await Invoice.findById(id).populate("client", "first_name last_name email");
    if (!invoice) {
      throw new AppError("Invoice not found", 404);
    }
    return invoice;
  },

  async createInvoice(invoiceData) {
    return await Invoice.create(invoiceData);
  },

  async updateInvoice(id, newInvoiceData) {
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, newInvoiceData, {
      new: true,
      runValidators: true
    });
    if (!updatedInvoice) {
      throw new AppError("Invoice not found", 404);
    }
    return updatedInvoice;
  },

  async deleteInvoice(id) {
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) {
      throw new AppError("Invoice not found", 404);
    }
    return invoice;
  },
};

module.exports = invoicesService;

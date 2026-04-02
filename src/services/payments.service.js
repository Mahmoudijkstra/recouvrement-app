const AppError = require("../utils/appError");
const Payment = require("../models/Payment");
const Invoice = require("../models/Invoice");

const paymentsService = {
  async getAllPayments() {
    return await Payment.find().populate("invoice", "amount dueDate status");
  },

  async getPayment(id) {
    const payment = await Payment.findById(id).populate("invoice", "amount dueDate status");
    if (!payment) {
      throw new AppError("Payment not found", 404);
    }
    return payment;
  },

  async createPayment(paymentData) {
    const payment = await Payment.create(paymentData);

    if (payment.invoice) {
      await Invoice.findByIdAndUpdate(payment.invoice, { status: "paid" });
    }

    return payment;
  },

  async deletePayment(id) {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      throw new AppError("Payment not found", 404);
    }
    return payment;
  }
};

module.exports = paymentsService;

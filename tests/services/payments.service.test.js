const paymentsService = require("../../src/services/payments.service");
const Payment = require("../../src/models/Payment");
const Invoice = require("../../src/models/Invoice");
const AppError = require("../../src/utils/appError");

jest.mock("../../src/models/Payment");
jest.mock("../../src/models/Invoice");

describe("paymentsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllPayments", () => {
    test("should return all payments", async () => {
      const mockPayments = [{ _id: "1", amount: 500 }];
      Payment.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockPayments),
      });

      const result = await paymentsService.getAllPayments();

      expect(result).toEqual(mockPayments);
    });
  });

  describe("getPayment", () => {
    test("should return a payment by id", async () => {
      const mockPayment = { _id: "1", amount: 500 };
      Payment.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockPayment),
      });

      const result = await paymentsService.getPayment("1");

      expect(result).toEqual(mockPayment);
    });

    test("should throw AppError 404 when payment not found", async () => {
      Payment.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      await expect(paymentsService.getPayment("999")).rejects.toThrow("Payment not found");
    });
  });

  describe("createPayment", () => {
    test("should create payment and update invoice status to paid", async () => {
      const mockPayment = { _id: "1", amount: 500, invoice: "inv1" };
      Payment.create.mockResolvedValue(mockPayment);
      Invoice.findByIdAndUpdate.mockResolvedValue({});

      const result = await paymentsService.createPayment({ amount: 500, invoice: "inv1" });

      expect(Payment.create).toHaveBeenCalled();
      expect(Invoice.findByIdAndUpdate).toHaveBeenCalledWith("inv1", { status: "paid" });
      expect(result).toEqual(mockPayment);
    });

    test("should create payment without updating invoice when no invoice", async () => {
      const mockPayment = { _id: "1", amount: 500, invoice: null };
      Payment.create.mockResolvedValue(mockPayment);

      const result = await paymentsService.createPayment({ amount: 500 });

      expect(Invoice.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(result).toEqual(mockPayment);
    });
  });

  describe("deletePayment", () => {
    test("should delete and return the payment", async () => {
      const mockPayment = { _id: "1", amount: 500 };
      Payment.findByIdAndDelete.mockResolvedValue(mockPayment);

      const result = await paymentsService.deletePayment("1");

      expect(result).toEqual(mockPayment);
    });

    test("should throw AppError 404 when payment not found", async () => {
      Payment.findByIdAndDelete.mockResolvedValue(null);

      await expect(paymentsService.deletePayment("999")).rejects.toThrow("Payment not found");
    });
  });
});

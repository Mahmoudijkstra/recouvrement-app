const Joi = require("joi");

const createPaymentSchema = Joi.object({
  invoice: Joi.string().hex().length(24).required().messages({
    "string.empty": "Invoice ID is required",
    "string.hex": "Invoice must be a valid ObjectId",
    "string.length": "Invoice must be a valid ObjectId",
    "any.required": "Invoice ID is required",
  }),

  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be positive",
    "any.required": "Amount is required",
  }),

  paymentDate: Joi.date().iso().optional().messages({
    "date.base": "Payment date must be a valid date",
    "date.format": "Payment date must be in ISO format",
  }),
});

module.exports = { createPaymentSchema };

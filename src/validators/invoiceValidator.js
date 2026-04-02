const Joi = require("joi");

const createInvoiceSchema = Joi.object({
  client: Joi.string().hex().length(24).required().messages({
    "string.empty": "Client ID is required",
    "string.hex": "Client must be a valid ObjectId",
    "string.length": "Client must be a valid ObjectId",
    "any.required": "Client ID is required",
  }),

  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be positive",
    "any.required": "Amount is required",
  }),

  dueDate: Joi.date().iso().required().messages({
    "date.base": "Due date must be a valid date",
    "date.format": "Due date must be in ISO format",
    "any.required": "Due date is required",
  }),

  status: Joi.string().valid("pending", "paid").optional().messages({
    "any.only": "Status must be pending or paid",
  }),
});

const updateInvoiceSchema = Joi.object({
  client: Joi.string().hex().length(24).messages({
    "string.hex": "Client must be a valid ObjectId",
    "string.length": "Client must be a valid ObjectId",
  }),

  amount: Joi.number().positive().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be positive",
  }),

  dueDate: Joi.date().iso().messages({
    "date.base": "Due date must be a valid date",
    "date.format": "Due date must be in ISO format",
  }),

  status: Joi.string().valid("pending", "paid").messages({
    "any.only": "Status must be pending or paid",
  }),
});

module.exports = { createInvoiceSchema, updateInvoiceSchema };

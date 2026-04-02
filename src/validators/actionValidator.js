const Joi = require("joi");

const createActionSchema = Joi.object({
  client: Joi.string().hex().length(24).required().messages({
    "string.empty": "Client ID is required",
    "string.hex": "Client must be a valid ObjectId",
    "string.length": "Client must be a valid ObjectId",
    "any.required": "Client ID is required",
  }),

  agent: Joi.string().hex().length(24).optional().messages({
    "string.hex": "Agent must be a valid ObjectId",
    "string.length": "Agent must be a valid ObjectId",
  }),

  type: Joi.string().valid("call", "email", "sms", "formal_notice", "legal", "visit").required().messages({
    "string.empty": "Action type is required",
    "any.only": "Action type must be one of: call, email, sms, formal_notice, legal, visit",
    "any.required": "Action type is required",
  }),

  notes: Joi.string().required().messages({
    "string.base": "Notes must be a string",
    "string.empty": "Notes are required",
    "any.required": "Notes are required",
  }),

  actionDate: Joi.date().iso().optional().messages({
    "date.base": "Action date must be a valid date",
    "date.format": "Action date must be in ISO format",
  }),
});

const updateActionSchema = Joi.object({
  client: Joi.string().hex().length(24).messages({
    "string.hex": "Client must be a valid ObjectId",
    "string.length": "Client must be a valid ObjectId",
  }),

  agent: Joi.string().hex().length(24).messages({
    "string.hex": "Agent must be a valid ObjectId",
    "string.length": "Agent must be a valid ObjectId",
  }),

  type: Joi.string().valid("call", "email", "sms", "formal_notice", "legal", "visit").messages({
    "any.only": "Action type must be one of: call, email, sms, formal_notice, legal, visit",
  }),

  notes: Joi.string().messages({
    "string.base": "Notes must be a string",
    "string.empty": "Notes cannot be empty",
  }),

  actionDate: Joi.date().iso().messages({
    "date.base": "Action date must be a valid date",
    "date.format": "Action date must be in ISO format",
  }),
});

module.exports = { createActionSchema, updateActionSchema };

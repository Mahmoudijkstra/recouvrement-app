const Joi = require("joi");

const createClientSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),

  last_name: Joi.string().required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  phone: Joi.string().optional().messages({
    "string.base": "Phone must be a string",
  }),

  address: Joi.string().optional().messages({
    "string.base": "Address must be a string",
  }),

  status: Joi.string().valid("active", "inactive").optional().messages({
    "any.only": "Status must be active or inactive",
  }),

  assignedAgent: Joi.string().hex().length(24).optional().messages({
    "string.hex": "Assigned agent must be a valid ObjectId",
    "string.length": "Assigned agent must be a valid ObjectId",
  }),
});

const updateClientSchema = Joi.object({
  first_name: Joi.string().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty",
  }),

  last_name: Joi.string().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name cannot be empty",
  }),

  email: Joi.string().email().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email cannot be empty",
  }),

  phone: Joi.string().messages({
    "string.base": "Phone must be a string",
  }),

  address: Joi.string().messages({
    "string.base": "Address must be a string",
  }),

  status: Joi.string().valid("active", "inactive").messages({
    "any.only": "Status must be active or inactive",
  }),

  assignedAgent: Joi.string().hex().length(24).messages({
    "string.hex": "Assigned agent must be a valid ObjectId",
    "string.length": "Assigned agent must be a valid ObjectId",
  }),
});

module.exports = { createClientSchema, updateClientSchema };

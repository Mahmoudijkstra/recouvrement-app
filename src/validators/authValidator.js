const Joi = require("joi");

const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must have at least 2 characters",
    "any.required": "First name is required",
  }),

  last_name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Last name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(10).required().messages({
    "string.min": "Password must be at least 10 characters",
    "any.required": "Password is required",
  }),

  confirm_password: Joi.string().min(10).required().messages({
    "string.min": "Password must be at least 10 characters",
    "any.required": "Password is required",
  }),

  role: Joi.string().valid("agent", "manager", "admin").required().messages({
    "any.only": "Role must be agent, manager, or admin",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(10).required().messages({
    "string.min": "Password must be at least 10 characters",
    "any.required": "Password is required",
  }),
});

module.exports = { registerSchema, loginSchema };

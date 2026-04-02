const Joi = require("joi");

const createUserSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must have at least 2 characters",
    "string.max": "First name cannot exceed 50 characters",
    "any.required": "First name is required",
  }),

  last_name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "string.min": "Last name must have at least 2 characters",
    "string.max": "Last name cannot exceed 50 characters",
    "any.required": "Last name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(10).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 10 characters",
    "any.required": "Password is required",
  }),

  role: Joi.string().valid("agent", "manager", "admin").required().messages({
    "any.only": "Role must be agent, manager, or admin",
    "any.required": "Role is required",
  }),
});

const updateUserSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).messages({
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty",
    "string.min": "First name must have at least 2 characters",
    "string.max": "First name cannot exceed 50 characters",
  }),

  last_name: Joi.string().min(2).max(50).messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name cannot be empty",
    "string.min": "Last name must have at least 2 characters",
    "string.max": "Last name cannot exceed 50 characters",
  }),

  email: Joi.string().email().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email cannot be empty",
  }),

  role: Joi.string().valid("agent", "manager", "admin").messages({
    "any.only": "Role must be agent, manager, or admin",
  }),
});

module.exports = { createUserSchema, updateUserSchema };

const response = require("../utils/response");

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return response.error(res, error.details[0].message, 400);
    }

    next();
  };
}

module.exports = validate;

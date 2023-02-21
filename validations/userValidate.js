const Joi = require("joi");

const adminValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]{3,30}$"))
      .trim()
      .required(),
    email: Joi.string()
      .email()
      .message("Kiritilgan data email emas.")
      .required(),
    password: Joi.string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required(),
    confirm_password: Joi.ref("password"),
    info: Joi.string().required(),
    photo: Joi.string().default("/author/default.png"),
  });
  return schema.validate(data);
};

module.exports = adminValidation;

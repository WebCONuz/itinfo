const Joi = require("joi");

const generateNickname = (parent, helpers) => {
  return parent.firstname.toLowerCase() + "-" + parent.lastname.toLowerCase();
};

const authorValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]{3,30}$"))
      .trim()
      .required(),
    lastname: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]{3,30}$"))
      .trim()
      .required(),
    email: Joi.string()
      .email()
      .message("Kiritilgan data email emas.")
      .required(),
    password: Joi.string()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirm_password: Joi.ref("password"),
    nickname: Joi.string().trim().default(generateNickname),
    phone: Joi.string()
      .pattern(/\d{2}-\d{3}-\d{2}-\d{2}/)
      .message("No'mer xato, namuna: 99-888-77-66.")
      .required(),
    info: Joi.string().required(),
    position: Joi.string().required(),
    photo: Joi.string().default("/author/default.png"),
    expert: Joi.boolean().default(false),
  });
  return schema.validate(data);
};

module.exports = authorValidation;

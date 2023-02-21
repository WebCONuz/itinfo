const Joi = require("joi");

const categoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .message("Kategoriya nomi 2 xarfdan kam bo'lmasligi kerak")
      .max(255)
      .message("Kategoriya nomi 255 xarfdan ko'p bo'lmasligi kerak")
      .required(),
    ref: Joi.string().alphanum(),
  });
  return schema.validate(data);
};

module.exports = {
  categoryValidation,
};

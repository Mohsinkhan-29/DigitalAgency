const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  company: Joi.string()
    .allow("")
    .max(100),

  phone: Joi.string()
    .allow("")
    .pattern(/^[0-9+\-()\s]{7,20}$/),

  services: Joi.array()
    .items(Joi.string())
    .min(1)
    .required(),

  timeline: Joi.string().required(),

  budget: Joi.number()
    .min(1000)
    .max(100000),

  details: Joi.string()
    .min(20)
    .max(1000)
    .required(),

  howFound: Joi.string().required(),
});

module.exports = contactSchema;
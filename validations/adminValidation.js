const Joi = require("joi");

//register validation
exports.registerValidation = Joi.object({
    name: Joi.string()
    .min(6).
    required(),
    username: Joi.string()
    .min(6)
    .required(),
    password: Joi.string()
    .min(6)
    .required()
});

exports.loginValidation =Joi.object({
    username: Joi.string()
    .min(6)
    .required(),
    password: Joi.string()
    .min(6)
    .required() 
}); 
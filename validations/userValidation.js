const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

exports.loginValidation =Joi.object({
    username: Joi.string()
    .min(6)
    .required(),
    password: Joi.string()
    .min(6)
    .required()
}); 

exports.addProperty = Joi.object({
    landlord:Joi.string().required(),
    rate: Joi.number().required(),
    address:Joi.string().required(),
    moneyAtHand: Joi.number().required()

});

exports.searchProperty = Joi.object({
    landlord: Joi.string().required()
});

exports.createTransaction = Joi.object({
    tenant: Joi.string().required(),
    amountPaid: Joi.number().required(),
    property: Joi.string().required(),
    description: Joi.string().required()
});

exports.createTenants = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    rentPerYear: Joi.number().required(),
    accommodationType: Joi.string().required()
});

exports.searchTenants = Joi.object({
    name: Joi.string().required()
});

exports.createExpenses = Joi.object({
    prope: Joi.objectId().required(),
    amount: Joi.number().required(),
    narration: Joi.string().required()
});
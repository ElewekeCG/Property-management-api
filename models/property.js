const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    landlord: {
        type: String,
        required: true,
        min: 6
    },
    rate: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
        min: 2,
        max: 1024
    },
    moneyAtHand: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("property", propertySchema)
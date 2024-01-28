const mongoose = require("mongoose");

const transSchema = mongoose.Schema ({
    tenant: {
        type: String,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    property: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("transaction", transSchema)
const mongoose = require("mongoose");

const expensesSchema = mongoose.Schema({
    prope: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "property",
        required: true,
    }, 
    amount: {
        type: Number,
        required: true,
    }, 
    narration: {
        type: String,
        required: true,
    }
}, { timestamp: true });

module.exports = mongoose.model("expenses", expensesSchema)
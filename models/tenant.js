const  mongoose  = require("mongoose");

const tenantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rentPerYear: {
        type: Number,
        required: true,
    },
    accommodationType: {
        type: String,
        required: true,
    }

}, {timestamps: true})

module.exports = mongoose.model("tenant", tenantSchema)




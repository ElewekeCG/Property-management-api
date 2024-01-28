const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    username: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 5,
    }
}, {timestamps: true})

userSchema.pre("save", async function(next){
    try {
        const hashedPassword = bcrypt.hashSync(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch(error) {
        next(error);
    }
});

module.exports = mongoose.model('user', userSchema)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: { type: String, required: true },
    userName: { type: String },
    productName: { type: String },
    quantity: { type: Number, default: 1 },
},{timestamps:true});

module.exports = mongoose.model("Order", userSchema);

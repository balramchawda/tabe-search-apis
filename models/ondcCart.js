const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: String,
    shopId: String,
    products: Object,
    count: { type: Number, default: 1 },  
    createdAt:{ type: Date, default: Date.now },
    updatedAt:{ type: Date, default: Date.now },
    // createdAt:{ type: Date, default: Date.now },
    // updatedAt:{ type: Date, default: Date.now },
},{ timestamps: true });
module.exports = mongoose.model("OndcCart", CartSchema);
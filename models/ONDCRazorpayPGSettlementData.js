const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        // entity: { type: String },
        // count: { type: Number },
        // items: { type: Array }
        raw:{ type: Object , default: {}}
    }
    , { timestamps: true }
)
module.exports = mongoose.model("ondcRazorpayPGSettlementsData", schema);

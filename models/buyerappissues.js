const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {  
        context: { type: Object },
        transaction_id: { type: String, default: "" },
        issue_id : {type:Object,default:{}},
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'buyerondcorder' }, 
        raw: { type: Object, default: {} },
        ticketId:{ type: String, default: "" },
        kikoStatus:{ type: String, default: "" },
    }
    , { timestamps: true }
)
module.exports = mongoose.model("buyerappissue", schema);

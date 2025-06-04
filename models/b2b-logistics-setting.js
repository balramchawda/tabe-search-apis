const mongoose = require('mongoose')

const B2BLogisticsSetting = new mongoose.Schema({
    key: { type:String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true }
},
{ timestamps: true }
)

module.exports = mongoose.model("b2b-logistic-setting", B2BLogisticsSetting)
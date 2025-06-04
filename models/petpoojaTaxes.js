const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        restaurantid: { type: String, default: "" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        taxid: { type: String, default: "" },
        taxname: { type: String, default: "" },
        tax: { type: String, default: "" },
        taxtype: { type: String, default: "" },
        tax_ordertype: { type: String, default: "" },
        active: { type: String, default: "" },
        tax_coreortotal: { type: String, default: "" },
        tax_taxtype: { type: String, default: "" },
        rank : { type: String, default: "" },
        consider_in_core_amount : { type: String, default: "" },
        description : { type: String, default: "" },
    },
    { timestamps: true }
);
module.exports = mongoose.model('petpoojataxes', schema);
const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        restaurantid: { type: String, default: "" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        itemid: { type: String, default: "" },
        itemallowvariation : { type: String, default: "" },
        itemrank : { type: String, default: "" },
        item_categoryid : { type: String, default: "" },
        item_ordertype : { type: String, default: "" },
        item_packingcharges : { type: String, default: "" },
        itemallowaddon : { type: String, default: "" },
        itemaddonbasedon : { type: String, default: "" },
        item_favorite : { type: String, default: "" },
        ignore_taxes : { type: String, default: "" },
        ignore_discounts : { type: String, default: "" },
        in_stock : { type: String, default: "" },
        cuisine : [{ type: Object, default: "" }],
        variation: [{ type: Object, default: "" }],
        addon: [{ type: Object, default: "" }],
        is_recommend: { type: String, default: "" },
        itemname: { type: String, default: "" },
        item_attributeid: { type: String, default: "" },
        itemdescription:{ type: String, default: "" },
        minimumpreparationtime: { type: String, default: "" },
        price: { type: String, default: "" },
        active: { type: String, default: "" },
        item_image_url: { type: String, default: "" },
        item_tax: { type: String, default: "" },
        gst_type: { type: String, default: "" },
        variation_groupname : { type: String, default: "" },
        autoTurnOnTime: { type: String },
        customTurnOnTime: { type: String },
    },
    { timestamps: true }
);
module.exports = mongoose.model('petpoojaitems', schema);
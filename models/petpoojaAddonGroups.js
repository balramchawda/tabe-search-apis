const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        restaurantid: { type: String, default: "" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        addongroupid: { type: String, default: "" },
        addongroup_rank : { type: String, default: "" },
        active : { type: String, default: "" },
        addongroup_name : { type: String, default: "" },
        addongroupitems : [{ type: Object, default: {} }],
        autoTurnOnTime: { type: String },
        customTurnOnTime: { type: String },  
    },
    { timestamps: true }
);
module.exports = mongoose.model('petpoojaaddongroups', schema);
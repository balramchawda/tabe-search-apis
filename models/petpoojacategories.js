const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        restaurantid: { type: String, default: "" },
        categoryid: { type: String, default: "" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        active : { type: String, default: "" },
        categoryrank : { type: String, default: "" },
        parent_category_id : { type: String, default: "" },
        categoryname : { type: String, default: "" },
        categorytimings : { type: String, default: "" },
        category_image_url : { type: String, default: "" },
    },
    { timestamps: true }
);
module.exports = mongoose.model('petpoojacategories', schema);
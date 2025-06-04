var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    type: { type: String, default: "custom_menu" }, //"custom_menu", "custom_group", "variant_group";
    category: { type: String },
    parent_category_id: "", //F&B, Grocery
    description: { type: Object },
    //  {
    //   "name": "Pizza",
    //   "short_desc": "Veg and Non-Veg pizza",
    //   "long_desc": "American and Italian Veg and Non-Veg Pizza",
    //   "images": ["https://sellerNP.com/ondc/m005.png"]
    // }
    options: { type: Array },
    min: { type: Number },
    max: { type: Number },
    inputType: { type: String }, //select or text
  },
  { timestamps: true }
);

// plugins
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("variant", schema);

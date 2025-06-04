const { object, number } = require('joi');
var mongoose = require('mongoose');

var CataloguesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    productName: { type: String, required: false },
    productId: { type: String },
    isCancellable: {type:Boolean, default: false},
    isReturnable: {type:Boolean, default: false},
    catalogueId: { type: String },
    categoryId: { type: String },
    subCategoryId: { type: String },
    weight: { type: Number },
    weightUnit: { type: String },
    availableQuantity: { type: String },
    maxAvailableQuantity: {type:String},
    averageRating: { type: Number},
    minimumQuantity: {type:String},
    countryOfOrigin: { type: String },
    description: { type: String },
    price: { type: String },
    default_selection_maximum_price: { type: String },
    selection_maximum_price: { type: String },
    discountedPrice: { type: String },
    productImages: { type: Array },
    size: { type: String },
    material: { type: String },
    color: { type: String },
    foodType: { type: String, enum:['veg', 'non-veg'] },
    status: { type: String, enum: ["active", "pending", "rejected", "drafted"] },
    isDeleted: {type:Boolean, default: false},
    packagedFood: {type:Boolean, default: false},
    tax: {type:Number, default: 0},
    statutory_reqs_packaged_commodities: {type:Object},
    statutory_reqs_prepackaged_food: {type:Object},
    nutritionalInfo:{type:Object},
    gst: { type: Number, default:0 },
    packagingCost: { type: Number, default:0 },
    l3: { type: String },
    l4: { type: String },
    skuCode: {type:String},
    brand: {type:String},
    code: { type: String },
    miscInfo:{type:String},
    bulkUpload: {type:Boolean, default: false},
    variants:  { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'variants' }] },
    isVariant: {type:Boolean, default: false},
    parentCatalogId: { type: mongoose.Schema.Types.ObjectId, ref: "Catalogue" },
    itemLevelDeliveryCharges: { type: String },
    bpcProps : {type:Object},
    hwProps : {type:Object},
    hkProps : {type:Object},
    menuId: {type: String, default: ''},
    isCustom: {type: Boolean, default: false}, 
    // this is for main pRODUCT WE NEED TO ADD IN tAG
    // {
    //     "code": "custom_group",
    //     "list": [
    //       {
    //         "code": "id",
    //         "value": "CG4"
    //       }
    //     ]
    //   }
   //---------- For Other sAME PRODUCTS NEED TO ADD IN TAG BELOW ONE
    // {
    //     "code": "type",
    //     "list": [
    //       {
    //         "code": "type",
    //         "value": "customization"
    //       }
    //     ]
    //   },

    // {
    //     "code": "parent",
    //     "list": [
    //       {
    //         "code": "id",
    //         "value": "CG4"
    //       },
    //       {
    //         "code": "default",
    //         "value": "yes"
    //       }
    //     ]
    //   },
    customGroupId: {type: String, default: ''},
    childCustomGroupId: [{
        type: String,
        default: []
      }],
      restaurantId: {type: String, default: ''},
      mainRestaurantId:{type: String, default: ''},
      petpoojaItemId:{type: String, default: ''},
      petpoojaVariationId:{type: String, default: ''},
      petpoojaVariationMainId:{type: String, default: ''},
      petpoojaAddonitemId:{type: String, default: ''}
},
{ timestamps: true ,versionKey: false}
);
module.exports = mongoose.model('catalogues', CataloguesSchema);
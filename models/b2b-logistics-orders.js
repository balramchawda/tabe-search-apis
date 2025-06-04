const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")

const B2BLogistics = new mongoose.Schema({
    orderId: { type: String, required: true }, // generate unique order id 
    orderStatus: { type: String, required: true, default: 'Created' },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    // orderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'b2b-logistic-orders-line-items' }],
    wareHouseDistributorName: { type: String, default: '' },  // WD Name
    wareHouseDistributorAddress: { type: String, default: '' }, // WD Address
    wareHouseDistributorCity: { type: String, default: '' }, // WD Address
    wareHouseDistributorPincode: { type: String, default: '' }, // WD Pincode
    wareHouseDistributorLatitude: { type: String, default: '' }, // WD Lat
    wareHouseDistributorLongitude: { type: String, default: '' }, // WD Long
    wareHouseDistributorContactNumber: { type: String, default: '' }, // WD Mobile Number
    wareHouseDistributorDestCode: { type: String, default: '' },//WD Dest Code
    latLongRoutes: [{ type: Object }], // [{lat: "", long: ""}, {lat: "", long: ""}, {lat: "", long: ""}]    
    totalDistance: { type: Number, default: '' }, // will calculate when order created
    orderTripsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'b2b-logistics-order-trips' }],
    isDeleted: {type: Boolean, default: false},
    totalAmount: {type: Number, default: 0},
},
{ timestamps: true }
)

//plugins
B2BLogistics.plugin(mongoosePaginate);
module.exports = mongoose.model("b2b-logistic-orders", B2BLogistics)
const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")

const lineItemSchema = new mongoose.Schema(
    {
        mskuCode: { type: String, default: '' }, // MSKU Code
        itemCode: { type: String, default: '' }, // Item Code
        invoiceId: { type: String, default: '' }, // Invoice ID	
        category: { type: String, default: '' }, // Category
        categoryCode: { type: String, default: '' }, // Category Code
        quantity: { type: String, default: '' }, // Qty
        uom: { type: String, default: '' }, // UOM - (Unit of measurement)
        netInvoiceValue: { type: String, default: '' },// Net Invoice Value
        grossWeightPerPiece: { type: String, default: 0 },
        itemDescription: { type: String, default: "" },
        weight: { type: String, default: '' }, // Weight
        weightUnit: { type: String, default: '' }, // Unit
        totalCFC: { type: String, default: '' }, // Total CFC
        CFCConversion: { type: String, default: '' }, // CFC Conversion
        PACConversion: { type: String, default: '' }, // PAC Conversion
        CFCDimensionLength: { type: String, default: '' }, // Length
        CFCDimensionWidth: { type: String, default: '' }, // Width
        CFCDimensionHeight: { type: String, default: '' }, // Height
        CFCDimensionUnit: { type: String, default: '' }, // CFC Dimensions unit (In - inches/Cm- Centiment) 1 inch means 2.54 cm,
        BUOMConversion: { type: String, default: '' }//BUOM Conversion
    },
    { _id: false } // Set _id to false to ignore default _id creation
);

const B2BLogistics = new mongoose.Schema({
    b2bLogisticOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'b2b-logistic-orders' },
    custID: { type: String, default: '' }, // Customer ID
    uId: { type: String, default: '' }, // UID
    orderId: { type: String, default: '' }, // Order ID
    dateOfDigitalOrder: { type: String, default: '' }, // Date of Digital Order
    invoiceId: { type: String, default: '' }, // Invoice ID
    billingDate: { type: String, default: '' }, // Billing Date
    distributorSalesManName: { type: String, default: '' }, // DS Name
    distributorSalesManNumber: { type: String, default: '' }, // DS Mobile Number
    lineItems: [lineItemSchema], // Line Items
    storeName: { type: String, default: '' }, // Store Name
    storeAddress: { type: String, default: '' }, // Store Address
    storeMobile: { type: String, default: '' }, // Store Mobile Number
    storeLatitude: { type: String, default: '' }, // Delivery Lat
    storeLongitude: { type: String, default: '' }, // Delivery Long
    storeCity: { type: String, default: '' },// Store City
    storeZipcode: { type: String, default: '' }, // Store Pincode
    totalWeight: { type: Number, default: 0 }, // will calculate when order create
    totalBoxVolume: { type: Number, default: 0 }, // // will calculate when order create
    totalNetInvoiceValue: { type: Number, default: 0 },
    endOtp: { type: String, default: '' }, // will generate four digit when order create
    orderStatus: { type: String, default: '' },
    onNetworklogisticOrderId: { type: String },
    onNetworklogisticOrderState: { type: String },
    onNetworklogisticStatus: { type: String },
    onNetworklogisticTransactionId: { type: String },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    isDeleted: { type: Boolean, default: false },
},
    { timestamps: true })

//plugins
B2BLogistics.plugin(mongoosePaginate);
module.exports = mongoose.model("b2b-logistic-orders-line-items", B2BLogistics)
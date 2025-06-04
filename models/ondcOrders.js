const mongoose = require("mongoose");
const { OndcOrderStatus } = require("../Constants");

const orderItemSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'catalogues',
        },
        quantity: {
            count: { type: Number }
        },

        fulfillment_id: { type: String },
        tags: {
            type: Object
        }
    },
    { _id: false } // Set _id to false to ignore default _id creation
);
const FBorderItemSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'catalogues',
        },
        quantity: {
            count: { type: Number }
        },
        parent_item_id: { type: String },
        fulfillment_id: { type: String },
        tags: {
            type: Object
        }
    },
    { _id: false } // Set _id to false to ignore default _id creation
);

const ondcOrdersSchema = new mongoose.Schema({
    context: { type: Object },
    transactionId: { type: String },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    billing: { type: Object },
    phone: { type: String },
    name: { type: String },
    email: { type: String },
    // items: { type: Array },
    fbItems: [FBorderItemSchema],
    items: [orderItemSchema],
    orderCategory: { type: Array },
    quote: { type: Object },
    activeQuote: { type: Object },
    fulfillments: { type: Array },
    returnFulfillments: { type: Array },
    payment: { type: Object },
    orderStatus: { type: String, enum: [OndcOrderStatus] },
    ondcOrderStatus: { type: String, enum: [OndcOrderStatus] },
    orderId: { type: String }, // our sytem order id
    ondcOrderId: { type: String }, // i.e comming from buyer side order id 
    deliveryPartnerOrderId: { type: String }, // i.e comming from buyer side order id 
    deliveryIterationCount: { type: Number, default: 0 },
    orderDeliveryMode: { type: String },
    cancelReason: { type: Object },
    isRefund: { type: Boolean, default: false },
    deliveryVendorStatus: { type: String, required: false, default: "" },
    orderMode: { type: String, required: false, default: "ondc" },
    kikoDeliveryStatusTracker: [{
        status: { type: String },
        createdAt: { type: Date },
    }],
    shippingDetails: { type: Object },
    deliveryVendor: { type: String },
    orderAmount: { type: Number, default: 0 },
    totalWeight: { type: Number, default: 0 },
    userAddress: { type: Object },
    deliveryDistanceInMeters: { type: Number, default: 0 },
    shippingAmount: { type: Number, default: 0 },
    actualShippingAmount: { type: Number, default: 0 },
    deliveryPartnerTaskId: { type: String },
    pickupOtp: { type: String },
    invoiceUrl: { type: String },
    isReturn: { type: Boolean },
    returnItem: { type: Array },
    kikoReturnStatusTracker: [{
        status: { type: String },
        createdAt: { type: Date },
    }],
    returnStatus: { type: String },
    returnReason: { type: String },
    deliveryPartnerTaskIdForReturn: { type: String },
    deliveryVendorForReturn: { type: String },
    buyerSettlementDetails: { type: Object },
    courierInfo: { type: Object },
    buyerAppFinderFee: { type: String },
    partialCancelledBy: { type: String },
    cancelledBy: { type: String },
    returnRequest: { type: Object },
    confirmTimeStamp: { type: String },
    createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
    orderDeliveryMode: {
        type: String,
        default: null,
        enum: ['KikoDelivery', 'SelfDelivery', null],
    },
    orderDeliveryModeForReturn: {
        type: String,
        default: null,
        enum: ['KikoDelivery', 'SelfDelivery', null],
    },
    orderTracking: {
        status: { type: String },
        createdAt: { type: Date },
    },
    rtoInitiatedReason: { type: String },
    productDeliveryImage: { type: String },
    settlementStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "completed", "rejected"]
    },
    settlementData: {
        date: { type: Date },
        amount: { type: Number, required: true, default: 0 },
        preTaxOrder: { type: Number, required: true, default: 0 },
        tcsIt: { type: Number, required: true, default: 0 },
        tcsGst: { type: Number, required: true, default: 0 },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "completed", "rejected"]
        },
        remark: { type: String }
    },
    settleFromBuyer: {
        type: Boolean,
        default: false
    },
    finalRetunItem: { type: Array },
    deliveryType: { type: String },
    buyerAppCommission: {
        value: { type: Number },
        key: { type: String },
    },
    kikoCommission: {
        value: { type: Number },
        key: { type: String },
    },
    ondcOrderServiceability: {
        freeDelivery: { type: Boolean, default: false },
        panIndiaDelivery: { type: Boolean, default: false },
        panIndiaDeliveryCharges: { type: Number, default: 0 },
    },
    deliveryPartnerCharges: { type: Number },
    onNetworklogisticData: {
        isOnNetwork: { type: Boolean, default: false },
        onNetworklogisticDeliveryType: { type: String },
        onNetworklogisticContext: { type: Object },
        onNetworklogisticOrderId: { type: String },
        onNetworklogisticOrderState: { type: String },
        onNetworklogisticProviderName: { type: Object },
        onNetworklogisticProviderItems: { type: Object },
        onNetworklogisticProviderRTOItems: { type: Object },
        onNetworklogisticQuote: { type: Object },
        onNetworklogisticfulfillmentType: { type: String },
        onNetworklogisticStatus: { type: String },
        onNetworklogisticFulfillmentData: {
            startInstructions: { type: Object },
            endInstructions: { type: Object },
            tracking: { type: Boolean, default: false },
            tags: { type: Array },
            agentDetails: { type: Object },
        },
        onNetworklogisticCancellation: { type: Object },
        lspAWBNumber: { type: String },
    },
    cancellation:{ type: Object },
    orderCreatedFromServer: { type: String },
    itcNotificationSent: { type: Boolean, default: false },
    brandName: { type: String },
    onNetworklogisticTransactionId: { type: String },
    logisticResponse: { type: Object },
    preStateTime: { type: Date },
    isFoodAndBeverage: { type: Boolean, default: false },
    additionalCharges: { type: Number },
    averageRating: { type: Number},
    settleFromBuyer: { type: Boolean, default: false },
    isAutoCancel: {type: Boolean, default: false}
}, { timestamps: { updatedAt: true, createdAt: false } });
module.exports = mongoose.model("OndcOrder", ondcOrdersSchema);

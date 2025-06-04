var mongoose = require('mongoose');
const uniqid = require('uniqid');

var SellerWalletHistorySchema = new mongoose.Schema({
    paymentType:{ type: String, default: '' },
    sellerId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount:{ type: Number, default: 0 },
    bonusAmount:{ type: Number, default: 0 },
    razorPayOrderId: { type: String, required: false, default: null },
    status: { type: String, default: '' },
    rawCharges: { type: Object, default: {} },
    payableAmount: { type: Number },
    closingBalance: { type: Number },
    paymentStatus: { type: String, default: 'pending' },
    remark: { type: String },
    orderId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'kikoorders'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ondcorders' 
        }
    ],
    holdAmount: { type: Number, default: 0 },
    kikoCommission: { type: Number, default: 0 },
    transactionId: { type: String },
    transactionFee: { type: Number }
},{ timestamps: true });

module.exports = mongoose.model('SellerWalletHistorys', SellerWalletHistorySchema);
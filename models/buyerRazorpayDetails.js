
var mongoose = require('mongoose');

var buyerRazorPayDetailsSchema = new mongoose.Schema({
    id: { type: String },
    entity: { type: String },
    amount: { type: Number },
    currency: { type: String },
    status: { type: String },
    order_id: { type: String },
    invoice_id: { type: Number },
    international: { type: Boolean },
    method: { type: String },
    amount_refunded: { type: Number },
    refund_status: { type: String },
    captured: { type: Boolean },
    description: { type: String },
    card_id: { type: String },
    bank: { type: String },
    wallet: { type: String },
    vpa: { type: String },
    email: { type: String },
    contact: { type: String },
    notes: {type: Object,}, 
    fee: { type: Number },
    tax: { type: Number },
    error_code: { type: Number },
    error_description: { type: String },
    error_source: { type: String },
    error_step: { type: String },
    error_reason: { type: String },
    acquirer_data: {
        rrn: { type: Number },
        upi_transaction_id: { type: String }  // Change to String
    },
    created_at: { type: String },
    upi: { vpa: { type: String } },
    settlementData:{type:Object},
    refundData:{type: Object},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('buyerRazorPayDetails', buyerRazorPayDetailsSchema);

const mongoose = require('mongoose');
const buyerAppCouponUsageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    couponCode: { type: String }, // Coupon code
    couponId: { type: mongoose.Schema.Types.ObjectId, ref: 'buyerappcoupons', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'buyerondcorder', required: true },
    // providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'buyerappseller' },
    providerId: { type: String, ref: 'buyerappseller' },
    usedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = mongoose.model('buyerappcouponusage', buyerAppCouponUsageSchema);
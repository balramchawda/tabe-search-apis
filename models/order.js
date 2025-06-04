var mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({
 orderId:{ type: String, index:true },
 userId:String,
 userInfo:{},
 courierService:{ type: String, default: "" },
 paymentStatus:{ type: String, default: "pending" },
 status:String,
 shippingStatus:String,
 cart:[],
 shippingAddress:{},
 phone:String,
 razorpay_order_id:String,
 razorpay_payment_id:String,
 orderDate:String,
 promocode:String,
 paymentBy:{ type: String, default: "Card" }, // it can be via Card or Promocode
 amount:{ type: Number, default: 0 },
 coinsUsed:{ type: Number, default: 0 },
 orderMessage:{ type: String, default: "" },
 createdDate:{ type: Date, default: Date.now },
 updatedDate:{ type: Date, default: Date.now }

},{ timestamps: true });
module.exports = mongoose.model('Orders', orderSchema);
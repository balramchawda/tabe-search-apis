const mongoose = require("mongoose");
const constant = require("../Constants");
const deviceTokenSchema = new mongoose.Schema({
	gcm: {
		type: String
	},
	apn: {
		type: String
	},
	user_id: { type: String, ref: "Users", require: true, index: { unique: true } },
	status:{ type: String,default: constant.deviceTokenStatus.Active}
},
	{ timestamps: true }
);

module.exports = mongoose.model("deviceToken", deviceTokenSchema);

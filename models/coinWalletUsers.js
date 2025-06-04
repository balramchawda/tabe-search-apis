const mongoose = require("mongoose");
const coinWalletUserSchema = new mongoose.Schema(
  {
    userId: { type: Object },
    videoView: {type: Number},
    likedVideo: {type: Number},
    sharedVideo: {type: Number},
    liveStream: {type: Number},
    eventShared: {type: Number},
    follow: {type: Number},
    orderPlaced: {type: Number},
    shopCall: {type: Number},
    coinReward: {type: Number},
    callDurationReward: {type: Number}
  },
  { timestamps: true }
);

module.exports = mongoose.model("coinWalletUser", coinWalletUserSchema);

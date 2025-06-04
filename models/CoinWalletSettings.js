const mongoose = require('mongoose');
let coinWalletSettings = require('mongoose').Schema;
const Constants = require('../Constants');

// transform
const omitPrivate = function (doc, wallet) {
    delete __v;
    return wallet;
};

const options = { toJSON: { transform: omitPrivate }, timestamps: true }

    coinWalletSettings = new coinWalletSettings({
    status: { type: Boolean, default: false, required: true },//status is for deleted or not
    
    signUp: { type: Number, required: true, default:3000 },//coin can earn on signup
    videoView: { type: Number, required: true, default:1 },//coin can earn on video viewed by user
    likedVideo: { type: Number, required: true, default:1 },//coin can earn on video liked
    sharedVideo: { type: Number, required: true, default:1 },//coin can earn on video shared
    liveStreamView: { type: Number, required: true, default:1 },//coin can earn on live view stream
    performLiveStream: { type: Number, required: true, default:1 },//coin can earn on live stream performed
    eventShared: { type: Number, required: true, default:1 },//coin can earn on event shared
    follow: { type: Number, required: true, default:1 },//coin can earn on follow a kiko user
    orderPlaced: { type: Number, required: true, default:1 },//coin can earn on order placed
    shopCall: { type: Number, required: true, default:1 },//coin can earn on order placed
    bonus: { type: Number, required: true, default:1 },//coin can earn on order placed
    coinReward: { type: Number, required: true, default:1 },//coin can earn on order placed
    signUpIcon: { type: String, required: true, default:"" },//activity icon
    bonusIcon: { type: String, required: true, default:"" },//activity icon
    videoViewIcon: { type: String, required: true, default:"" },//activity icon
    likedVideoIcon: { type: String, required: true, default:"" },//activity icon
    sharedVideoIcon: { type: String, required: true, default:"" },//activity icon
    liveStreamViewIcon: { type: String, required: true, default:"" },//activity icon
    performLiveStreamIcon: { type: String, required: true, default:"" },//activity icon
    eventSharedIcon: { type: String, required: true, default:"" },//activity icon
    followIcon: { type: String, required: true, default:"" },//activity icon
    orderPlacedIcon: { type: String, required: true, default:"" },//activity icon
    coinsEarnedIcon: { type: String, required: true, default:"" },//activity icon
    coinsRewardIcon: { type: String, required: true, default:"" },//activity icon
    shopCallIcon: { type: String, required: true, default:"" },//activity icon
    signUpType: { type: String, required: true, default:"" },//activity Type
    bonusType: { type: String, required: true, default:"" },//activity Type
    coinRewardType: { type: String, required: true, default:"" },//activity Type
    videoViewType: { type: String, required: true, default:"" },//activity Type
    likedVideoType: { type: String, required: true, default:"" },//activity Type
    sharedVideoType: { type: String, required: true, default:"" },//activity Type
    liveStreamViewType: { type: String, required: true, default:"" },//activity Type
    performLiveStreamType: { type: String, required: true, default:"" },//activity Type
    eventSharedType: { type: String, required: true, default:"" },//activity Type
    followType: { type: String, required: true, default:"" },//activity Type
    orderPlacedType: { type: String, required: true, default:"" },//activity Type
    shopCallType: { type: String, required: true, default:"" },//activity Type
    signUpMaxLimit: { type: Number, required: true, default:3000 },//Max limt of coin can earn on signup
    bonusMaxLimit: { type: Number, required: true, default:0 },//Max limt of coin can earn on signup
    videoViewMaxLimit: { type: Number, required: true, default:50 },// Max limit of coin can earn on video viewed by user
    likedVideoMaxLimit: { type: Number, required: true, default:50 },// Max limit of coin can earn on video liked
    sharedVideoMaxLimit: { type: Number, required: true, default:25 },// Max limit of coin can earn on video shared
    liveStreamViewMaxLimit: { type: Number, required: true, default:1 },// Max limit of coin can earn on live view stream
    performLiveStreamMaxLimit: { type: Number, required: true, default:1 },// Max limit of coin can earn on live stream performed
    eventSharedMaxLimit: { type: Number, required: true, default:25 },// Max limit of coin can earn on event shared
    followMaxLimit: { type: Number, required: true, default:25 },// Max limit of coin can earn on follow a kiko user
    orderPlacedMaxLimit: { type: Number, required: true, default:1 },// Max limit of coin can earn on order placed
    withdrawMinLimit:{ type: Number, required: true, default:0 },
    liveWithdrawMinLimit:{ type: Number, required: true, default:0 },
    callDurationReward:{ type: Number, required: true, default:0 },
    callRewardDailyLimit:{ type: Number, required: true, default:0 },
    liveWithdrawDailyLimit:{ type: Number, required: true, default:0 },
    heartCount:{ type: Number, required: true, default:0 },
    flowerCount:{ type: Number, required: true, default:0 },
    cakeCount:{ type: Number, required: true, default:0 },
    crakersCount:{ type: Number, required: true, default:0 },
}, options);

// model
module.exports = mongoose.model('coinWalletSettings', coinWalletSettings);

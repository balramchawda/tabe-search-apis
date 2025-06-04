const mongoose = require('mongoose');
let coinWallet = require('mongoose').Schema;
const _ = require('lodash');
const mongoosePaginate = require('mongoose-paginate-v2');
const Constants = require('../Constants');

// transform
const omitPrivate = function (doc, wallet) {
    delete __v;
    return wallet;
};

const options = { toJSON: { transform: omitPrivate }, timestamps: true }

coinWallet = new coinWallet({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },//user id of user who earned 
    isCredited: { type: Boolean, default: false, required: true },//to get all debits and credit photos
    coins: { type: Number, required: true },//no. of coins earned or spent
    status: { type: Boolean, default: true, required: true },//status is for active or not
    signUp: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },//_id of user signed up || later on if we start refer system
    videoView: { type: mongoose.Schema.Types.ObjectId, ref: '' },//_id of video viewed by user
    likedVideo: { type: mongoose.Schema.Types.ObjectId, ref: '' },//_id of video liked
    sharedVideo: { type: mongoose.Schema.Types.ObjectId, ref: '' },//_id of video shared
    activeTime: { type: Number, required: true, default: 0 },
    liveStreamView: { type: mongoose.Schema.Types.ObjectId, ref: '' },//_id of live view stream
    performLiveStream: { type: mongoose.Schema.Types.ObjectId, ref: '' },//_id of live stream performed
    eventShared: { type: mongoose.Schema.Types.ObjectId, ref: '' },//_id of event shared
    follow: { type: mongoose.Schema.Types.ObjectId, ref: '' },//_id person to whom he followed
    orderPlaced: { type: mongoose.Schema.Types.ObjectId, ref: '' },//_id of order placed
    activity: { type: String, trim: true, required: true, enum: Constants.coinEarningActivities },
    activityMessage: { type: String, required: true },
    redeem: { type: Boolean, default: false },//collect
    purchasedCoin: { type: mongoose.Schema.Types.ObjectId, ref: '' },//_id person to whom he followed
    isUpdatedValueNew: { type: Boolean, default: false },
    isUpdatedValue: { type: Boolean, default: false },
    bonus: { type: mongoose.Schema.Types.ObjectId,ref:'' },
    isAdmin: { type: Boolean, default: false },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: '' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Events' },
}, options);

// plugins
coinWallet.plugin(mongoosePaginate);

// model
module.exports = mongoose.model('coinWallet', coinWallet);

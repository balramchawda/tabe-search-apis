var mongoose = require("mongoose");
const Constant = require("../Constants");
const mongoosePaginate = require('mongoose-paginate-v2');
var userSchema = new mongoose.Schema(
  {
    name: String,
    photo: { type: String, default: "" },
    userId: { type: String, index: true },
    userName: { type: String, default: "", min: 5, max: 15, unique: true },
    password: String,
    passwordToken: String,
    deviceType: String, //android/ios
    deviceToken: { type: Array, default: [] },
    email: { type: String },
    phone: { type: String, default: "" },
    countryCode: { type: String, default: "+91" },
    mobile: { type: String, default: "" },
    role: { type: String, default: "user" }, //TODO:Define Enums
    isBlock: { type: Boolean, default: false },
    // createdDate: { type: Date, default: Date.now },
    // updatedDate: { type: Date, default: Date.now },
    dob: { type: String },
    gender: { type: String },
    Marital_status: { type: String },
    Anneversary_date: { type: String },
    isWhatsApp: { type: Boolean, default: false },
    isSMS: { type: Boolean, default: false },
    isEmail: { type: Boolean, default: false },
    otp: { type: String, default: "" },
    likes: { type: String, default: "" },
    video_likes: { type: String, default: "" },
    report_video: { type: Array, default: [] },
    //coins
    coins: { type: Number, default: 0 },
    store_userid: { type: String, default: "" },

    //agent details
    productCategory: [String],
    agentVendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    agentPermissions: [{
      module: { type: String, trim: true, required: true, enum: ['event', 'callLog', 'invoice', 'order'] },
      read: { type: Boolean },
      write: { type: Boolean }
    }],

    //max coin eran limit of user on different activities set on daily basis
    signUpMaxLimit: { type: Number, required: true, default: 3000, min: 0 }, //Max limt of coin can earn on signup
    videoViewMaxLimit: { type: Number, required: true, default: 50, min: 0 }, // Max limit of coin can earn on video viewed by user
    likedVideoMaxLimit: { type: Number, required: true, default: 50, min: 0 }, // Max limit of coin can earn on video liked
    sharedVideoMaxLimit: { type: Number, required: true, default: 25, min: 0 }, // Max limit of coin can earn on video shared
    liveStreamViewMaxLimit: { type: Number, required: true, default: 75, min: 0 }, // Max limit of coin can earn on live view stream
    performLiveStreamMaxLimit: { type: Number, required: true, default: 1, min: 0 }, // Max limit of coin can earn on live stream performed
    eventSharedMaxLimit: { type: Number, required: true, default: 25, min: 0 }, // Max limit of coin can earn on event shared
    followMaxLimit: { type: Number, required: true, default: 25, min: 0 }, // Max limit of coin can earn on follow a kiko user
    orderPlacedMaxLimit: { type: Number, required: true, default: 1, min: 0 }, // Max limit of coin can earn on order placed

    //calling status for agent
    callingStatus: {
      type: String,
      default: "offline",
      enum: Constant.videoCallStatusEnum,
    },
    agentCategory: { type: String },

    //vendor details
    isMasterAgent: { type: Boolean, default: false },
    storeStatus: { type: String, enum: ["online", "offline"], default: "online" },
    storeOpenTime: { type: Date },
    storeCloseTime: { type: Date },
    description: { type: String },
    storeName: { type: String },
    mainCategory: { type: String, ref: 'Categories' },
    subCategory: { type: String, ref: 'Categories' },
    landline: { type: String },
    wallet: { type: Number, default: 0 },
    totalSale: { type: Number, default: 0 },
    totalWithdraw: { type: Number, default: 0 },
    noOfViews: { type: Number, default: 0 },
    storeAddress: {
      address1: { type: String },
      address2: { type: String },
      nearBy: { type: String },
      state: { type: String },
      city: { type: String },
      pincode: { type: Number },
      country: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
      contactPersonName: { type: String },
      contactPersonMobile: { type: String },
    },
    bankDetails: {
      accountName: { type: String },
      accountNumber: { type: Number },
      accountBankName: { type: String },
      accountIfscCode: { type: String },
      accountCancleCheque: { type: String },
    },
    rewardBankDetails: {
      accountName: { type: String },
      accountNumber: { type: String },
      accountBankName: { type: String },
      accountIfscCode: { type: String },
      accountCancleCheque: { type: String },
      accountCancleChequeUpload: { type: String },
    },
    kycDetail: {
      aadharNumber: { type: String },
      aadharImage: { type: String },
      panNumber: { type: String },
      panImage: { type: String },
      gstNumber: { type: String },
      gstEnrollmentNumber: { type: String },
      signature:{ type: String },
      shopActNumber: { type: String },
      companyName: { type: String }
    },
    storeImages: [{ type: String }],
    storeLogo: { type: String },
    aadharNumberPic: { type: String },
    panNumberPic: { type: String },
    gstNumberPic: { type: String },
    addressProofPic: { type: String },
    shopActNumberPic: { type: String },
    accountCancleChequeUpload: { type: String },
    reachType: { type: String },
    reachValue: { type: String },
    videoPath: { type: String },
    isProfileComplete: { type: Boolean, default: false },
    productCategory: { type: Array },
    rPointTotalAmt: { type: Number, default: 0 },
    rPointBalance: { type: Number, default: 5 },
    rPointLockFund: { type: Number, default: 0 },
    rPointWithdrawaralAmt: { type: Number, default: 0 },
    orderDeliveryCharges: { type: Number, default: 0 },
    deviceName: { type: String, default: "" },
    livePointTotalAmt: { type: Number, default: 0 },
    livePointBalance: { type: Number, default: 0 },
    livePointLockFund: { type: Number, default: 0 },
    livePointWithdrawaralAmt: { type: Number, default: 0 },
    isProfileSkip: { type: Boolean, default: false },
    discountPercent: { type: Number, default: 5 },
    maxDiscount: { type: Number, default: 0 },
    hearAboutUs: { type: String },
    hearAboutUsOtherText: { type: String },
    loc: { type: Object },
    isVerified: { type: Boolean, default: false },
    walletBalance: { type: Number, default: 0 },
    blockCreateEvent: { type: Boolean, default: false },
    welcomeSms: { type: Boolean },
    modelName: { type: String },
    currentAppVersion: { type: String },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    customerListedSeller: { type: Boolean, default: false },
    isStoreVerified: { type: Boolean, default: false },
    verifiedBy: { type: String },
    verifiedDate: { type: Date },
    storeOffer: { type: String },
    appVersionCode: { type: String },
    osVersion: { type: String },
    nickName: { type: String },
    deviceId: { type: String },
    lastLoginAt: { type: Date },
    isDelete: { type: Boolean, default: false },
    deletedBy: { type: String },
    referredBy: { type: String },
    whatsAppNumber: { type: String },
    upiId: { type: String },
    qrCodeImage: { type: String },
    truecallerVerified: { type: Boolean },
    deliveryRadius: { type: Number, default: 15 },
    fssaiLicense: { type: String },
    slug: { type: String, unique: true },
    paymentMode: { type: String, default: "both", enum: ['prepaid', 'cod', 'both'] },
    websiteOrderServiceability: {
      freeDelivery: { type: Boolean, default: false },
      panIndiaDelivery: { type: Boolean, default: false },
      panIndiaDeliveryCharges: { type: Number, default: 0 },
      freeDeliveryMinValue: { type: Number },
      dayTimeTat: { type: String },
      nightTimeTat: { type: String },
    },
    ondcOrderServiceability: {
      freeDelivery: { type: Boolean, default: false },
      panIndiaDelivery: { type: Boolean, default: false },
      panIndiaDeliveryCharges: { type: Number, default: 0 },
      freeDeliveryMinValue: { type: Number },
      dayTimeTat: { type: String },
      nightTimeTat: { type: String },
    },
    ondcVerified: { type: Boolean, default: false },
    storeTiming: { type: Object },
    ondcUniqueKeyId: { type: String },
    storeTimingChangedAt: { type: Date },
    storePermanentlyDisabledAt: { type: Date },
    buyerAppLink: [{
      key: { type: String },
      value: { type: String }
    }],
    brandProviderId:  { type: String },
    brandName:  { type: String },
    webDeviceToken: { type: String },
    hyperLocalDeliveryCharges: { type: String },
    socialTags: { type: String },
    isSocialTag: { type: Boolean },
    commissionStructure: { type: String, default: 'old'  }, //new
    averageRating: { type: Number},
    restaurantId: {type: String, default: ''},
    mainRestaurantId:{type: String, default: ''},
    deliveryRadiusCharges:[{type: Object, default: ''}],
    deliveryMode: {type: String, default: "self-delivery"}, //on-network (this key is use for petpooja user handle deliverymode)
    wdDestCode: { type: String, default: ""}, // this is for ITC
    wdName: { type: String, default: ""}, // this is for ITC
    isAmbassador: { type: Boolean, default: false }, 
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "sellersubscriptions" },
    subscriptionActive: { type: Boolean, default: false },
    referalCode: { type: String, default: '' },
    isShowQC: { type: Boolean, default: false },
  },
  { timestamps: true, strict: false },

);
// plugins
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Users", userSchema);

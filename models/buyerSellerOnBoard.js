const mongoose = require("mongoose");

const buyerSellerOnBoardSchema = new mongoose.Schema(
  {
    sellerNPName: { type: String, default: "" },
    companyName: { type: String, default: "" },
    brandName: { type: String, default: "" },
    totalStores: { type: String, default: "" },
    spocName: { type: String, default: "" },
    spocNumber: { type: String, default: "" },
    techSpocName: { type: String, default: "" },
    techSpocNumber: { type: String, default: "" },
    city: { type: String, default: "" },
    pincode: { type: String, default: "" },
    address: { type: String, default: "" },
    panCardNumber: { type: String, default: "" },
    panCardImage: { type: String, default: "" },
    gstNumber: { type: String, default: "" },
    gstCertificate: { type: String, default: "" },
    digitalSignature: { type: String, default: "" },
    accountName: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    accountBankName: { type: String, default: "" },
    ifscCode: { type: String, default: "" },
    accountProof: { type: String, default: "" },
    branchName: { type: String, default: "" },
    isBlock: { type: Boolean, default: true },
    spocEmail: { type: String, default: "" },
    techSPOCEmail: { type: String, default: "" },
    kikoBFFPercentage: { type: Number, default: 0 },
    snpBlocked: { type: Boolean, default: true },
    fnbBFFPercentage: { type: Number, default: 0 }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model(
  "buyer-seller-onboard",
  buyerSellerOnBoardSchema
);

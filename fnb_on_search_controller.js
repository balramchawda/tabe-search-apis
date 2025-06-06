const moment = require("moment");
const now = new Date();
const ISTOffset = 330; // offset in minutes
const ISTTime = new Date(now.getTime() + ISTOffset * 60 * 1000);
let currentTimeStamp = ISTTime.toISOString();
currentTimeStamp = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const FnBCustomGroup = require("./models/fnb_custom_group.js");
const FnBCustomGroupItems = require("./models/fnb_custom_group_items.js");
const FnBCatalogues = require("./models/fnb_catalogues.js");
const FnBCustomMenu = require("./models/fnb_custom_menu.js");
const FnBSellers = require("./models/fnb_sellers.js");
const BuyerAppProducts = require("./models/fnb_catalogues.js");
// const FnBSellers = require("./models/buyerappseller");
const OndcCategory = require("./models/ondcCategories");
const BuyerAppVariantCategories = require("./models/buyerappvariantcategories");
let { generateKeyPair } = require("./ondcAuthentication");
let { categoriesList } = require("./categories");

let utils = require("./util");
const axios = require("axios");
const BuyerOndcSearchRequest = require("./models/buyerOndcSearchRequest");
const {
  createOndcOnSearchRequestRawData,
  updateOndcOnSearchRejectionData,
  isObjectEmpty,
  validateBppUri,
  checkContext,
  checkBppId,
  ondcConstants,
  compareSTDwithArea,
  checkMandatoryTags,
  groceryJSON,
  areTimestampsLessThanOrEqualTo,
  checkForStatutory,
  getStatutoryRequirement,
  statutory_reqs,
  checkGpsPrecision,
  isValidPhoneNumber,
  emailRegex,
  createOndcOnSearchFullRequestRawData,
  isoDurationToMinutes,
} = require("./util");
const _ = require("lodash");
const BuyerSellerOnBoard = require("./models/buyerSellerOnBoard");
const itemRatings = require("./models/fnb-itemRatings.js");
const fnbProviderRatings = require("./models/fnb-providerRatings.js");
const getCustomMenuRecord = async (customMenuId, providerId) => {
  try {
    // console.log(customMenuId, providerId,'customMenuId, providerId')
    return await FnBCustomMenu.findOne({
      generateMenuId: customMenuId,
      providerId,
    });
  } catch (error) {
    console.log(error, "issue in the custom menu");
    return "";
  }
};
const getCustomGroupId = async (customGroupId, providerId) => {
  try {
    const data = await FnBCustomGroup.findOne({
      generateGroupId: customGroupId,
      providerId,
    });
    if (data) {
      return data?._id;
    }
  } catch (error) {}
};

const getCustomGroupIds = async (childList, providerId) => {
  let list = [];
  for (let i = 0; i < childList?.length; i++) {
    // console.log(childList[i].value, "list[i].value");
    const data = await FnBCustomGroup.findOne(
      { generateGroupId: childList[i].value, providerId },
      { _id: 1 }
    );
    if (data) {
      list.push(data?._id);
    }
  }
  return list;
};

function isRelevant(wordList, input) {
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z\s]/g, "") // remove punctuation
      .replace(/\s+/g, " ") // collapse spaces
      .trim();
  if (!input) {
    return false;
  }
  const inputWords = normalize(input).split(" ");

  for (const phrase of wordList) {
    // console.log(phrase, "phrase");
    const phraseWords = normalize(phrase).split(" ");
    const phraseLength = phraseWords.length;

    for (let i = 0; i <= inputWords.length - phraseLength; i++) {
      const slice = inputWords.slice(i, i + phraseLength);
      if (slice.join(" ") === phraseWords.join(" ")) {
        return true;
      }
    }
  }

  return false;
}

function checkAgainstCategories(categories, word2) {
  for (const category of categories) {
    for (const [key, items] of Object.entries(category)) {
      // for (const item of items) {
      // console.log(item,'item---->>>>',)
      // if(item.includes("Naan")){
      //   console.log('enter---->plainNaan', item,'----->>>---', isRelevant(item, word2))
      // }
      if (isRelevant(items, word2)) {
        return key;
      }
      // }
    }
  }
  return "";
}
const createCustomGroup = async (categories, providerId) => {
  // try{
  //   for (let i = 0; i < categories?.length; i++) {
  //     if (
  //       categories[i].tags.find((t) => t.code === "type")?.list[0].value ===
  //       "custom_group"
  //     ) {
  //       const obj = {
  //         providerId: providerId,
  //         sequence: categories[i]?.tags?.find((t) => t.code === "config")?.list[3]
  //           ?.value,
  //         input: categories[i]?.tags?.find((t) => t.code === "config")?.list[2]
  //           ?.value,
  //         max: categories[i]?.tags?.find((t) => t.code === "config")?.list[1]
  //           ?.value,
  //         min: categories[i]?.tags?.find((t) => t.code === "config")?.list[0]
  //           ?.value,
  //         type: "custom_group",
  //         customGroupName: categories[i]?.descriptor?.name,
  //         generateGroupId: categories[i].id,
  //         itemIds: [],
  //       };
  //       await FnBCustomGroup.findOneAndUpdate(
  //         { providerId, generateGroupId: categories[i].id },
  //         { $set: obj },
  //         { upsert: true, new: true }
  //       );
  //       // console.log("*****custom_group successfylly***");
  //     } else if (
  //       categories[i].tags.find((t) => t.code === "type")?.list[0].value ===
  //       "custom_menu"
  //     ) {
  //       const value = checkAgainstCategories(categoriesList,categories[i].descriptor.name)
  //       // console.log(value,'----value---')
  //       const obj = {
  //         providerId: providerId,
  //         timeFrom: categories[i].tags
  //           .find((t) => t.code === "timing")
  //           ?.list.find((l) => l.code === "time_from").value,
  //         timeTo: categories[i].tags
  //           .find((t) => t.code === "timing")
  //           ?.list.find((l) => l.code === "time_to").value,
  //         dayFrom: categories[i].tags
  //           .find((t) => t.code === "timing")
  //           ?.list.find((l) => l.code === "day_from").value,
  //         dayTo: categories[i].tags
  //           .find((t) => t.code === "timing")
  //           ?.list.find((l) => l.code === "day_to").value,
  //         menuName: categories[i].descriptor.name,
  //         image: categories[i].descriptor.images?.[0] ?? "",
  //         rank: categories[i]?.tags?.find((t) => t.code === "display")?.list[0]
  //           .value,
  //         generateMenuId: categories[i].id,
  //         categoryTag: value,
  //         itemIds: [],
  //       };
  //       // console.log("FnBCustomMenu", providerId);
  //       await FnBCustomMenu.findOneAndUpdate(
  //         { providerId: providerId, generateMenuId: categories[i].id },
  //         { $set: obj },
  //         { upsert: true, new: true }
  //       );
  //       // console.log("*****custom_menu successfylly***");
  //     }
  //   }
  // }catch(error){
  //   console.log(error,'errro')
  // }

  try {
    const customGroupPromises = [];
    const customMenuPromises = [];
    // console.log("test")
    for (let i = 0; i < categories?.length; i++) {
      const category = categories[i];
      const typeTag = category.tags.find((t) => t.code === "type")?.list[0]
        ?.value;

      if (typeTag === "custom_group") {
        const configList =
          category.tags.find((t) => t.code === "config")?.list || [];
        const obj = {
          providerId,
          sequence: configList[3]?.value,
          input: configList[2]?.value,
          max: configList[1]?.value,
          min: configList[0]?.value,
          type: "custom_group",
          customGroupName: category?.descriptor?.name,
          generateGroupId: category.id,
          itemIds: [],
        };

        customGroupPromises.push(
          FnBCustomGroup.findOneAndUpdate(
            { providerId, generateGroupId: category.id },
            { $set: obj },
            { upsert: true, new: true }
          )
        );
      } else if (typeTag === "custom_menu") {
        const timingList =
          category.tags.find((t) => t.code === "timing")?.list || [];
        const displayList =
          category.tags.find((t) => t.code === "display")?.list || [];

        const obj = {
          providerId,
          timeFrom: timingList.find((l) => l.code === "time_from")?.value,
          timeTo: timingList.find((l) => l.code === "time_to")?.value,
          dayFrom: timingList.find((l) => l.code === "day_from")?.value,
          dayTo: timingList.find((l) => l.code === "day_to")?.value,
          menuName: category.descriptor.name,
          image: category.descriptor.images?.[0] ?? "",
          rank: displayList[0]?.value,
          generateMenuId: category.id,
          categoryTag: checkAgainstCategories(
            categoriesList,
            category.descriptor.name
          ),
          itemIds: [],
        };

        customMenuPromises.push(
          FnBCustomMenu.findOneAndUpdate(
            { providerId, generateMenuId: category.id },
            { $set: obj },
            { upsert: true, new: true }
          )
        );
      }
    }

    await Promise.all([...customGroupPromises, ...customMenuPromises]);
    console.log("All updates completed successfully");
  } catch (error) {
    console.error("Error during category processing:", error);
  }
};

const getSubCategoriesFrom = async (categories) => {
  let data = categories?.filter((t) =>
    t.tags.some((t) => t.code === "type" && t.list[0].value === "custom_menu")
  );
  let list = [];
  for (let i = 0; i < data?.length; i++) {
    list.push(data[i].descriptor.name);
  }
  return list;
};

const getServiceability = async (data) => {
  let services = await data?.find((d) => d.code == "serviceability")?.list;
  let serviceList = [
    {
      category: services?.find((s) => s.code == "category")?.value,
      type: services?.find((s) => s.code == "type")?.value,
      radius: services?.find((s) => s.code == "val")?.value
        ? services?.find((s) => s.code == "val")?.value
        : services?.find((s) => s.code == "value")?.value,
      unit: services?.find((s) => s.code == "unit")?.value,
    },
  ];
  return serviceList;
};

const onSearchSerial = async (req, res, callback) => {
  try {
    const payload = {
      context: req.body.context,
      message: { ack: { status: "ACK" } },
    };
    // console.log("res buyer on search ====>ack responsenew", payload);
    const body = req.body;
    const context = body?.context;
    const message = body?.message;
    const onSearchCatalog = message.catalog;

    const onSearchFFIdsArray = [];
    const prvdrsId = new Set();
    const prvdrLocId = new Set();
    const onSearchFFTypeSet = new Set();
    const itemsId = new Set();
    let customMenuIds = [];
    let customMenu = false;
    const provider = body?.message?.catalog?.["bpp/providers"];
    const descriptor = body?.message?.catalog?.["bpp/descriptor"];
    if (descriptor?.name === "Calori FIX 400") {
      console.log("", JSON.stringify(body));
    } else {
      // const payload = {
      //   context: body.context,
      //   message: { ack: { status: "ACK" } },
      // };
      // // console.log("res buyer on search ====>ack response", payload);
      // res.json(payload);
      // if (callback) {
      //   callback(payload); // Pass the payload to the callback for further processing
      // }
    }
    const bppFulfillments = body?.message?.catalog?.["bpp/fulfillments"];
    const onSearchErrorObj = {
      context: body.context,
      message: { ack: { status: "NACK" } },
      error: {},
    };
    const onSearchRejectionErrorObj = {
      context: body.context,
      message: { ack: { status: "NACK" } },
      rejectionError: [],
      rejectionReportError: [],
    };
    function addRejectionError(
      obj,
      type,
      path,
      code,
      message,
      providerId,
      itemId,
      providerName,
      itemName,
      eanNum
    ) {
      const errorObject = { type, path, code, message };
      const errorReportObject = {
        type,
        path,
        code,
        message,
        providerId,
        itemId,
        providerName,
        itemName,
        eanNum,
      };
      obj.rejectionError.push(errorObject);
      obj.rejectionReportError.push(errorReportObject);
    }
    const buyerSearchRequest = await BuyerOndcSearchRequest.findOne({
      transactionId: context?.transaction_id,
      action: "search",
    });
    const buyerSearchRequestBody = buyerSearchRequest?.reqBody;
    const searchReqTransactionId = buyerSearchRequest?.transactionId;
    const isIncrementalSearch = !searchReqTransactionId
      ? true
      : buyerSearchRequest?.type === "incremental" &&
        buyerSearchRequest?.isIncremental;
    // console.log(
    //   "buyer on_search response searchReqTransactionId ::::::======>",
    //   searchReqTransactionId,
    //   isIncrementalSearch
    // );
    if (context?.domain !== "ONDC:RET11") {
      const payload = {
        context: body.context,
        message: { ack: { status: "NACK" } },
        error: {
          type: "DOMAIN-ERROR",
          code: "20000",
          message: "Invalid Domain",
        },
      };
      return res.send(payload);
    } else {
      const payload = {
        context: body.context,
        message: { ack: { status: "ACK" } },
      };
      // console.log("res buyer on search ====>ack response", payload);
      res.json(payload);
      if (callback) {
        callback(payload); // Pass the payload to the callback for further processing
      }
    }
    if (!body || isObjectEmpty(body)) {
      Object.assign(onSearchErrorObj.error, {
        context_and_message: "JSON cannot be empty",
      });
    }
    if (
      !message ||
      !context ||
      !message.catalog ||
      isObjectEmpty(message) ||
      isObjectEmpty(message.catalog)
    ) {
      Object.assign(onSearchErrorObj.error, {
        missingFields:
          "/context, /message, /catalog or /message/catalog is missing or empty",
      });
    }
    validateBppUri(context.bpp_uri, context.bpp_id, onSearchErrorObj.error);
    const onSearchContextRes = checkContext(context, ondcConstants.ON_SEARCH);
    const checkBpp = checkBppId(context.bpp_id);
    if (context.transaction_id == context.message_id) {
      Object.assign(onSearchErrorObj.error, {
        [`txnIdMsgId`]: `Context transaction_id (${context.transaction_id}) and message_id (${context.message_id}) can't be the same.`,
      });
    }
    if (
      searchReqTransactionId &&
      !_.isEqual(
        buyerSearchRequestBody?.context?.transaction_id,
        context.transaction_id
      )
    ) {
      Object.assign(onSearchErrorObj.error, {
        [`${ondcConstants.ON_SEARCH}_txnId`]: `Transaction Id should be same as in /${ondcConstants.SEARCH}`,
      });
    }
    if (
      searchReqTransactionId &&
      !_.isEqual(
        context?.domain?.split(":")[1],
        buyerSearchRequestBody?.context?.domain?.split(":")[1]
      )
    ) {
      Object.assign(onSearchErrorObj.error, {
        [`Domain[${context?.action}]`]: `Domain should be same in each action`,
      });
    }
    if (checkBpp) {
      Object.assign(onSearchErrorObj.error, { bpp_id: checkBpp });
    }
    if (!onSearchContextRes?.valid) {
      Object.assign(onSearchErrorObj.error, onSearchContextRes?.ERRORS);
    }

    if (!body?.error) {
      const sellerBppId = context?.bpp_id;
      const length = provider?.length;
      let f = 0;
      while (f < length) {
        const provider_data = provider?.[f];
        const providerId = provider_data?.id;
        if (
          searchReqTransactionId &&
          !isIncrementalSearch &&
          sellerBppId &&
          providerId
        ) {
          const onSearchItemIds = provider_data?.items?.map((item) => item.id);
          // Update "inactive" status for items present in DB but not in webhook
          if (provider_data?.items?.length) {
            const onSearchItemIds = provider_data?.items?.map(
              (item) => item.id
            );
            // await FnBCatalogues.updateMany(
            //   {
            //     providerId,
            //     "context.bpp_id": sellerBppId,
            //     productId: { $nin: onSearchItemIds },
            //   },
            //   { $set: { status: "inactive" } }
            // );
          }
        }
        f++;
      }
      const uniqueCodes = [
        { code: "1", type: "EAN" },
        { code: "2", type: "ISBN" },
        { code: "3", type: "GTIN" },
        { code: "4", type: "HSN" },
        { code: "5", type: "others" },
      ];
      if (!isIncrementalSearch) {
        if (descriptor && Object.keys(descriptor)?.length) {
          if (
            !descriptor.short_desc ||
            !descriptor.long_desc ||
            !descriptor.name
          ) {
            const key = `bpp/descriptor`;
            Object.assign(onSearchErrorObj.error, {
              [key]: `short_desc or long_desc or name should be provided in bpp/descriptor`,
            });
          }
          if (!descriptor.images?.length) {
            const key = `bpp/descriptor/images`;
            Object.assign(onSearchErrorObj.error, {
              [key]: `images should be provided in bpp/descriptor`,
            });
          }
          if (descriptor?.tags?.length) {
            descriptor?.tags?.map((tag) => {
              if (tag.code === "bpp_terms") {
                const npType = tag?.list?.find(
                  (item) => item.code === "np_type"
                );
                if (!npType) {
                  Object.assign(onSearchErrorObj.error, {
                    ["bpp/descriptor"]: `Missing np_type in bpp/descriptor`,
                  });
                } else {
                  if (!["MSN", "ISN"].includes(npType.value)) {
                    Object.assign(onSearchErrorObj.error, {
                      ["bpp/descriptor"]: `np_type value should be either "MSN" or "ISN" in bpp_terms`,
                    });
                  }
                }
              } else {
                Object.assign(onSearchErrorObj.error, {
                  ["bpp/descriptor"]: `Missing bpp_terms in bpp/descriptor`,
                });
              }
            });
          } else {
            Object.assign(onSearchErrorObj.error, {
              ["bpp/descriptor/tags"]: `tags is missing in bpp/descriptor`,
            });
          }
        } else {
          Object.assign(onSearchErrorObj.error, {
            ["bpp/descriptor"]: `Missing bpp/descriptor`,
          });
        }

        //
        if (bppFulfillments?.length) {
          bppFulfillments.forEach((ff, index) => {
            if (!ff.type || !ff.id) {
              const key = `bpp/fulfillments/${index}`;
              Object.assign(onSearchErrorObj.error, {
                [key]: `id or type should be provided in bpp/fulfillments`,
              });
            } else if (
              ![
                "Delivery",
                "Self-Pickup",
                "Buyer-Delivery",
                "Delivery and Self-Pickup",
              ].includes(ff.type)
            ) {
              const key = `bpp/fulfillments/${index}`;
              Object.assign(onSearchErrorObj.error, {
                [key]: `valid type should be provided in bpp/fulfillments ["Delivery", "Self-Pickup", "Buyer-Delivery","Delivery and Self-Pickup"]`,
              });
            }
          });
        }
      }
      try {
        if (!isIncrementalSearch) {
          const categories =
            req.body.message.catalog["bpp/providers"]?.[0]?.["categories"];
          categories?.forEach((category, index) => {
            if (category?.parent_category_id === category.id) {
              Object.assign(onSearchErrorObj.error, {
                [`categories[${category.id}].prnt_ctgry_id`]: `/message/catalog/bpp/providers/categories/parent_category_id should not be the same as id in category '${category.descriptor.name}'`,
              });
            }
            category.tags.forEach((tag) => {
              if (tag.list.length === 0) {
                Object.assign(onSearchErrorObj.error, {
                  [`provider[0].categories[${category.id}].tags[${index}]`]: `Empty list array provided for tag '${tag.code}' in category '${category.descriptor.name}'`,
                });
              }
              if (tag.code === "display") {
                tag.list.forEach((item) => {
                  if (item.code === "rank" && parseInt(item.value) === 0) {
                    Object.assign(onSearchErrorObj.error, {
                      [`provider[0].categories[${category.id}].tags[${index}].list[${item.code}]`]: `display rank provided in /message/catalog/bpp/providers/categories (category:'${category?.descriptor?.name}) should not be zero ("0"), it should start from one ('1') '`,
                    });
                  }
                });
              }
              if (tag.code === "config") {
                tag.list.forEach((item) => {
                  if (item.code === "seq" && parseInt(item.value) === 0) {
                    Object.assign(onSearchErrorObj.error, {
                      [`categories[${category.id}].tags[${index}].list[${item.code}]`]: `Seq value should start from 1 and not 0 in category '${category.descriptor.name}'`,
                    });
                  }
                });
              }
              if (tag.code === "type") {
                tag.list.forEach((item) => {
                  if (item.code === "type") {
                    if (
                      (category.parent_category_id == "" ||
                        category.parent_category_id) &&
                      item.value == "custom_group"
                    ) {
                      if (category.parent_category_id) {
                        Object.assign(onSearchErrorObj.error, {
                          [`categories[${category.id}].tags[${index}].list[${item.code}]`]: `parent_category_id should not have any value while type is ${item.value}`,
                        });
                      }
                      // Object.assign(onSearchErrorObj.error, {
                      //   [`categories[${category.id}].tags[${index}].list[${item.code}]`]: `parent_category_id should not be present while type is ${item.value}`,
                      // });
                    }
                    // else if ((category.parent_category_id != "") && (item.value == 'custom_menu' || item.value == 'variant_group')) {
                    //   if (category.parent_category_id) {
                    //     errorObj[`categories[${category.id}].tags[${index}].list[${item.code}]`] = `parent_category_id should be empty string while type is ${item.value}`
                    //   }
                    //   errorObj[`categories[${category.id}].tags[${index}].list[${item.code}]`] = `parent_category_id should be present while type is ${item.value}`
                    // }
                    // else if ((category.parent_category_id) && (item.value == 'custom_menu' || item.value == 'variant_group')) {
                    //   if (category.parent_category_id) {
                    //     errorObj[`categories[${category.id}].tags[${index}].list[${item.code}]`] = `parent_category_id should be empty string while type is ${item.value}`
                    //   }
                    // }
                  }
                });
              }
            });
          });
        }
      } catch (error) {
        console.log(error, "error");
      }
      const providerLen = provider?.length;
      const tmpstmp = context?.timestamp;
      if (!providerLen) {
        Object.assign(onSearchErrorObj.error, {
          ["bpp/providers"]: `Missing bpp/providers`,
        });
      }
      let i = 0;
      while (i < providerLen) {
        const provider_data = provider?.[i];
        const providerName = provider_data?.descriptor?.name ?? "";
        await createOndcOnSearchFullRequestRawData(
          context?.transaction_id,
          context?.action,
          context?.bpp_id,
          provider_data.id,
          provider_data
        );
        let rejectedProviders = [];
        onSearchRejectionErrorObj.rejectionReportError = [];
        // console.log(i, "i", "providerLen", providerLen);
        // console.log(
        //   "==============>>>>>>>>>>onSearchRejectionErrorObj999",
        //   onSearchRejectionErrorObj.rejectionReportError,
        //   provider_data?.id
        // );
        if (!provider_data.id) {
          const key = `message.catalog.bpp/providers[${i}]/id`;
          addRejectionError(
            onSearchRejectionErrorObj,
            "PROVIDER-ERROR",
            key,
            "20000",
            `provider id is missing`,
            "-",
            "-",
            providerName,
            "-",
            "-"
          );
          rejectedProviders.push({ id: "NA", error: `provider id is missing` });
        }
        if (!isIncrementalSearch) {
          if (
            !_.isEqual(
              buyerSearchRequestBody?.context?.message_id,
              context.message_id
            )
          ) {
            Object.assign(onSearchErrorObj.error, {
              [`msgId`]: `Message Ids for /${ondcConstants.SEARCH} and /${ondcConstants.ON_SEARCH} api should be same`,
            });
          }
          if (!_.isEqual(buyerSearchRequestBody?.context?.city, context.city)) {
            Object.assign(onSearchErrorObj.error, {
              city: `City code mismatch in /${ondcConstants.ON_SEARCH}`,
            });
          }
          if (
            !(provider_data?.locations?.[0]?.id || provider_data?.location_id)
          ) {
            const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]`;
            addRejectionError(
              onSearchRejectionErrorObj,
              "PROVIDER-ERROR",
              key,
              "20004",
              "Provider location not found",
              provider_data?.id,
              "-",
              providerName,
              "-",
              "-"
            );
            rejectedProviders.push({ id: provider_data.id, error: key });
          }
          if (provider_data?.descriptor) {
            if (!provider_data?.descriptor?.symbol) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/descriptor`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20006",
                "symbol is missing in descriptor",
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            }
            if (!provider_data?.descriptor?.name) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/descriptor/name`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20006",
                "name is missing in descriptor",
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            }
            if (
              !provider_data.descriptor.short_desc ||
              !provider_data.descriptor.long_desc
            ) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/descriptor`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `short_desc and long_desc should be provided in /message/catalog/bpp/providers[${i}]/descriptor`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            }
            if (!provider_data.descriptor.images?.length) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/descriptor/images`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `images should be provided in /message/catalog/bpp/providers[${i}]/descriptor`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            }
          } else {
            const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]`;
            addRejectionError(
              onSearchRejectionErrorObj,
              "PROVIDER-ERROR",
              key,
              "20006",
              `Missing descriptor object`,
              provider_data?.id,
              "-",
              providerName,
              "-",
              "-"
            );
            rejectedProviders.push({ id: provider_data.id, error: key });
          }
          if (provider_data?.time) {
            const providerTime = new Date(
              provider_data?.time?.timestamp
            ).getTime();
            const contextTimestamp = new Date(tmpstmp).getTime();
            if (providerTime > contextTimestamp) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/time/timestamp`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `store enable/disable timestamp (/bpp/providers/time/timestamp) should be less then or equal to context.timestamp`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            }
          }
          provider_data?.locations?.forEach((loc, index) => {
            const address = loc?.address;
            if (address) {
              const area_code = Number.parseInt(address.area_code);
              const std = context.city.split(":")[1];
              const areaWithSTD = compareSTDwithArea(area_code, std);
              // if (!areaWithSTD) {
              //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/locations[${index}]/address/area_code`;
              //   addRejectionError(
              //     onSearchRejectionErrorObj,
              //     "PROVIDER-ERROR",
              //     key,
              //     "20000",
              //     `STD code does not match with correct area_code on /${ondcConstants.ON_SEARCH}`,
              //     provider_data?.id,
              //     "-",
              //     providerName,
              //     "-",
              //     "-"
              //   );
              //   rejectedProviders.push({ id: provider[i]?.id, error: key });
              // }
              if (!address?.city) {
                const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/locations[${index}]/address/city`;
                addRejectionError(
                  onSearchRejectionErrorObj,
                  "PROVIDER-ERROR",
                  key,
                  "20000",
                  `city is missing in provider address`,
                  provider_data?.id,
                  "-",
                  providerName,
                  "-",
                  "-"
                );
                rejectedProviders.push({ id: provider[i]?.id, error: key });
              }
            } else {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/locations[${index}]/address`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `provider address is missing`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider[i]?.id, error: key });
            }
            if (loc?.gps) {
              // if (!checkGpsPrecision(loc.gps)) {
              //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/locations[${index}]/gps`;
              //   addRejectionError(
              //     onSearchRejectionErrorObj,
              //     "PROVIDER-ERROR",
              //     key,
              //     "20000",
              //     `/bpp/providers[${i}]/locations[${index}]/gps coordinates must be specified with at least six decimal places of precision.`,
              //     provider_data?.id,
              //     "-",
              //     providerName,
              //     "-",
              //     "-"
              //   );
              //   rejectedProviders.push({ id: provider[i]?.id, error: key });
              // }
            } else {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/locations[${index}]/gps`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                `provider[${i}]gpsPrecision`,
                "20000",
                `/bpp/providers[${i}]/locations[${index}]/gps coordinates must be present.`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider[i]?.id, error: key });
            }
            if (loc?.time) {
              const days = loc?.time?.days?.split(",");
              days?.forEach((day) => {
                day = parseInt(day);
                if (isNaN(day) || day < 1 || day > 7) {
                  const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/locations[${index}]/time/days`;
                  addRejectionError(
                    onSearchRejectionErrorObj,
                    "PROVIDER-ERROR",
                    key,
                    "20000",
                    `store days should be in the format ("1,2,3,4,5,6,7") where 1- Monday and 7- Sunday`,
                    provider_data?.id,
                    "-",
                    providerName,
                    "-",
                    "-"
                  );
                  rejectedProviders.push({ id: provider[i]?.id, error: key });
                }
              });
              const scheduleObject = loc?.time?.schedule?.holidays;
              const [currentDate] = tmpstmp.split("T");
              scheduleObject?.map((date) => {
                const dateObj = new Date(date);
                const currentDateObj = new Date(currentDate);
                if (dateObj.getTime() < currentDateObj.getTime()) {
                  const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/locations[${index}]/time/schedule/holidays`;
                  addRejectionError(
                    onSearchRejectionErrorObj,
                    "PROVIDER-ERROR",
                    key,
                    "20000",
                    `Holidays cannot be past ${currentDate}`,
                    provider_data?.id,
                    "-",
                    providerName,
                    "-",
                    "-"
                  );
                  rejectedProviders.push({ id: provider_data.id, error: key });
                }
              });
            } else {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/locations[${index}]`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `location time must be present`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider[i]?.id, error: key });
            }
          });
          // const categories = provider_data?.['categories']
          // if (!categories || !categories.length) {
          //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]`
          //   addRejectionError(onSearchRejectionErrorObj, "PROVIDER-ERROR", key, "20000", `Support for variants is mandatory, categories must be present in bpp/providers[${i}]`, provider_data?.id, "-",providerName, "-", "-");
          //   rejectedProviders.push({ id: provider_data.id, error: key })
          // }
          // else {
          //   categories.forEach((item, index) => {
          //     if (!item?.descriptor?.name) {
          //       const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/categories[${index}]`
          //       addRejectionError(onSearchRejectionErrorObj, "PROVIDER-ERROR", key, "20000", `name should be provided for categories[${index}]/descriptor`, provider_data?.id, "-",providerName, "-", "-");
          //       rejectedProviders.push({ id: provider_data.id, error: key })
          //     }
          //     if (!item.id) {
          //       const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/categories[${index}]/id`
          //       addRejectionError(onSearchRejectionErrorObj, "PROVIDER-ERROR", key, "20000", `id should be provided for categories[${index}]`, provider_data?.id, "-",providerName, "-", "-");
          //       rejectedProviders.push({ id: provider_data.id, error: key })
          //     }
          //   })
          //   const catLen = categories?.length
          //   let j = 0
          //   while (j < catLen) {
          //     const category = categories[j]
          //     category?.tags?.map((tag, index) => {
          //       switch (tag.code) {
          //         case 'type':
          //           const codeList = tag.list.find((item) => item.code === 'type')
          //           if (
          //             !(
          //               codeList.value === 'custom_menu' ||
          //               codeList.value === 'custom_group' ||
          //               codeList.value === 'variant_group'
          //             )
          //           ) {
          //             const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/categories[${j}]/tags[${index}]`
          //             addRejectionError(onSearchRejectionErrorObj, "PROVIDER-ERROR", key, "20000", `list.code == type then value should be one of 'custom_menu','custom_group' and 'variant_group' in bpp/providers[${i}]`, provider_data?.id, "-",providerName, "-", "-");
          //             rejectedProviders.push({ id: provider_data.id, error: key })
          //           }
          //           break;
          //         case 'attr':
          //           const attrList = tag?.list?.find((item) => item.code === 'name')
          //           const seqList = tag?.list?.find((item) => item.code === 'seq')
          //           if (!(attrList && Object.keys(attrList).length) || !(seqList && Object.keys(seqList).length)) {
          //             const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/categories[${j}]/tags[${index}]`
          //             addRejectionError(onSearchRejectionErrorObj, "PROVIDER-ERROR", key, "20000", `name or seq code should be in bpp/providers[${i}]`, provider_data?.id, "-",providerName, "-", "-");
          //             rejectedProviders.push({ id: provider_data.id, error: key })
          //           }
          //           break;
          //       }
          //     })
          //     j++
          //   }
          // }
          const fulfillments = provider_data?.["fulfillments"];
          const timeLabel = provider_data?.time;
          const phoneNumber = fulfillments?.[0]?.contact?.phone;
          const ffEmail = fulfillments?.[0]?.contact?.email;
          if (!timeLabel || !timeLabel?.label || !timeLabel?.timestamp) {
            const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/time]`;
            addRejectionError(
              onSearchRejectionErrorObj,
              "PROVIDER-ERROR",
              key,
              "20000",
              `time object or time.label or time.timestamp is missing`,
              provider_data?.id,
              "-",
              providerName,
              "-",
              "-"
            );
            rejectedProviders.push({ id: provider_data.id, error: key });
          } else if (!["enable", "disable"].includes(timeLabel?.label)) {
            const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/time/label]`;
            addRejectionError(
              onSearchRejectionErrorObj,
              "PROVIDER-ERROR",
              key,
              "20000",
              `time.label should be valid either "enable" or "disable"`,
              provider_data?.id,
              "-",
              providerName,
              "-",
              "-"
            );
            rejectedProviders.push({ id: provider_data.id, error: key });
          }
          if (fulfillments?.length > 0) {
            if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/fulfillments[0]/contact/phone`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `Please enter a valid phone number consisting of 10 or 11 digits without any spaces or special characters.`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            } else if (!phoneNumber) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/fulfillments[0]/contact`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `Please enter a valid phone number consisting of 10 or 11 digits without any spaces or special characters.`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            }
            const checkEmail = emailRegex(ffEmail);
            if (ffEmail && !checkEmail) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/fulfillments[0]/contact/email`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `Please enter a valid email of provider or seller NP.`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            } else if (!ffEmail) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/fulfillments[0]/contact`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `Please enter a valid email of provider or seller NP.`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            }
          } else {
            const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/fulfillments`;
            addRejectionError(
              onSearchRejectionErrorObj,
              "PROVIDER-ERROR",
              key,
              "20000",
              `fulfillments array is missing`,
              provider_data?.id,
              "-",
              providerName,
              "-",
              "-"
            );
            rejectedProviders.push({ id: provider_data.id, error: key });
          }
          const tags = provider_data?.["tags"];
          if (!tags || !tags.length) {
            const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags`;
            addRejectionError(
              onSearchRejectionErrorObj,
              "PROVIDER-ERROR",
              key,
              "20000",
              `tags must be present in bpp/providers[${i}]`,
              provider_data?.id,
              "-",
              providerName,
              "-",
              "-"
            );
            rejectedProviders.push({ id: provider_data.id, error: key });
          }
          if (tags) {
            const serviceability_code_obj = tags.find(
              (item) => item.code === "serviceability"
            );
            const timing_code_obj = tags.find((item) => item.code === "timing");
            if (!serviceability_code_obj) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags/serviceability`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `serviceability code is missing`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            }
            if (!timing_code_obj) {
              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags/timing`;
              addRejectionError(
                onSearchRejectionErrorObj,
                "PROVIDER-ERROR",
                key,
                "20000",
                `${provider_data.id} timing code object is missing`,
                provider_data?.id,
                "-",
                providerName,
                "-",
                "-"
              );
              rejectedProviders.push({ id: provider_data.id, error: key });
            }
            tags?.forEach((sc, t) => {
              if (sc.code === "serviceability") {
                if ("list" in sc) {
                  // if (sc.list.length != 5) {
                  //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/serviceability`;
                  //   addRejectionError(
                  //     onSearchRejectionErrorObj,
                  //     "PROVIDER-ERROR",
                  //     key,
                  //     "20000",
                  //     `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract`,
                  //     provider_data?.id,
                  //     "-",
                  //     providerName,
                  //     "-",
                  //     "-"
                  //   );
                  //   rejectedProviders.push({
                  //     id: provider_data.id,
                  //     error: key,
                  //   });
                  // }
                  //checking location
                  const loc =
                    sc.list.find((elem) => elem.code === "location") || "";
                  if (!loc) {
                    const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/loc`;
                    addRejectionError(
                      onSearchRejectionErrorObj,
                      "PROVIDER-ERROR",
                      key,
                      "20000",
                      `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (location is missing)`,
                      provider_data?.id,
                      "-",
                      providerName,
                      "-",
                      "-"
                    );
                    rejectedProviders.push({
                      id: provider_data.id,
                      error: key,
                    });
                  }
                  //checking category
                  const ctgry =
                    sc.list.find((elem) => elem.code === "category") || "";
                  if (!ctgry) {
                    const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/category`;
                    addRejectionError(
                      onSearchRejectionErrorObj,
                      "PROVIDER-ERROR",
                      key,
                      "20000",
                      `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (category is missing)`,
                      provider_data?.id,
                      "-",
                      providerName,
                      "-",
                      "-"
                    );
                    rejectedProviders.push({
                      id: provider_data.id,
                      error: key,
                    });
                  }
                  //checking type (hyperlocal, intercity or PAN India)
                  const type =
                    sc.list.find((elem) => elem.code === "type") || "";
                  if (!type) {
                    const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/type`;
                    addRejectionError(
                      onSearchRejectionErrorObj,
                      "PROVIDER-ERROR",
                      key,
                      "20000",
                      `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (type is missing)`,
                      provider_data?.id,
                      "-",
                      providerName,
                      "-",
                      "-"
                    );
                    rejectedProviders.push({
                      id: provider_data.id,
                      error: key,
                    });
                  } else {
                    if (type?.value) {
                      switch (type.value) {
                        case "10":
                          {
                            //For hyperlocal
                            const val =
                              sc.list.find((elem) => elem.code === "val") || "";
                            if (val?.value) {
                              if (isNaN(val.value)) {
                                const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/valvalue`;
                                addRejectionError(
                                  onSearchRejectionErrorObj,
                                  "PROVIDER-ERROR",
                                  key,
                                  "20000",
                                  `value should be a number (code:"val") for type 10 (hyperlocal) in /bpp/providers[${i}]/tags[${t}]`,
                                  provider_data?.id,
                                  "-",
                                  providerName,
                                  "-",
                                  "-"
                                );
                                rejectedProviders.push({
                                  id: provider_data.id,
                                  error: key,
                                });
                              }
                            } else {
                              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/val`;
                              addRejectionError(
                                onSearchRejectionErrorObj,
                                "PROVIDER-ERROR",
                                key,
                                "20000",
                                `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (value is missing for code "val")`,
                                provider_data?.id,
                                "-",
                                providerName,
                                "-",
                                "-"
                              );
                              rejectedProviders.push({
                                id: provider_data.id,
                                error: key,
                              });
                            }
                            const unit =
                              sc.list.find((elem) => elem.code === "unit") ||
                              "";
                            if (unit?.value) {
                              if (unit.value != "km") {
                                const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/unitvalue`;
                                addRejectionError(
                                  onSearchRejectionErrorObj,
                                  "PROVIDER-ERROR",
                                  key,
                                  "20000",
                                  `value should be "km" (code:"unit") for type 10 (hyperlocal) in /bpp/providers[${i}]/tags[${t}]`,
                                  provider_data?.id,
                                  "-",
                                  providerName,
                                  "-",
                                  "-"
                                );
                                rejectedProviders.push({
                                  id: provider_data.id,
                                  error: key,
                                });
                              }
                            } else {
                              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/unit`;
                              addRejectionError(
                                onSearchRejectionErrorObj,
                                "PROVIDER-ERROR",
                                key,
                                "20000",
                                `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (value is missing for code "unit")`,
                                provider_data?.id,
                                "-",
                                providerName,
                                "-",
                                "-"
                              );
                              rejectedProviders.push({
                                id: provider_data.id,
                                error: key,
                              });
                            }
                          }
                          break;
                        case "11":
                          {
                            //intercity
                            const val =
                              sc.list.find((elem) => elem.code === "val") || "";
                            if (val?.value) {
                              const pincodes = val.value.split(/,|-/);
                              pincodes.forEach((pincode) => {
                                if (isNaN(pincode) || pincode.length != 6) {
                                  const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/valvalue`;
                                  addRejectionError(
                                    onSearchRejectionErrorObj,
                                    "PROVIDER-ERROR",
                                    key,
                                    "20000",
                                    `value should be a valid range of pincodes (code:"val") for type 11 (intercity) in /bpp/providers[${i}]/tags[${t}]`,
                                    provider_data?.id,
                                    "-",
                                    providerName,
                                    "-",
                                    "-"
                                  );
                                  rejectedProviders.push({
                                    id: provider_data.id,
                                    error: key,
                                  });
                                }
                              });
                            } else {
                              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/val`;
                              addRejectionError(
                                onSearchRejectionErrorObj,
                                "PROVIDER-ERROR",
                                key,
                                "20000",
                                `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (value is missing for code "val")`,
                                provider_data?.id,
                                "-",
                                providerName,
                                "-",
                                "-"
                              );
                              rejectedProviders.push({
                                id: provider_data.id,
                                error: key,
                              });
                            }
                            const unit =
                              sc.list.find((elem) => elem.code === "unit") ||
                              "";
                            if (unit?.value) {
                              if (unit.value != "pincode") {
                                const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/unitvalue`;
                                addRejectionError(
                                  onSearchRejectionErrorObj,
                                  "PROVIDER-ERROR",
                                  key,
                                  "20000",
                                  `value should be "pincode" (code:"unit") for type 11 (intercity) in /bpp/providers[${i}]/tags[${t}]`,
                                  provider_data?.id,
                                  "-",
                                  providerName,
                                  "-",
                                  "-"
                                );
                                rejectedProviders.push({
                                  id: provider_data.id,
                                  error: key,
                                });
                              }
                            } else {
                              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/unit`;
                              addRejectionError(
                                onSearchRejectionErrorObj,
                                "PROVIDER-ERROR",
                                key,
                                "20000",
                                `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (value is missing for code "unit")`,
                                provider_data?.id,
                                "-",
                                providerName,
                                "-",
                                "-"
                              );
                              rejectedProviders.push({
                                id: provider_data.id,
                                error: key,
                              });
                            }
                          }
                          break;
                        case "12":
                          {
                            //PAN India
                            const val =
                              sc.list.find((elem) => elem.code === "val") || "";
                            if (val?.value) {
                              if (val.value != "IND") {
                                const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/valvalue`;
                                addRejectionError(
                                  onSearchRejectionErrorObj,
                                  "PROVIDER-ERROR",
                                  key,
                                  "20000",
                                  `value should be "IND" (code:"val") for type 12 (PAN India) in /bpp/providers[${i}]tags[${t}]`,
                                  provider_data?.id,
                                  "-",
                                  providerName,
                                  "-",
                                  "-"
                                );
                                rejectedProviders.push({
                                  id: provider_data.id,
                                  error: key,
                                });
                              }
                            } else {
                              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/val`;
                              addRejectionError(
                                onSearchRejectionErrorObj,
                                "PROVIDER-ERROR",
                                key,
                                "20000",
                                `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (value is missing for code "val")`,
                                provider_data?.id,
                                "-",
                                providerName,
                                "-",
                                "-"
                              );
                              rejectedProviders.push({
                                id: provider_data.id,
                                error: key,
                              });
                            }
                            const unit =
                              sc.list.find((elem) => elem.code === "unit") ||
                              "";
                            if (unit?.value) {
                              if (unit.value != "country") {
                                const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/unitvalue`;
                                addRejectionError(
                                  onSearchRejectionErrorObj,
                                  "PROVIDER-ERROR",
                                  key,
                                  "20000",
                                  `value should be "country" (code:"unit") for type 12 (PAN India) in /bpp/providers[${i}]tags[${t}]`,
                                  provider_data?.id,
                                  "-",
                                  providerName,
                                  "-",
                                  "-"
                                );
                                rejectedProviders.push({
                                  id: provider_data.id,
                                  error: key,
                                });
                              }
                            } else {
                              const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/unit`;
                              addRejectionError(
                                onSearchRejectionErrorObj,
                                "PROVIDER-ERROR",
                                key,
                                "20000",
                                `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (value is missing for code "unit")`,
                                provider_data?.id,
                                "-",
                                providerName,
                                "-",
                                "-"
                              );
                              rejectedProviders.push({
                                id: provider_data.id,
                                error: key,
                              });
                            }
                          }
                          break;
                        case "13":
                          //Polygon
                          break;
                        default: {
                          const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/type`;
                          addRejectionError(
                            onSearchRejectionErrorObj,
                            "PROVIDER-ERROR",
                            key,
                            "20000",
                            `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (invalid type "${type.value}")`,
                            provider_data?.id,
                            "-",
                            providerName,
                            "-",
                            "-"
                          );
                          rejectedProviders.push({
                            id: provider_data.id,
                            error: key,
                          });
                        }
                      }
                    } else {
                      const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/type`;
                      addRejectionError(
                        onSearchRejectionErrorObj,
                        "PROVIDER-ERROR",
                        key,
                        "20000",
                        `serviceability construct /bpp/providers[${i}]/tags[${t}] should be defined as per the API contract (type is missing)`,
                        provider_data?.id,
                        "-",
                        providerName,
                        "-",
                        "-"
                      );
                      rejectedProviders.push({
                        id: provider_data.id,
                        error: key,
                      });
                    }
                  }
                }
              }
              if (sc.code === "timing") {
                const fulfillments = provider_data["fulfillments"];
                const fulfillmentTypes = fulfillments?.map(
                  (fulfillment) => fulfillment.type
                );
                let isOrderPresent = false;
                const typeCode = sc?.list.find((item) => item.code === "type");
                if (typeCode) {
                  const timingType = typeCode.value;
                  if (
                    timingType === "Order" ||
                    timingType === "Delivery" ||
                    timingType === "Self-Pickup" ||
                    timingType === "All"
                  ) {
                    isOrderPresent = true;
                  } else if (!fulfillmentTypes.includes(timingType)) {
                    const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/timing`;
                    addRejectionError(
                      onSearchRejectionErrorObj,
                      "PROVIDER-ERROR",
                      key,
                      "20000",
                      `The type '${timingType}' in timing tags should match with types in fulfillments array, along with 'Order'`,
                      provider_data?.id,
                      "-",
                      providerName,
                      "-",
                      "-"
                    );
                    rejectedProviders.push({
                      id: provider_data.id,
                      error: key,
                    });
                  }
                }
                if (!isOrderPresent) {
                  const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/tags[${t}]/timing`;
                  addRejectionError(
                    onSearchRejectionErrorObj,
                    "PROVIDER-ERROR",
                    key,
                    "20000",
                    `Valid type must be present in timing tags`,
                    provider_data?.id,
                    "-",
                    providerName,
                    "-",
                    "-"
                  );
                  rejectedProviders.push({ id: provider_data.id, error: key });
                }
              }
            });
          }
        }

        let j = 0;
        let categoriesId = new Set();
        const categories =
          req.body.message.catalog["bpp/providers"]?.[i]?.["categories"];
        if (!categories || !categories.length) {
          const key = `prvdr.categories`;
          // Object.assign(onSearchErrorObj.error, {
          //   [key]: `Support for variants is mandatory, categories must be present in bpp/providers[0]`,
          // });
        }
        const iLens = categories?.length;
        // while (j < iLens) {
        //   const category = categories[j];

        //   const fulfillments =
        //     onSearchCatalog["bpp/providers"][i]["fulfillments"];
        //   const phoneNumber = fulfillments[i]?.contact?.phone;

        //   if (!isValidPhoneNumber(phoneNumber)) {
        //     const key = `bpp/providers0fulfillments0`;
        //     Object.assign(onSearchErrorObj.error, {
        //       [key]: `Please enter a valid phone number consisting of  10 or  11 digits without any spaces or special characters. `,
        //     });
        //   }

        //   if (categoriesId.has(category.id)) {
        //     const key = `prvdr0category${j}`;
        //     Object.assign(onSearchErrorObj.error, {
        //       [key]: `duplicate category id: ${category.id} in bpp/providers[0]`,
        //     });
        //   } else {
        //     categoriesId.add(category.id);
        //   }

        //   try {
        //     // category.tags.map((tag, index) => {
        //     //   switch (tag.code) {
        //     //     case "type":
        //     //       const codeList = tag.list.find(
        //     //         (item) => item.code === "type"
        //     //       );
        //     //       if (
        //     //         !(
        //     //           codeList.value === "custom_menu" ||
        //     //           codeList.value === "custom_group" ||
        //     //           codeList.value === "variant_group"
        //     //         )
        //     //       ) {
        //     //         const key = `prvdr0category${j}tags${index}`;
        //     //         Object.assign(onSearchErrorObj.error, {
        //     //           [key]: `list.code == type then value should be one of 'custom_menu','custom_group' and 'variant_group' in bpp/providers[0]`,
        //     //         });
        //     //       }

        //     //       if (codeList.value === "custom_group") {
        //     //         // customGrpId.add(category.id);
        //     //       }

        //     //       break;
        //     //     case "timing":
        //     //       for (const item of tag.list) {
        //     //         switch (item.code) {
        //     //           case "day_from":
        //     //           case "day_to":
        //     //             const dayValue = parseInt(item.value);
        //     //             if (
        //     //               isNaN(dayValue) ||
        //     //               dayValue < 1 ||
        //     //               dayValue > 7 ||
        //     //               !/^-?\d+(\.\d+)?$/.test(item.value)
        //     //             ) {
        //     //               Object.assign(onSearchErrorObj.error, {
        //     //                 [`prvdr0category${j}tags${index}custom_menu_timing_tag`]: `Invalid value for '${item.code}': ${item.value}`,
        //     //               });
        //     //             }

        //     //             break;
        //     //           case "time_from":
        //     //           case "time_to":
        //     //             if (!/^([01]\d|2[0-3])[0-5]\d$/.test(item.value)) {
        //     //               Object.assign(onSearchErrorObj.error, {
        //     //                 [`prvdr0category${j}tags${index}time_to`]: `Invalid time format for '${item.code}': ${item.value}`,
        //     //               });
        //     //             }

        //     //             break;
        //     //           default:
        //     //             Object.assign(onSearchErrorObj.error, {
        //     //               [`prvdr0category${j}tags${index}Tagtiming`]: `Invalid list.code for 'timing': ${item.code}`,
        //     //             });
        //     //         }
        //     //       }

        //     //       const dayFromItem = tag.list.find(
        //     //         (item) => item.code === "day_from"
        //     //       );
        //     //       const dayToItem = tag.list.find(
        //     //         (item) => item.code === "day_to"
        //     //       );
        //     //       const timeFromItem = tag.list.find(
        //     //         (item) => item.code === "time_from"
        //     //       );
        //     //       const timeToItem = tag.list.find(
        //     //         (item) => item.code === "time_to"
        //     //       );

        //     //       if (dayFromItem && dayToItem && timeFromItem && timeToItem) {
        //     //         const dayFrom = parseInt(dayFromItem.value, 10);
        //     //         const dayTo = parseInt(dayToItem.value, 10);
        //     //         const timeFrom = parseInt(timeFromItem.value, 10);
        //     //         const timeTo = parseInt(timeToItem.value, 10);

        //     //         if (dayTo < dayFrom) {
        //     //           Object.assign(onSearchErrorObj.error, {
        //     //             [`prvdr0category${j}tags${index}day_from`]:
        //     //               "'day_to' must be greater than or equal to 'day_from'",
        //     //           });
        //     //         }

        //     //         if (timeTo <= timeFrom) {
        //     //           Object.assign(onSearchErrorObj.error, {
        //     //             [`prvdr0category${j}tags${index}time_from`]:
        //     //               "'time_to' must be greater than 'time_from'",
        //     //           });
        //     //         }
        //     //       }

        //     //       break;
        //     //     case "display":
        //     //       for (const item of tag.list) {
        //     //         if (
        //     //           item.code !== "rank" ||
        //     //           !/^-?\d+(\.\d+)?$/.test(item.value)
        //     //         ) {
        //     //           Object.assign(onSearchErrorObj.error, {
        //     //             [`prvdr0category${j}tags${index}rank`]: `Invalid value for 'display': ${item.value}`,
        //     //           });
        //     //         } else {
        //     //           if (categoryRankSet.has(category.id)) {
        //     //             const key = `prvdr${i}category${j}rank`;
        //     //             Object.assign(onSearchErrorObj.error, {
        //     //               [key]: `duplicate rank in category id: ${category.id} in bpp/providers[${i}]`,
        //     //             });
        //     //           } else {
        //     //             categoryRankSet.add(category.id);
        //     //           }
        //     //         }
        //     //       }

        //     //       break;
        //     //     case "config":
        //     //       const minItem = tag.list.find((item) => item.code === "min");
        //     //       const maxItem = tag.list.find((item) => item.code === "max");
        //     //       const inputItem = tag.list.find(
        //     //         (item) => item.code === "input"
        //     //       );
        //     //       const seqItem = tag.list.find((item) => item.code === "seq");

        //     //       if (!minItem || !maxItem) {
        //     //         Object.assign(onSearchErrorObj.error, {
        //     //           [`customization_config_${j}`]: `Both 'min' and 'max' values are required in 'config' at index: ${j}`,
        //     //         });
        //     //       }

        //     //       if (!/^-?\d+(\.\d+)?$/.test(minItem.value)) {
        //     //         Object.assign(onSearchErrorObj.error, {
        //     //           [`customization_config_min_${j}`]: `Invalid value for ${minItem.code}: ${minItem.value} at index: ${j}`,
        //     //         });
        //     //       }

        //     //       if (!/^-?\d+(\.\d+)?$/.test(maxItem.value)) {
        //     //         Object.assign(onSearchErrorObj.error, {
        //     //           [`customization_config_max_${j}`]: `Invalid value for ${maxItem.code}: ${maxItem.value}at index: ${j}`,
        //     //         });
        //     //       }

        //     //       if (!/^-?\d+(\.\d+)?$/.test(seqItem.value)) {
        //     //         Object.assign(onSearchErrorObj.error, {
        //     //           [`config_seq_${j}`]: `Invalid value for ${seqItem.code}: ${seqItem.value} at index: ${j}`,
        //     //         });
        //     //       }

        //     //       const inputEnum = ["select", "text"];
        //     //       if (!inputEnum.includes(inputItem.value)) {
        //     //         Object.assign(onSearchErrorObj.error, {
        //     //           [`config_input_${j}`]: `Invalid value for 'input': ${inputItem.value}, it should be one of ${inputEnum} at index: ${j}`,
        //     //         });
        //     //       }

        //     //       break;
        //     //   }
        //     // });
        //   } catch (error) {
        //     console.log(error,'error')
        //     console.log("error in categoriezs");
        //   }
        //   j++;
        // }
        let maxdiscount = 0;
        let minTimeToShip = Infinity;
        const items = provider_data["items"];
        const iLen = items?.length;
        if (!iLen && !isIncrementalSearch) {
          const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')]/items`;
          addRejectionError(
            onSearchRejectionErrorObj,
            "PROVIDER-ERROR",
            key,
            "20005",
            "Items not found",
            provider_data?.id,
            "-",
            providerName,
            "-",
            "-"
          );
          rejectedProviders.push({ id: provider_data.id, error: key });
        }
        let savedFnBSeller = {};
        const reqBody = req.body;

        const providerData = reqBody.message?.catalog?.["bpp/providers"]?.[i];

        if (iLen > 0) {
          // if (callback) {
          //   callback(payload);  // Pass the payload to the callback for further processing
          // }
          // console.log(providerData?.items?.[0]?.["@ondc/org/time_to_ship"],'providerData?.items?.[0]?.["@ondc/org/time_to_ship"]')

          const categoriesIds = await getSubCategoriesFrom(
            req.body.message.catalog["bpp/providers"]?.[i]?.["categories"]
          );
          const serviceabilityRadius = await getServiceability(
            req.body.message.catalog["bpp/providers"][i]["tags"]
          );
          // if(!isIncrementalSearch){
          const SellerData = {
            name: req.body.message.catalog["bpp/providers"][i]["descriptor"][
              "name"
            ],
            description:
              req.body.message.catalog["bpp/providers"][i]["descriptor"][
                "long_desc"
              ],
            photo:
              req.body.message.catalog["bpp/providers"][i]["descriptor"][
                "symbol"
              ],
            context: req.body.context,
            loc: {
              type: "Point",
              coordinates: [
                req.body.message.catalog["bpp/providers"][i]["locations"][0][
                  "gps"
                ].split(",")[1],
                req.body.message.catalog["bpp/providers"][i]["locations"][0][
                  "gps"
                ].split(",")[0],
              ],
            },

            locations:
              req.body.message.catalog["bpp/providers"][i]["locations"],
            storeStatus: "enable",
            providerStatus:
              req.body.message.catalog["bpp/providers"][i]["time"],
            providerId: req.body.message.catalog["bpp/providers"][i]["id"],
            categoryIds: ["F&B"],
            subCategoryIds: categoriesIds,
            serviceabilityRadius: serviceabilityRadius, // [
            //   {
            //       "category" : "F&B",
            //       "type" : "10",
            //       "radius" : "5",
            //       "unit" : "km"
            //   },
            //   {
            //     "category" : "F&B",
            //     "type" : "12",
            //     "radius" : "IND",
            //     "unit" : "country"
            // }
            // ]
            bppDescriptor: req.body.message.catalog["bpp/descriptor"],
            maxDiscountPercentage: "",
            storeTagline: "",
            storeTags: "",
            isBlock: false,
            snpBlocked: false,
            timeToShip: providerData?.items?.[0]?.["@ondc/org/time_to_ship"]
              ? await isoDurationToMinutes(
                  providerData?.items?.[0]?.["@ondc/org/time_to_ship"]
                )
              : 0,
            providerOnSearchStatus: "ACK",
            fssai_license_no:
              req.body.message.catalog["bpp/providers"][i][
                "@ondc/org/fssai_license_no"
              ],
          };
          // return;
          savedFnBSeller = await FnBSellers.findOneAndUpdate(
            { providerId: req.body.message.catalog["bpp/providers"][i]["id"] },
            { $set: SellerData },
            { upsert: true, new: true }
          );
          console.log(savedFnBSeller._id,'savedFnBSeller')
          if (req.body.message.catalog["bpp/providers"][i]?.rating) {
            let averageRating;
            let totalRatings;
            let existingProvider = await fnbProviderRatings.findOne({
              userId: req.body.message.catalog["bpp/providers"][i]["id"],
            });

            if (existingProvider) {
              existingProvider.totalRating += Number(
                req.body.message.catalog["bpp/providers"][i]?.rating
              );
              existingProvider.ratingCount += 1;
              averageRating =
                existingProvider.totalRating / existingProvider.ratingCount;
              existingProvider.averageRating = averageRating;
              totalRatings = existingProvider.totalRating;

              await existingProvider.save();
            } else {
              averageRating = Number(
                req.body.message.catalog["bpp/providers"][i]?.rating
              );
              totalRatings = averageRating;
              let newProviderRating = new fnbProviderRatings({
                itemId: req.body.message.catalog["bpp/providers"][i]["id"],
                totalRating: averageRating,
                ratingCount: 1,
                averageRating: averageRating,
              });

              await newProviderRating.save();
            }

            await FnBSellers.updateOne(
              {
                providerId: req.body.message.catalog["bpp/providers"][i]["id"],
              },
              {
                $set: {
                  averageRatings: averageRating,
                  totalRatings: totalRatings,
                },
              }
            );
          }
          // console.log(
          //   "*****savedFnBSeller successfylly***",
          //   savedFnBSeller._id
          // );
          let rejectedCustomGroupItems = [];

          const items = providerData?.items;
          const customGroup = providerData?.categories?.filter((c) =>
            c.tags?.some(
              (t) => t.code === "type" && t.list?.[0]?.value === "custom_group"
            )
          );
          const withouCustomItems = items.filter(
            (it) => it.category_ids?.length > 0
          );
          _.filter(withouCustomItems, (item) => {
            const eanCodes = item?.descriptor?.code?.split(":");
            const eanNum = eanCodes?.[1] ?? "";
            const itemName = item?.descriptor?.name ?? "";
            // Assuming custom_group holds the configuration data
            const custGroupData = customGroup?.find(
              (c) =>
                c.id ===
                item?.tags?.find((t) => t.code === "custom_group")?.list[0]
                  ?.value
            );
            // console.log(custGroupData,'customGroupData' ,item?.tags?.find(t=>t.code === "custom_group")?.list[0].value)
            // Check for minimum customizations
            if (
              custGroupData?.tags?.findIndex(
                (t) =>
                  t.code === "config" &&
                  t.list?.find((l) => t.code == "min" && t.value === "1")
              ) != undefined &&
              custGroupData?.tags?.findIndex(
                (t) =>
                  t.code === "config" &&
                  t.list?.find((l) => l.code == "min" && l.value === "1")
              ) != -1
            ) {
              const customizationRcords = items.filter((it) =>
                it.tags?.some(
                  (t) =>
                    t.code === "parent" &&
                    t.list[0]?.value == custGroupData.id &&
                    t.list[1]?.value == "yes"
                )
              );

              if (customizationRcords.length < 1) {
                // console.log(customizationRcords?.length, "first length");

                const key = `item${item.id}CustomGroup/min`;
                addRejectionError(
                  onSearchRejectionErrorObj,
                  "ITEM-ERROR",
                  key,
                  "20000",
                  `Item with id: ${item.id} must have at least one default customization as config.min is set to 1.`,
                  provider_data?.id,
                  item?.id,
                  providerName,
                  itemName,
                  eanNum
                );
                rejectedCustomGroupItems.push({ id: item.id, error: key });
              }
            }

            // Check for maximum customizations
            if (
              custGroupData?.tags?.findIndex(
                (t) =>
                  t.code === "config" &&
                  t.list?.find((l) => t.code == "min" && t.value === "1")
              ) != undefined &&
              custGroupData?.tags?.findIndex(
                (t) =>
                  t.code === "config" &&
                  t.list?.find((l) => l.code == "max" && l.value === "2")
              ) != -1
            ) {
              const customizationRcords = items.filter((it) =>
                it.tags?.some(
                  (t) =>
                    t.code === "parent" &&
                    t.list[0]?.value == custGroupData.id &&
                    t.list[1]?.value == "yes"
                )
              );
              // console.log(customizationRcords?.length, "seconds length");

              if (customizationRcords?.length > 2) {
                const key = `item${item.id}CustomGroup/max`;
                addRejectionError(
                  onSearchRejectionErrorObj,
                  "ITEM-ERROR",
                  key,
                  "20000",
                  `Item with id: ${item.id} can have at most 2 customizations as config.max is set to 2.`,
                  provider_data?.id,
                  item?.id,
                  providerName,
                  itemName,
                  eanNum
                );
                rejectedCustomGroupItems.push({ id: item.id, error: key });
              }
            }
          });
          // await createCustomGroup(providerData?.categories, savedFnBSeller._id);
          let t = 0;
          // while (t < iLen) {
          //   console.log(t,'t------>>>')
          //   let rejectedItems = [];
          //   const item = items[t];
          //   const itemTimeStamp = item?.time?.timestamp;
          //   const eanCodes = item?.descriptor?.code?.split(":");
          //   const eanNum = eanCodes?.[1] ?? "";
          //   const itemName = item?.descriptor?.name ?? "";
          //   const op = areTimestampsLessThanOrEqualTo(itemTimeStamp, tmpstmp);
          //   if (!item.id) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[${t}]`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `item id is missing`,
          //       provider_data?.id,
          //       "NA",
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: "NA", error: key });
          //   }
          //   if (
          //     !["enable", "disable"].includes(item?.time?.label) &&
          //     item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //       "customization"
          //   ) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/time`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `time.label should be valid either "enable" or "disable"`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: provider_data.id, error: key });
          //   }
          //   if (
          //     !op &&
          //     item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //       "customization"
          //   ) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/time/timestamp`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `Timestamp for item[${t}] can't be greater than context.timestamp`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   if (
          //     (!item?.descriptor?.short_desc || !item?.descriptor?.long_desc) &&
          //     item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //       "customization"
          //   ) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/descriptor`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `short_desc and long_desc should be provided in /message/catalog/bpp/providers[${i}]/items[${t}]/descriptor`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   // if (itemsId.has(item.id)) {
          //   //   const key = `DuplicateItem[${j}]`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "20000",
          //   //     `duplicate item id: ${item.id} in bpp/providers[${i}]`,
          //   //     provider_data?.id,
          //   //     item?.id,
          //   //     providerName,
          //   //     itemName,
          //   //     eanNum
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // } else {
          //     itemsId.add(item.id);
          //   // }
          //   if (!item?.descriptor?.name) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/descriptor/name`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `name should be provided in /message/catalog/bpp/providers[${i}]/items[${t}]/descriptor`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   if (
          //     !item?.descriptor?.images?.length &&
          //     item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //       "customization"
          //   ) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/descriptor/images`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "91003",
          //       `Product images should be provided in /message/catalog/bpp/providers[${i}]/items[${t}]/descriptor`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   if (!item?.quantity) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `item.quantity is missing`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   if (!item?.quantity?.available) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/available`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `item.quantity.available.count is invalid or missing`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   // if (!item?.quantity?.maximum) {
          //   //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/maximum`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "20000",
          //   //     `item.quantity.maximum.count is invalid or missing`,
          //   //     provider_data?.id,
          //   //     item?.id,
          //   //     providerName,
          //   //     itemName,
          //   //     eanNum
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // }
          //   // if (!item?.quantity?.unitized?.measure?.value) {
          //   //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/unitized/measure`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "20000",
          //   //     `item.quantity.unitized.measure.value is invalid or missing`,
          //   //     provider_data?.id,
          //   //     item?.id,
          //   //     providerName,
          //   //     itemName,
          //   //     eanNum
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // }
          //   // if (!item?.quantity?.unitized?.measure?.unit) {
          //   //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/unitized/measure/unit`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "20000",
          //   //     `item.quantity.unitized.measure.unit is missing`,
          //   //     provider_data?.id,
          //   //     item?.id,
          //   //     providerName,
          //   //     itemName,
          //   //     eanNum
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // } else if (
          //   //   ![
          //   //     "unit",
          //   //     "dozen",
          //   //     "gram",
          //   //     "kilogram",
          //   //     "tonne",
          //   //     "litre",
          //   //     "millilitre",
          //   //   ].includes(item?.quantity?.unitized?.measure?.unit)
          //   // ) {
          //   //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/unitized/measure/unit`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "20000",
          //   //     `item.quantity.unitized.measure.unit is invalid should be one of these ["unit", "dozen", "gram", "kilogram", "tonne", "litre", "millilitre"]`,
          //   //     provider_data?.id,
          //   //     item?.id,
          //   //     providerName,
          //   //     itemName,
          //   //     eanNum
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // }
          //   // if (
          //   //   item?.quantity &&
          //   //   item?.quantity?.available &&
          //   //   typeof item?.quantity?.available?.count === "string"
          //   // ) {
          //   //   const availCount = parseInt(item.quantity.available.count);
          //   //   const maxCount = parseInt(item?.quantity?.maximum?.count);
          //   //   if (item?.quantity?.unitized?.measure?.value <= 0) {
          //   //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/unitized/measure/value`;
          //   //     addRejectionError(
          //   //       onSearchRejectionErrorObj,
          //   //       "ITEM-ERROR",
          //   //       key,
          //   //       "20000",
          //   //       `item.quantity.unitized.measure.value should be greater than 0`,
          //   //       provider_data?.id,
          //   //       item?.id,
          //   //       providerName,
          //   //       itemName,
          //   //       eanNum
          //   //     );
          //   //     rejectedItems.push({ id: item.id, error: key });
          //   //   }
          //   //   if (availCount < 0 || maxCount < 0) {
          //   //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/unitized/available/count`;
          //   //     addRejectionError(
          //   //       onSearchRejectionErrorObj,
          //   //       "ITEM-ERROR",
          //   //       key,
          //   //       "20000",
          //   //       `item.quantity.available.count and item.quantity.maximum.count should be greater than or equal to 0`,
          //   //       provider_data?.id,
          //   //       item?.id,
          //   //       providerName,
          //   //       itemName,
          //   //       eanNum
          //   //     );
          //   //     rejectedItems.push({ id: item.id, error: key });
          //   //   }
          //   // }
          //   // if (!item?.descriptor?.code) {
          //   //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/descriptor/code`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "20000",
          //   //     `code should provided in /message/catalog/bpp/providers[${i}]/items[${t}]/descriptor`,
          //   //     provider_data?.id,
          //   //     item?.id,
          //   //     providerName,
          //   //     itemName,
          //   //     eanNum
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // }
          //   //  else {
          //   //   const itemCodeArr = item.descriptor.code.split(":");
          //   //   const itemDescType = itemCodeArr[0];
          //   //   const itemDescCode = itemCodeArr[1];
          //   //   if (itemDescType != "1") {
          //   //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/descriptor/code`;
          //   //     addRejectionError(
          //   //       onSearchRejectionErrorObj,
          //   //       "ITEM-ERROR",
          //   //       key,
          //   //       "20000",
          //   //       `code should have 1:EAN as a value in /message/catalog/bpp/providers[${i}]/items[${t}]/descriptor/code`,
          //   //       provider_data?.id,
          //   //       item?.id,
          //   //       providerName,
          //   //       itemName,
          //   //       eanNum
          //   //     );
          //   //     rejectedItems.push({ id: item.id, error: key });
          //   //   } else {
          //   //     const regex = /^\d{8}$|^\d{13}$/;
          //   //     if (!regex.test(itemDescCode)) {
          //   //       const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/descriptor/code`;
          //   //       addRejectionError(
          //   //         onSearchRejectionErrorObj,
          //   //         "ITEM-ERROR",
          //   //         key,
          //   //         "20000",
          //   //         `code should provided in /message/catalog/bpp/providers[${i}]/items[${t}]/descriptor/code(${itemDescCode}) should be number and with either length 8 or 13`,
          //   //         provider_data?.id,
          //   //         item?.id,
          //   //         providerName,
          //   //         itemName,
          //   //         eanNum
          //   //       );
          //   //       rejectedItems.push({ id: item.id, error: key });
          //   //     }
          //   //   }
          //   // }
          //   // if (
          //   //   !item.category_ids &&
          //   //   item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //   //     "customization"
          //   // ) {
          //   //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/category_id`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "91021",
          //   //     `category_id is missing`,
          //   //     provider_data?.id,
          //   //     item?.id,
          //   //     providerName,
          //   //     itemName,
          //   //     eanNum
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // }
          //   if (
          //     item["@ondc/org/available_on_cod"] !== false &&
          //     item["@ondc/org/available_on_cod"] !== true &&
          //     item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //       "customization"
          //   ) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/@ondc/org/available_on_cod`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `@ondc/org/available_on_cod is missing or should be a boolean value`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   if (
          //     item["@ondc/org/cancellable"] !== false &&
          //     item["@ondc/org/cancellable"] !== true &&
          //     item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //       "customization"
          //   ) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/@ondc/org/cancellable`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `@ondc/org/cancellable is missing or should be a boolean value`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   // if (
          //   //   item["@ondc/org/returnable"] !== false &&
          //   //   item["@ondc/org/returnable"] !== true &&
          //   //   item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //   //     "customization"
          //   // ) {
          //   //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/@ondc/org/returnable`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "20000",
          //   //     `@ondc/org/returnable is missing or should be a boolean value`,
          //   //     provider_data?.id,
          //   //     item?.id,
          //   //     providerName,
          //   //     itemName,
          //   //     eanNum
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // }
          //   const regex =
          //     /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
          //   if (
          //     (!item["@ondc/org/time_to_ship"] ||
          //       !item["@ondc/org/time_to_ship"]?.match(regex)) &&
          //     item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //       "customization"
          //   ) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/@ondc/org/time_to_ship`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "20000",
          //       `@ondc/org/time_to_ship is missing or should be in valid ISO 8601 format`,
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   // if (
          //   //   (!item["@ondc/org/return_window"] ||
          //   //     !item["@ondc/org/return_window"]?.match(regex)) &&
          //   //   item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //   //     "customization"
          //   // ) {
          //   //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/@ondc/org/return_window`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "20000",
          //   //     `@ondc/org/return_window is missing or should be in valid ISO 8601 format`,
          //   //     provider_data?.id,
          //   //     item?.id,
          //   //     providerName,
          //   //     itemName,
          //   //     eanNum
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // }
          //   // console.log(
          //   //   item?.tags?.find((it) => it?.code === "type")?.list[0]?.value,
          //   //   "break ----------------------------->>>"
          //   // );
          //   // break;
          //   // if (
          //   //   !item?.fulfillment_id &&
          //   //   item?.tags?.find((it) => it?.code === "type")?.list[0]?.value !==
          //   //     "customization"
          //   // ) {
          //   //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/fulfillment_id`;
          //   //   addRejectionError(
          //   //     onSearchRejectionErrorObj,
          //   //     "ITEM-ERROR",
          //   //     key,
          //   //     "20000",
          //   //     `fulfillment_id is missing`,
          //   //     provider_data?.id,
          //   //     item?.id
          //   //   );
          //   //   rejectedItems.push({ id: item.id, error: key });
          //   // }
          //   if (
          //     item.quantity &&
          //     item?.quantity?.maximum &&
          //     typeof item?.quantity?.maximum?.count === "string"
          //   ) {
          //     const maxCount = parseInt(item?.quantity?.maximum?.count);
          //     const availCount = parseInt(item?.quantity?.available?.count);
          //     if (availCount == 99 && maxCount <= 0) {
          //       const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/maximum/count`;
          //       addRejectionError(
          //         onSearchRejectionErrorObj,
          //         "ITEM-ERROR",
          //         key,
          //         "20000",
          //         `item.quantity.maximum.count should be either default value 99 (no cap per order) or any other positive value (cap per order) in /bpp/providers[${i}]/items[${t}]`,
          //         provider_data?.id,
          //         item?.id,
          //         providerName,
          //         itemName,
          //         eanNum
          //       );
          //       rejectedItems.push({ id: item.id, error: key });
          //     }
          //   }
          //   if (!item.quantity?.available?.count) {
          //     const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/available/count`;
          //     addRejectionError(
          //       onSearchRejectionErrorObj,
          //       "ITEM-ERROR",
          //       key,
          //       "91018",
          //       "Available quantity for the SKU is either absent or invalid",
          //       provider_data?.id,
          //       item?.id,
          //       providerName,
          //       itemName,
          //       eanNum
          //     );
          //     rejectedItems.push({ id: item.id, error: key });
          //   }
          //   if (
          //     item.quantity &&
          //     item.quantity.maximum &&
          //     typeof item.quantity.maximum.count === "string"
          //   ) {
          //     const maxCount = parseInt(item?.quantity?.maximum?.count);
          //     const availCount = parseInt(item?.quantity?.available?.count);
          //     if (availCount == 99 && maxCount == 0) {
          //       const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/quantity/maximum/count`;
          //       addRejectionError(
          //         onSearchRejectionErrorObj,
          //         "ITEM-ERROR",
          //         key,
          //         "20000",
          //         `item.quantity.maximum.count cant be 0 if item is in stock`,
          //         provider_data?.id,
          //         item?.id,
          //         providerName,
          //         itemName,
          //         eanNum
          //       );
          //       rejectedItems.push({ id: item.id, error: key });
          //     }
          //   }
          //   if (!isNaN(item?.price?.value)) {
          //     // if (item?.price?.value && parseFloat(item?.price?.value) < 0) {
          //     //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/price/value`;
          //     //   addRejectionError(
          //     //     onSearchRejectionErrorObj,
          //     //     "ITEM-ERROR",
          //     //     key,
          //     //     "91010",
          //     //     "Price less than zero",
          //     //     provider_data?.id,
          //     //     item?.id,
          //     //     providerName,
          //     //     itemName,
          //     //     eanNum
          //     //   );
          //     //   rejectedItems.push({ id: item.id, error: key });
          //     // }
          //     // if (!item?.price?.maximum_value) {
          //     //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/price/maximum_value`;
          //     //   addRejectionError(
          //     //     onSearchRejectionErrorObj,
          //     //     "ITEM-ERROR",
          //     //     key,
          //     //     "20000",
          //     //     "maximum_value is missing",
          //     //     provider_data?.id,
          //     //     item?.id,
          //     //     providerName,
          //     //     itemName,
          //     //     eanNum
          //     //   );
          //     //   rejectedItems.push({ id: item.id, error: key });
          //     // }
          //   } else {
          //     // if (!item?.price?.value) {
          //     //   const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/price`;
          //     //   addRejectionError(
          //     //     onSearchRejectionErrorObj,
          //     //     "ITEM-ERROR",
          //     //     key,
          //     //     "91001",
          //     //     "Price is Zero or missing",
          //     //     provider_data?.id,
          //     //     item?.id,
          //     //     providerName,
          //     //     itemName,
          //     //     eanNum
          //     //   );
          //     //   rejectedItems.push({ id: item.id, error: key });
          //     // }
          //   }

          //   if ("price" in item) {
          //     const sPrice = parseFloat(item.price.value);
          //     const maxPrice = parseFloat(item.price.maximum_value);
          //     if (sPrice > maxPrice) {
          //       const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/price/value`;
          //       addRejectionError(
          //         onSearchRejectionErrorObj,
          //         "ITEM-ERROR",
          //         key,
          //         "91001",
          //         `selling price of item /price/value with id: (${item.id}) can't be greater than the maximum price /price/maximum_value in /bpp/providers[${i}]/items[${t}]/`,
          //         provider_data?.id,
          //         item?.id,
          //         providerName,
          //         itemName,
          //         eanNum
          //       );
          //       rejectedItems.push({ id: item.id, error: key });
          //     }
          //   }

          //   if (item?.id) {
          //     // console.log(item.id,'item.id')
          //     let storeData = provider_data?.descriptor || {};
          //     if (storeData && provider_data?.locations?.[0]?.id) {
          //       storeData.locationId = provider_data?.locations?.[0]?.id;
          //     }
          //     const sPrice = parseFloat(item.price.value);
          //     const maxPrice = parseFloat(item.price.maximum_value);
          //     const percent = ((maxPrice - sPrice) / maxPrice).toFixed(2);
          //     const discount = parseFloat(percent);
          //     if (discount > maxdiscount && !rejectedItems?.length) {
          //       maxdiscount = discount;
          //     }
          //     const shipTime = isoDurationToMinutes(
          //       providerData?.items?.[0]?.["@ondc/org/time_to_ship"]
          //     );
          //     if (shipTime < minTimeToShip) {
          //       minTimeToShip = shipTime;
          //     }
          //     console.log(
          //       "============== REJECTED ITEMS",
          //       t,
          //       item.id,
          //       rejectedItems,
          //       rejectedProviders,
          //       onSearchErrorObj?.error              );
          //   }
          //   if (
          //     items[t]?.tags.find((tt) => tt.code === "type")?.list[0]?.value ==
          //       "item" &&
          //     items[t]?.category_ids &&
          //     onSearchErrorObj?.error &&
          //     !Object.keys(onSearchErrorObj.error).length
          //   ) {
          //     const menuData = await getCustomMenuRecord(
          //       items[t].category_ids[0]?.split(":")[0],
          //       savedFnBSeller._id
          //     );
          //     const isCustom =
          //       items[t]["tags"]?.findIndex(
          //         (tt) => tt.code === "custom_group"
          //       ) !== -1 &&
          //       items[t]["tags"]?.find((tt) => tt.code === "custom_group")
          //         ?.list[0]?.value !== ""
          //         ? true
          //         : false;
          //     const timeToShip = await isoDurationToMinutes(
          //       providerData?.items?.[0]?.["@ondc/org/time_to_ship"]
          //     );
          //     let obj = {}
          //     try{
          //       obj = {
          //         providerId: savedFnBSeller._id,
          //         isCancellable: items[t]["@ondc/org/cancellable"],
          //         isReturnable: items[t]["@ondc/org/returnable"],
          //         related: false,
          //         sellerPickupReturn: items[t]["@ondc/org/seller_pickup_return"],
          //         subCategoryId: menuData?.menuName,
          //         packagedFood: true,
          //         context: req.body.context,
          //         store:
          //           req.body.message.catalog["bpp/providers"][i]["descriptor"],
          //         bppDescriptor: req.body.message.catalog["bpp/descriptor"],
          //         productName: items[t]["descriptor"].name,
          //         description: items[t]["descriptor"].long_desc,
          //         productId: items[t].id,
          //         time: items[t]["time"],
          //         productImages: items[t]["descriptor"].images,
          //         symbol: items[t]["descriptor"].symbol,
          //         weight: items[t]["quantity"]["unitized"]?.["measure"]?.value,
          //         weightUnit: items[t]["quantity"]["unitized"]?.["measure"].unit,
          //         availableQuantity: items[t]["quantity"]["available"].count,
          //         maximumQuantity: items[t]["quantity"]["maximum"].count,
          //         price: items[t]["price"].value,
          //         maximumPrice: items[t]["price"].maximum_value,
          //         currency: items[t]["price"].currency,
          //         location_id: items[t]["location_id"],
          //         categoryId: items[t]["category_id"],
          //         raw: items[t],
          //         status:
          //           rejectedCustomGroupItems?.findIndex(
          //             (r) => r.id === items[t].id
          //           ) == -1 && !rejectedItems?.length
          //             ? "active"
          //             : "inactive",
          //         foodType: items[t]?.tags?.find((tt) => tt.code === "veg_nonveg")
          //           .list[0]?.code,
          //         parentCatalogId: "",
          //         returnWindowTime: items[t]["@ondc/org/return_window"],
          //         timeToShip: timeToShip,
          //         contact_details_consumer_care:
          //           items[t]["@ondc/org/contact_details_consumer_care"],
          //         fulfillment_id: items[t]["fulfillment_id"],
          //         category: menuData?.menuName,
          //         menuId: menuData?._id,
          //         categoryTag: menuData?.categoryTag,
          //         isCustom: isCustom,
          //         // customGroupId: ,
          //         // childCustomGroupId: [{ type: mongoose.Schema.Types.ObjectId, ref: "fnb-custom-group" }]
          //       };
          //     }catch(error){

          //       console.log(error,'error')
          //     }
          //     if (items[t]?.rating) {
          //       let averageRating;
          //       let totalRatings;
          //       let existingItem = await itemRatings.findOne({ itemId: items[t]?.id });

          //       if (existingItem) {
          //         existingItem.totalRating += Number(items[t]?.rating);
          //         existingItem.ratingCount += 1;
          //         averageRating = existingItem.totalRating / existingItem.ratingCount;
          //         existingItem.averageRating = averageRating;
          //         totalRatings = existingItem.totalRating

          //         await existingItem.save();

          //       } else {
          //         averageRating = Number(items[t]?.rating);
          //         totalRatings = averageRating;
          //         let newItemRating = new itemRatings({
          //           itemId: items[t]?.id,
          //           totalRating: averageRating,
          //           ratingCount: 1,
          //           averageRating: averageRating,
          //         });

          //         await newItemRating.save();

          //       }

          //       await FnBCatalogues.updateOne(
          //         { productId: items[t]?.id }, { $set: { averageRatings: averageRating, totalRatings: totalRatings } });
          //     }
          //     if (isCustom) {
          //       const customGroupGeneratedId = items[t]["tags"]?.find(
          //         (tt) => tt.code === "custom_group"
          //       )?.list[0]?.value;
          //       obj["customGroupId"] = await getCustomGroupId(
          //         customGroupGeneratedId,
          //         savedFnBSeller._id
          //       );
          //     }

          //     let saveFnBCatalogues = await FnBCatalogues.findOneAndUpdate(
          //       { providerId: savedFnBSeller._id, productId: items[t].id },
          //       {
          //         $set: obj,
          //       },
          //       { upsert: true, new: true }
          //     );

          //     const isCustomMenuExits = await FnBCustomMenu.findOne({
          //       _id: menuData?._id,
          //       itemIds: { $in: [saveFnBCatalogues._id] },
          //     });
          //     // console.log(
          //     //   isCustomMenuExits,
          //     //   "isCustomMenuExits",
          //     //   saveFnBCatalogues._id
          //     // );
          //     if (!isCustomMenuExits) {
          //       // console.log(
          //       //   "*****customMenu created successfylly for items***",saveFnBCatalogues._id, "menu Id", menuData?._id
          //       // );
          //       await FnBCustomMenu.findOneAndUpdate(
          //         { _id: menuData?._id }, // Filter to find the document by its _id
          //         { $push: { itemIds: saveFnBCatalogues._id } },
          //         { new: true } // Update operation to push data._id into the itemIds array
          //       );
          //     }
          //   } else if (
          //     items[t]?.tags.find((tt) => tt.code === "type")?.list[0]?.value ==
          //       "customization" &&
          //     onSearchErrorObj?.error &&
          //     !Object.keys(onSearchErrorObj.error).length
          //   ) {
          //     const parentTagList = items[t]?.tags.find(
          //       (tt) => tt.code === "parent"
          //     ).list;
          //     const childTagList =
          //       items[t]?.tags.find((tt) => tt.code === "child")?.list ?? [];
          //       let obj = {}
          //     try{

          //       obj = {
          //         providerId: savedFnBSeller._id,
          //         isCancellable: false,
          //         isReturnable: false,
          //         related: true,
          //         sellerPickupReturn: false,
          //         subCategoryId: "",
          //         packagedFood: true,
          //         context: req.body.context,
          //         store:
          //           req.body.message.catalog["bpp/providers"][i]["descriptor"],
          //         bppDescriptor: req.body.message.catalog["bpp/descriptor"],
          //         productName: items[t]["descriptor"].name,
          //         description: items[t]["descriptor"].long_desc ?? "",
          //         productId: items[t].id,
          //         time: "",
          //         productImages: [],
          //         symbol: "",
          //         weight: items[t]["quantity"]["unitized"]?.["measure"]?.value,
          //         weightUnit: items[t]["quantity"]["unitized"]?.["measure"].unit,
          //         availableQuantity: items[t]["quantity"]["available"].count,
          //         maximumQuantity: items[t]["quantity"]["maximum"].count,
          //         price: items[t]["price"].value,
          //         maximumPrice: items[t]["price"].maximum_value,
          //         currency: items[t]["price"].currency,
          //         location_id: items[t]["location_id"],
          //         categoryId: items[t]["category_id"],
          //         raw: items[t],
          //         foodType: items[t]?.tags?.find((tt) => tt.code === "veg_nonveg")
          //           .list[0]?.code === "non-veg" || items[t]?.tags?.find((tt) => tt.code === "veg_nonveg")
          //           .list[0]?.code === "non_veg" ? "non-veg": "veg",
          //         parentCatalogId: "",
          //         returnWindowTime: "",
          //         status:
          //           rejectedCustomGroupItems?.findIndex(
          //             (r) => r.id === items[t].id
          //           ) == -1 && !rejectedItems?.length
          //             ? "active"
          //             : "inactive",
          //         timeToShip: 0,
          //         contact_details_consumer_care:
          //           items[t]["@ondc/org/contact_details_consumer_care"],
          //         fulfillment_id: items[t]["fulfillment_id"],
          //         category: "",
          //         isCustom: false,
          //         isDefaultItem:
          //           parentTagList?.find((tt) => tt.code === "default")?.value ===
          //           "yes"
          //             ? true
          //             : false,
          //         // customGroupId: "",
          //         // childCustomGroupId: [{ type: mongoose.Schema.Types.ObjectId, ref: "fnb-custom-group" }]
          //       };
          //     }catch(error){
          //       console.log(error,'errror')
          //     }
          //     let generatedId = parentTagList?.find(
          //       (tt) => tt.code === "id"
          //     )?.value;

          //     const customId = await getCustomGroupId(
          //       generatedId,
          //       savedFnBSeller._id
          //     );
          //     if (generatedId) {
          //       obj["customGroupId"] = customId;
          //     }
          //     let childCustomGroupIds = [];
          //     if (childTagList?.length) {
          //       childCustomGroupIds = await getCustomGroupIds(
          //         childTagList,
          //         savedFnBSeller._id
          //       );
          //       // console.log(childCustomGroupIds,'childCustomGroupIds')

          //       obj["childCustomGroupId"] = childCustomGroupIds;
          //     }
          //     const data = await FnBCustomGroupItems.findOneAndUpdate(
          //       { providerId: savedFnBSeller._id, productId: items[t].id },
          //       { $set: obj },
          //       { upsert: true, new: true }
          //     );
          //     // for(let t=0;t<childCustomGroupIds?.length;t++){
          //     //   await FnBCustomGroup.findOneAndUpdate(
          //     //     { _id: childCustomGroupIds[t] }, // Find by _id
          //     //     { $addToSet: { itemIds: data._id } }, // Prevents duplicates
          //     //     {new: true} // Update operation to push data._id into the itemIds array

          //     //   );
          //     // }

          //     // await FnBCustomGroup.findOneAndUpdate(
          //     //   { _id: customId }, // Filter to find the document by its _id
          //     //   { $addToSet: { itemIds: data._id } }, // Update operation to push data._id into the itemIds array
          //     //   { new: true } // Update operation to push data._id into the itemIds array
          //     // );

          //     const isCustomGroupExits = await FnBCustomGroup.findOne({
          //       _id: customId,
          //       itemIds: { $in: [data._id] },
          //     });
          //     if (!isCustomGroupExits) {
          //       await FnBCustomGroup.findOneAndUpdate(
          //         { _id: customId }, // Filter to find the document by its _id
          //         { $push: { itemIds: data._id } },
          //         { new: true } // Update operation to push data._id into the itemIds array
          //       );
          //     }
          //   } else if (
          //     items[t]?.category_ids &&
          //     onSearchErrorObj?.error &&
          //     !Object.keys(onSearchErrorObj.error).length
          //   ) {
          //     const menuData = await getCustomMenuRecord(
          //       items[t].category_ids[0]?.split(":")[0],
          //       savedFnBSeller._id
          //     );
          //     const timeToShip = await isoDurationToMinutes(
          //       providerData?.items?.[0]?.["@ondc/org/time_to_ship"]
          //     );
          //     const obj = {
          //       providerId: savedFnBSeller._id,
          //       isCancellable: items[t]["@ondc/org/cancellable"],
          //       isReturnable: items[t]["@ondc/org/returnable"],
          //       related: false,
          //       sellerPickupReturn: items[t]["@ondc/org/seller_pickup_return"],
          //       subCategoryId: menuData?.menuName,
          //       packagedFood: true,
          //       context: req.body.context,
          //       store:
          //         req.body.message.catalog["bpp/providers"][i]["descriptor"],
          //       bppDescriptor: req.body.message.catalog["bpp/descriptor"],
          //       productName: items[t]["descriptor"].name,
          //       description: items[t]["descriptor"].long_desc,
          //       productId: items[t].id,
          //       time: items[t]["time"],
          //       productImages: items[t]["descriptor"].images,
          //       symbol: items[t]["descriptor"].symbol,
          //       weight: items[t]["quantity"]["unitized"]["measure"].value,
          //       weightUnit: items[t]["quantity"]["unitized"]["measure"].unit,
          //       availableQuantity: items[t]["quantity"]["available"].count,
          //       maximumQuantity: items[t]["quantity"]["maximum"].count,
          //       price: items[t]["price"].value,
          //       maximumPrice: items[t]["price"].maximum_value,
          //       currency: items[t]["price"].currency,
          //       location_id: items[t]["location_id"],
          //       categoryId: items[t]["category_id"],
          //       raw: items[t],
          //       status:
          //         rejectedCustomGroupItems?.findIndex(
          //           (r) => r.id === items[t].id
          //         ) == -1 && !rejectedItems?.length
          //           ? "active"
          //           : "inactive",
          //       foodType: items[t]?.tags?.find((tt) => tt.code === "veg_nonveg")
          //         .list[0]?.code,
          //       parentCatalogId: "",
          //       returnWindowTime: items[t]["@ondc/org/return_window"],
          //       timeToShip: timeToShip,
          //       contact_details_consumer_care:
          //         items[t]["@ondc/org/contact_details_consumer_care"],
          //       fulfillment_id: items[t]["fulfillment_id"],
          //       category: menuData?.menuName,
          //       menuId: menuData?._id,
          //       categoryTag: menuData?.categoryTag,
          //       isCustom: false,
          //     };
          //     let saveFnBCatalogues = await FnBCatalogues.findOneAndUpdate(
          //       { providerId: savedFnBSeller._id, productId: items[t].id },
          //       {
          //         $set: obj,
          //       },
          //       { upsert: true, new: true }
          //     );
          //     if (items[t]?.rating) {
          //       let averageRating;
          //       let totalRatings;
          //       let existingItem = await itemRatings.findOne({ itemId: items[t]?.id });

          //       if (existingItem) {
          //         existingItem.totalRating += Number(items[t]?.rating);
          //         existingItem.ratingCount += 1;
          //         averageRating = existingItem.totalRating / existingItem.ratingCount;
          //         existingItem.averageRating = averageRating;
          //         totalRatings = existingItem.totalRating

          //         await existingItem.save();

          //       } else {
          //         averageRating = Number(items[t]?.rating);
          //         totalRatings = averageRating;
          //         let newItemRating = new itemRatings({
          //           itemId: items[t]?.id,
          //           totalRating: averageRating,
          //           ratingCount: 1,
          //           averageRating: averageRating,
          //         });

          //         await newItemRating.save();

          //       }

          //       await FnBCatalogues.updateOne(
          //         { productId: items[t]?.id }, { $set: { averageRatings: averageRating, totalRatings: totalRatings } });
          //     }
          //     // console.log(
          //     //   "*****FnBCatalogues created successfylly for items***"
          //     // );
          //     // await FnBCustomMenu.findOneAndUpdate(
          //     //   { _id: menuData?._id }, // Filter to find the document by its _id
          //     //   { $addToSet: { itemIds: saveFnBCatalogues._id } }, // Update operation to push data._id into the itemIds array
          //     //   { new: true } // Update operation to push data._id into the itemIds array
          //     // );
          //     const isCustomMenuExits = await FnBCustomMenu.findOne({
          //       _id: menuData?._id,
          //       itemIds: { $in: [saveFnBCatalogues._id] },
          //     });
          //     console.log(
          //       isCustomMenuExits,
          //       "isCustomMenuExits",
          //       saveFnBCatalogues._id
          //     );
          //     if (!isCustomMenuExits) {
          //       // console.log(
          //       //   "*****customMenu created successfylly for items***",saveFnBCatalogues._id, "menu Id", menuData?._id
          //       // );
          //       await FnBCustomMenu.findOneAndUpdate(
          //         { _id: menuData?._id }, // Filter to find the document by its _id
          //         { $push: { itemIds: saveFnBCatalogues._id } },
          //         { new: true } // Update operation to push data._id into the itemIds array
          //       );
          //     }
          //   }
          //   rejectedItems = [];
          //   t++;
          // }

          try {
            let promises = []
            while (t < iLen) {
              try {
                console.log(t, "tt");
                let rejectedItems = [];
                const item = items[t];
                const itemTimeStamp = item?.time?.timestamp;
                const eanCodes = item?.descriptor?.code?.split(":");
                const eanNum = eanCodes?.[1] ?? "";
                const itemName = item?.descriptor?.name ?? "";
                const op = areTimestampsLessThanOrEqualTo(
                  itemTimeStamp,
                  tmpstmp
                );

                // Validation checks
                if (!item.id) {
                  const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[${t}]`;
                  addRejectionError(
                    onSearchRejectionErrorObj,
                    "ITEM-ERROR",
                    key,
                    "20000",
                    `item id is missing`,
                    provider_data?.id,
                    "NA",
                    providerName,
                    itemName,
                    eanNum
                  );
                  rejectedItems.push({ id: "NA", error: key });
                }

                if (
                  !["enable", "disable"].includes(item?.time?.label) &&
                  item?.tags?.find((it) => it?.code === "type")?.list[0]
                    ?.value !== "customization"
                ) {
                  const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/time`;
                  addRejectionError(
                    onSearchRejectionErrorObj,
                    "ITEM-ERROR",
                    key,
                    "20000",
                    `time.label should be valid either "enable" or "disable"`,
                    provider_data?.id,
                    item?.id,
                    providerName,
                    itemName,
                    eanNum
                  );
                  rejectedItems.push({ id: provider_data.id, error: key });
                }

                // ... (continue with all other validation checks)

                itemsId.add(item.id);

                // Price validation
                if ("price" in item) {
                  const sPrice = parseFloat(item.price.value);
                  const maxPrice = parseFloat(item.price.maximum_value);
                  if (sPrice > maxPrice) {
                    const key = `message.catalog.bpp/providers[?(@.id=='${provider_data?.id}')].items[?(@.id=='${item.id}')]/price/value`;
                    addRejectionError(
                      onSearchRejectionErrorObj,
                      "ITEM-ERROR",
                      key,
                      "91001",
                      `selling price of item /price/value with id: (${item.id}) can't be greater than the maximum price /price/maximum_value in /bpp/providers[${i}]/items[${t}]/`,
                      provider_data?.id,
                      item?.id,
                      providerName,
                      itemName,
                      eanNum
                    );
                    rejectedItems.push({ id: item.id, error: key });
                  }
                }

                if (item?.id) {
                  let storeData = provider_data?.descriptor || {};
                  if (storeData && provider_data?.locations?.[0]?.id) {
                    storeData.locationId = provider_data?.locations?.[0]?.id;
                  }
                  const sPrice = parseFloat(item.price.value);
                  const maxPrice = parseFloat(item.price.maximum_value);
                  const percent = ((maxPrice - sPrice) / maxPrice).toFixed(2);
                  const discount = parseFloat(percent);
                  if (discount > maxdiscount && !rejectedItems?.length) {
                    maxdiscount = discount;
                  }
                  const shipTime = isoDurationToMinutes(
                    providerData?.items?.[0]?.["@ondc/org/time_to_ship"]
                  );
                  if (shipTime < minTimeToShip) {
                    minTimeToShip = shipTime;
                  }
                }

                // Process items based on type
                if (
                  items[t]?.tags.find((tt) => tt.code === "type")?.list[0]
                    ?.value === "item" &&
                  items[t]?.category_ids 
                  // &&
                  // onSearchErrorObj?.error &&
                  // !Object.keys(onSearchErrorObj.error).length
                ) {
                  try {
                    promises.push(
                    processItem(items[t], rejectedItems, t))
                  } catch (error) {
                    console.log(error, "error,11111");
                  }
                } else if (
                  items[t]?.tags.find((tt) => tt.code === "type")?.list[0]
                    ?.value === "customization" 
                  //   &&
                  // onSearchErrorObj?.error &&
                  // !Object.keys(onSearchErrorObj.error).length
                ) {
                  try {
                    promises.push(
                    processCustomizationItem(items[t], rejectedItems, t))
                  } catch (error) {
                    console.log(error, "error,11111");
                  }
                } else if (
                  items[t]?.category_ids 
                  // &&
                  // onSearchErrorObj?.error &&
                  // !Object.keys(onSearchErrorObj.error).length
                ) {
                  try {
                    promises.push(
                    processCategoryItem(items[t], rejectedItems, t))
                  } catch (error) {
                    console.log(error, "error,11111");
                  }
                }

                rejectedItems = [];
                t++;
              } catch (error) {
                console.error(`Error processing item at index ${t}:`, error);
                t++; // Ensure we continue to next item even if one fails
              }
            }
            console.log('enter----->>> promises')
            await Promise.all(promises)
            // Helper functions for processing different item types
            async function processItem(item, rejectedItems, index) {
              const menuData = await getCustomMenuRecord(
                item.category_ids[0]?.split(":")[0],
                savedFnBSeller._id
              );
              const isCustom =
                item["tags"]?.findIndex((tt) => tt.code === "custom_group") !==
                  -1 &&
                item["tags"]?.find((tt) => tt.code === "custom_group")?.list[0]
                  ?.value !== ""
                  ? true
                  : false;
              const timeToShip = await isoDurationToMinutes(
                providerData?.items?.[0]?.["@ondc/org/time_to_ship"]
              );

              const obj = {
                providerId: savedFnBSeller._id,
                isCancellable: item["@ondc/org/cancellable"],
                isReturnable: item["@ondc/org/returnable"],
                related: false,
                sellerPickupReturn: item["@ondc/org/seller_pickup_return"],
                subCategoryId: menuData?.menuName,
                packagedFood: true,
                context: req.body.context,
                store:
                  req.body.message.catalog["bpp/providers"][i]["descriptor"],
                bppDescriptor: req.body.message.catalog["bpp/descriptor"],
                productName: item["descriptor"].name,
                description: item["descriptor"].long_desc,
                productId: item.id,
                time: item["time"],
                productImages: item["descriptor"].images,
                symbol: item["descriptor"].symbol,
                weight: item["quantity"]["unitized"]?.["measure"]?.value,
                weightUnit: item["quantity"]["unitized"]?.["measure"].unit,
                availableQuantity: item["quantity"]["available"].count,
                maximumQuantity: item["quantity"]["maximum"].count,
                price: item["price"].value,
                maximumPrice: item["price"].maximum_value,
                currency: item["price"].currency,
                location_id: item["location_id"],
                categoryId: item["category_id"],
                raw: item,
                status:
                  rejectedCustomGroupItems?.findIndex(
                    (r) => r.id === item.id
                  ) == -1 && !rejectedItems?.length
                    ? "active"
                    : "inactive",
                foodType: item?.tags?.find((tt) => tt.code === "veg_nonveg")
                  .list[0]?.code,
                parentCatalogId: "",
                returnWindowTime: item["@ondc/org/return_window"],
                timeToShip: timeToShip,
                contact_details_consumer_care:
                  item["@ondc/org/contact_details_consumer_care"],
                fulfillment_id: item["fulfillment_id"],
                category: menuData?.menuName,
                menuId: menuData?._id,
                categoryTag: menuData?.categoryTag,
                isCustom: isCustom,
              };

              if (item?.rating) {
                await updateItemRating(item);
              }

              if (isCustom) {
                const customGroupGeneratedId = item["tags"]?.find(
                  (tt) => tt.code === "custom_group"
                )?.list[0]?.value;
                obj["customGroupId"] = await getCustomGroupId(
                  customGroupGeneratedId,
                  savedFnBSeller._id
                );
              }

              const saveFnBCatalogues = await FnBCatalogues.findOneAndUpdate(
                { providerId: savedFnBSeller._id, productId: item.id },
                { $set: obj },
                { upsert: true, new: true }
              );

              if (
                !(await FnBCustomMenu.findOne({
                  _id: menuData?._id,
                  itemIds: { $in: [saveFnBCatalogues._id] },
                }))
              ) {
                await FnBCustomMenu.findOneAndUpdate(
                  { _id: menuData?._id },
                  { $push: { itemIds: saveFnBCatalogues._id } },
                  { new: true }
                );
              }
            }

            async function processCustomizationItem(
              item,
              rejectedItems,
              index
            ) {
              const parentTagList = item?.tags.find(
                (tt) => tt.code === "parent"
              ).list;
              const childTagList =
                item?.tags.find((tt) => tt.code === "child")?.list ?? [];

              const obj = {
                providerId: savedFnBSeller._id,
                isCancellable: false,
                isReturnable: false,
                related: true,
                sellerPickupReturn: false,
                subCategoryId: "",
                packagedFood: true,
                context: req.body.context,
                store:
                  req.body.message.catalog["bpp/providers"][i]["descriptor"],
                bppDescriptor: req.body.message.catalog["bpp/descriptor"],
                productName: item["descriptor"].name,
                description: item["descriptor"].long_desc ?? "",
                productId: item.id,
                time: "",
                productImages: [],
                symbol: "",
                weight: item["quantity"]["unitized"]?.["measure"]?.value,
                weightUnit: item["quantity"]["unitized"]?.["measure"].unit,
                availableQuantity: item["quantity"]["available"].count,
                maximumQuantity: item["quantity"]["maximum"].count,
                price: item["price"].value,
                maximumPrice: item["price"].maximum_value,
                currency: item["price"].currency,
                location_id: item["location_id"],
                categoryId: item["category_id"],
                raw: item,
                foodType:
                  item?.tags?.find((tt) => tt.code === "veg_nonveg").list[0]
                    ?.code === "non-veg" ||
                  item?.tags?.find((tt) => tt.code === "veg_nonveg").list[0]
                    ?.code === "non_veg"
                    ? "non-veg"
                    : "veg",
                parentCatalogId: "",
                returnWindowTime: "",
                status:
                  rejectedCustomGroupItems?.findIndex(
                    (r) => r.id === item.id
                  ) == -1 && !rejectedItems?.length
                    ? "active"
                    : "inactive",
                timeToShip: 0,
                contact_details_consumer_care:
                  item["@ondc/org/contact_details_consumer_care"],
                fulfillment_id: item["fulfillment_id"],
                category: "",
                isCustom: false,
                isDefaultItem:
                  parentTagList?.find((tt) => tt.code === "default")?.value ===
                  "yes",
              };

              let generatedId = parentTagList?.find(
                (tt) => tt.code === "id"
              )?.value;
              const customId = await getCustomGroupId(
                generatedId,
                savedFnBSeller._id
              );
              if (generatedId) {
                obj["customGroupId"] = customId;
              }

              let childCustomGroupIds = [];
              if (childTagList?.length) {
                childCustomGroupIds = await getCustomGroupIds(
                  childTagList,
                  savedFnBSeller._id
                );
                obj["childCustomGroupId"] = childCustomGroupIds;
              }

              const data = await FnBCustomGroupItems.findOneAndUpdate(
                { providerId: savedFnBSeller._id, productId: item.id },
                { $set: obj },
                { upsert: true, new: true }
              );

              if (
                !(await FnBCustomGroup.findOne({
                  _id: customId,
                  itemIds: { $in: [data._id] },
                }))
              ) {
                await FnBCustomGroup.findOneAndUpdate(
                  { _id: customId },
                  { $push: { itemIds: data._id } },
                  { new: true }
                );
              }
            }

            async function processCategoryItem(item, rejectedItems, index) {
              const menuData = await getCustomMenuRecord(
                item.category_ids[0]?.split(":")[0],
                savedFnBSeller._id
              );
              const timeToShip = await isoDurationToMinutes(
                providerData?.items?.[0]?.["@ondc/org/time_to_ship"]
              );

              const obj = {
                providerId: savedFnBSeller._id,
                isCancellable: item["@ondc/org/cancellable"],
                isReturnable: item["@ondc/org/returnable"],
                related: false,
                sellerPickupReturn: item["@ondc/org/seller_pickup_return"],
                subCategoryId: menuData?.menuName,
                packagedFood: true,
                context: req.body.context,
                store:
                  req.body.message.catalog["bpp/providers"][i]["descriptor"],
                bppDescriptor: req.body.message.catalog["bpp/descriptor"],
                productName: item["descriptor"].name,
                description: item["descriptor"].long_desc,
                productId: item.id,
                time: item["time"],
                productImages: item["descriptor"].images,
                symbol: item["descriptor"].symbol,
                weight: item["quantity"]["unitized"]["measure"].value,
                weightUnit: item["quantity"]["unitized"]["measure"].unit,
                availableQuantity: item["quantity"]["available"].count,
                maximumQuantity: item["quantity"]["maximum"].count,
                price: item["price"].value,
                maximumPrice: item["price"].maximum_value,
                currency: item["price"].currency,
                location_id: item["location_id"],
                categoryId: item["category_id"],
                raw: item,
                status:
                  rejectedCustomGroupItems?.findIndex(
                    (r) => r.id === item.id
                  ) == -1 && !rejectedItems?.length
                    ? "active"
                    : "inactive",
                foodType: item?.tags?.find((tt) => tt.code === "veg_nonveg")
                  .list[0]?.code,
                parentCatalogId: "",
                returnWindowTime: item["@ondc/org/return_window"],
                timeToShip: timeToShip,
                contact_details_consumer_care:
                  item["@ondc/org/contact_details_consumer_care"],
                fulfillment_id: item["fulfillment_id"],
                category: menuData?.menuName,
                menuId: menuData?._id,
                categoryTag: menuData?.categoryTag,
                isCustom: false,
              };

              if (item?.rating) {
                await updateItemRating(item);
              }

              const saveFnBCatalogues = await FnBCatalogues.findOneAndUpdate(
                { providerId: savedFnBSeller._id, productId: item.id },
                { $set: obj },
                { upsert: true, new: true }
              );

              if (
                !(await FnBCustomMenu.findOne({
                  _id: menuData?._id,
                  itemIds: { $in: [saveFnBCatalogues._id] },
                }))
              ) {
                await FnBCustomMenu.findOneAndUpdate(
                  { _id: menuData?._id },
                  { $push: { itemIds: saveFnBCatalogues._id } },
                  { new: true }
                );
              }
            }

            async function updateItemRating(item) {
              let averageRating;
              let totalRatings;
              let existingItem = await itemRatings.findOne({
                itemId: item?.id,
              });

              if (existingItem) {
                existingItem.totalRating += Number(item?.rating);
                existingItem.ratingCount += 1;
                averageRating =
                  existingItem.totalRating / existingItem.ratingCount;
                existingItem.averageRating = averageRating;
                totalRatings = existingItem.totalRating;
                await existingItem.save();
              } else {
                averageRating = Number(item?.rating);
                totalRatings = averageRating;
                let newItemRating = new itemRatings({
                  itemId: item?.id,
                  totalRating: averageRating,
                  ratingCount: 1,
                  averageRating: averageRating,
                });
                await newItemRating.save();
              }

              await FnBCatalogues.updateOne(
                { productId: item?.id },
                {
                  $set: {
                    averageRatings: averageRating,
                    totalRatings: totalRatings,
                  },
                }
              );
            }
          } catch (error) {
            console.log(error, "errrooooooooooooooo");
          }
        }

        if (
          onSearchErrorObj?.error &&
          !Object.keys(onSearchErrorObj.error).length
        ) {
          // const sellerSNPData = await BuyerSellerOnBoard.findOne({
          //   sellerNPName: body?.context?.bpp_id,
          // });
          const order_value_tags = provider_data?.tags?.find(
            (item) => item.code == "order_value"
          );
          const order_value_tags_list = order_value_tags?.list;
          const minimum_order_obj = order_value_tags_list?.find(
            (item) => item.code == "min_value"
          );
          const minimum_order_value = minimum_order_obj?.value;
          const updateFields = {};
          // console.log("============== provider update sellerSNPData", sellerSNPData)
          if (provider_data?.descriptor?.name) {
            updateFields.name = provider_data.descriptor.name;
          }
          if (provider_data?.descriptor?.long_desc) {
            updateFields.description = provider_data.descriptor.long_desc;
          }
          if (provider_data?.descriptor?.symbol) {
            updateFields.photo = provider_data.descriptor.symbol;
          }
          if (
            body?.context &&
            Object.keys(body?.context).length > 0 &&
            !isIncrementalSearch
          ) {
            updateFields.context = body.context;
          }
          if (!isIncrementalSearch) {
            const offPercentage = Math.floor(maxdiscount * 100);
            updateFields.maxDiscountPercentage = offPercentage;
            // updateFields.storeTagline = offPercentage ? `Get Upto ${offPercentage}% Off!` : "";
            updateFields.timeToShip = minTimeToShip;
            updateFields.providerOnSearchStatus = !rejectedProviders?.length
              ? "ACK"
              : "NACK";
            updateFields.isBlock = false;
            // !rejectedProviders?.length ? false : true;
            updateFields.snpBlocked = false;
            //  sellerSNPData
            //   ? sellerSNPData.snpBlocked
            //   : true;
            updateFields.kikoVisibility = true;
            // sellerSNPData && sellerSNPData.snpBlocked ? false : true;
          }
          if (provider_data?.locations?.length > 0 && !isIncrementalSearch) {
            updateFields.locations = provider_data.locations;
            const location = provider_data.locations[0];
            if (location?.gps) {
              const [latitude, longitude] = location.gps.split(",");
              if (
                latitude &&
                longitude &&
                !isNaN(latitude) &&
                !isNaN(longitude)
              ) {
                updateFields.loc = {
                  type: "Point",
                  coordinates: [parseFloat(longitude), parseFloat(latitude)],
                };
              }
            }
          }
          if (provider_data?.locations?.[0]?.time?.lable) {
            updateFields.storeStatus = provider_data.locations[0].time.lable;
          }
          if (provider_data?.id) {
            updateFields.providerId = provider_data.id;
          }
          if (provider_data?.tags?.length > 0) {
            const serviceabilityItems = provider_data?.tags?.filter(
              (item) => item.code === "serviceability"
            );
            if (serviceabilityItems?.length > 0) {
              const result = serviceabilityItems.map((item) => {
                const category = item?.list?.find(
                  (entry) => entry.code === "category"
                )?.value;
                const type = item?.list?.find(
                  (entry) => entry.code === "type"
                )?.value;
                const radius = item?.list?.find(
                  (entry) => entry.code === "val"
                )?.value;
                const unit = item?.list?.find(
                  (entry) => entry.code === "unit"
                )?.value;
                return { category, type, radius, unit };
              });
              updateFields.serviceabilityRadius = result;
            }
          }
          // if (updatedCategories?.length > 0) {
          //   updateFields.categoryIds = updatedCategories;
          // }
          // if (updatedSubcategories?.length > 0) {
          //   updateFields.subCategoryIds = updatedSubcategories;
          // }
          if (provider_data?.fulfillments?.[i]?.contact) {
            updateFields.contactDetails = provider_data.fulfillments[0].contact;
          }
          if (
            descriptor &&
            typeof descriptor === "object" &&
            Object.keys(descriptor).length > 0
          ) {
            updateFields.bppDescriptor = descriptor;
          }
          if (minimum_order_obj && minimum_order_value) {
            updateFields.minimumOrderValue = parseFloat(minimum_order_value);
          }
          // console.log("============== provider update", updateFields)
          await FnBSellers.updateOne(
            { providerId: provider_data?.id },
            { $set: updateFields },
            { upsert: true, setDefaultsOnInsert: true }
          );

          if (
            provider &&
            provider_data &&
            provider_data.locations &&
            provider_data.locations.length > 0
          ) {
            for (const location of provider_data.locations) {
              // Update existing location or add new location if it doesn't exist
              const updateLocationsFields = {};
              if (location?.time?.label) {
                updateLocationsFields["locations.0.time.label"] =
                  location?.time?.label;
                updateLocationsFields.storeStatus = location?.time?.label;
              }
              if (location?.time?.timestamp) {
                updateLocationsFields["locations.0.time.timestamp"] =
                  location?.time?.timestamp;
              }
              if (location?.time?.range) {
                updateLocationsFields["locations.0.time.range"] =
                  location?.time?.range;
              }
              const result = await FnBSellers.updateOne(
                {
                  providerId: provider_data.id,
                  "locations.id": location.id,
                },
                {
                  $set: updateLocationsFields,
                },
                { upsert: false, setDefaultsOnInsert: true }
              );
              if (result?.nModified === 0) {
                // console.log(
                //   `No match found for providerId ${provider_data.id} and location id ${location.id}`
                // );
                await FnBSellers.updateOne(
                  { providerId: provider_data.id },
                  {
                    $push: {
                      locations: {
                        id: location.id,
                        time: location.time,
                      },
                    },
                  },
                  { upsert: false, setDefaultsOnInsert: true }
                );
              }
            }
          }
          if (provider_data?.time) {
            await FnBSellers.updateOne(
              { providerId: provider_data?.id },
              {
                $set: {
                  providerStatus: provider_data?.time,
                  storeStatus: provider_data?.time?.label,
                },
              },
              { upsert: false, setDefaultsOnInsert: true }
            );
          }
        }
        // console.log(
        //   "==============>>>>>>>>>>onSearchRejectionErrorObj000",
        //   onSearchRejectionErrorObj.rejectionReportError,
        //   provider_data?.id
        // );
        if (onSearchRejectionErrorObj?.rejectionReportError.length > 0) {
          const rejectionReport = {
            context: body.context,
            errors: onSearchRejectionErrorObj?.rejectionReportError,
          };
          await updateOndcOnSearchRejectionData(
            body?.context?.transaction_id,
            "catalog_rejection",
            sellerBppId,
            provider_data?.id ?? "NA",
            rejectionReport,
            isIncrementalSearch
          );
        }
        // console.log(
        //   "==============>>>>>>>>>>onSearchRejectionErrorObj111",
        //   onSearchRejectionErrorObj.rejectionReportError,
        //   provider_data?.id
        // );
        rejectedProviders = [];
        i++;
      }
      if (
        onSearchErrorObj?.error &&
        Object.keys(onSearchErrorObj.error).length > 0
      ) {
        // console.log(
        //   "buyer on_search response NACK ::::::======>",
        //   onSearchErrorObj
        // );
        await createOndcOnSearchRequestRawData(
          body?.context?.transaction_id,
          body?.context?.action,
          sellerBppId,
          body?.context,
          "InActive",
          onSearchErrorObj
        );
        return;
        // return res.send(onSearchErrorObj)
      }
      if (onSearchRejectionErrorObj?.rejectionError.length > 0) {
        const payload = {
          context: body.context,
          errors: onSearchRejectionErrorObj?.rejectionError,
        };
        payload.context.action = "catalog_rejection";
        const kikoUniqueId = "4469eb76-7c60-4c7b-8580-161078b48f3e";
        const authorizationKey = await generateKeyPair(payload, kikoUniqueId);
        const catalog_rejection_url = body?.context?.bpp_uri?.endsWith("/")
          ? body?.context?.bpp_uri.slice(0, -1)
          : body?.context?.bpp_uri;
        try {
          var config = {
            method: "post",
            url: `${catalog_rejection_url}/catalog_rejection`,
            headers: {
              Authorization: authorizationKey,
              "Content-Type": "application/json",
            },
            data: JSON.stringify(payload),
          };
          // console.log(
          //   "buyer catalog_rejection body ::::::======>",
          //   JSON.stringify(payload)
          // );
          const result = await axios(config);
          // console.log(
          //   "buyer catalog_rejection result ::::::======>",
          //   JSON.stringify(result?.data)
          // );
        } catch (error) {
          console.log(
            "buyer on_search catalog_rejection catch error ======>",
            error
          );
        }
      }
    }
    // res.json(payload);
    // return
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const wty = (param) => {
  const { req, res } = param;
  // if(req.body?.context?.bpp_id !== "ondc-api.kiko.live/ondc-seller-v2"){
  if (
    req.body?.context?.bpp_id !== "pramaan.ondc.org/beta/preprod/mock/seller" &&
    req.body?.context?.bpp_id !== "pramaan.ondc.org/alpha/mock-server"
  ) {
    // return;
  } else {
    // console.log("Search request fnb------>>",JSON.stringify(req.body))
    // return;
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      onSearchSerial(req, res, (data) => {
        resolve(data);
      });
    }, 2000); // Simulate some delay if necessary
  });
};

const onSearch = async (req, res) => {
  const data = ["test"];
  const result = await utils.serialQueueAll(
    _.map(data, (r) => {
      return { func: wty, param: { req, res } };
    })
  );
  return result?.length > 0 ? result[0] : result;
};

module.exports = { onSearch };

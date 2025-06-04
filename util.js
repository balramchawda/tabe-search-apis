const { base64_variants } = require("libsodium-wrappers");
const _sodium = require("libsodium-wrappers");
const moment = require("moment");
const BuyerOndcRequest = require("./models/buyerOndcrequests");
const BuyerOndcOnSearchRequest = require("./models/buyerOndcOnSearchRequest");
const BuyerOndcApiRecord = require("./models/buyerOndcApiRecord");
const _ = require("lodash");
const areaPincodes = require('./areaPincode.json');
const buyerOndcOnSearchFullRequest = require("./models/buyerOndcOnSearchFullRequest");
const axios = require('axios');
const BuyerOndcApiError = require("./models/buyerOndcApiError");

const ondcConstants = {
  BUYER_FF: '3',
  RET_CONTEXT_TTL: 'PT30S',
  SEARCH: 'search',
  ON_SEARCH: 'on_search',
  SELECT: 'select',
  ON_SELECT: 'on_select',
  INIT: 'init',
  ON_INIT: 'on_init',
  CONFIRM: 'confirm',
  ON_CONFIRM: 'on_confirm',
  CANCEL: 'cancel',
  ON_CANCEL: 'on_cancel',
  STATUS: 'status',
  ON_STATUS: 'on_status',
  ON_UPDATE: 'on_update',
  UPDATE: 'update',
  DECIMAL_PRECISION: 6,
}


const fnbOndcConstants = {
  BUYER_FF: '5',
  RET_CONTEXT_TTL: 'PT30S',
  SEARCH: 'search',
  ON_SEARCH: 'on_search',
  SELECT: 'select',
  ON_SELECT: 'on_select',
  INIT: 'init',
  ON_INIT: 'on_init',
  CONFIRM: 'confirm',
  ON_CONFIRM: 'on_confirm',
  CANCEL: 'cancel',
  ON_CANCEL: 'on_cancel',
  STATUS: 'status',
  ON_STATUS: 'on_status',
  ON_UPDATE: 'on_update',
  UPDATE: 'update',
  DECIMAL_PRECISION: 6,
}
const DeliveryTypes = [
  ['Immediate Delivery', 'Standard Delivery', 'Express Delivery'],
  ['Takeaway', 'Kerbside'],
]

const quoteBreakupTitleType = {
  'delivery charges': 'delivery',
  'packing charges': 'packing',
  tax: 'tax',
  discount: 'discount',
  'convenience fee': 'misc',
}

const apiFlowConstants = {
  PENDING: 'Pending',
  PACKED: 'Packed',
  ORDER_PICKED_UP: 'Order-picked-up',
  OUT_FOR_DELIVERY: 'Out-for-delivery',
  ORDER_DELIVERED: 'Order-delivered',
  CANCELLED: 'Cancelled',
  ON_UPDATE_PART_CANCEL: 'on_update_part_cancel',
  ON_UPDATE_RETURN_INITIATED: 'on_update_return_initiated',
  RETURN_INITIATED: 'Return_Initiated',
  ON_UPDATE_RETURN_APPROVED: 'on_update_return_approved',
  RETURN_APPROVED: 'Return_Approved',
  ON_UPDATE_RETURN_PICKED: 'on_update_return_picked',
  RETURN_PICKED: 'Return_Picked',
  ON_UPDATE_RETURN_DELIVERED: 'on_update_return_delivered',
  RETURN_DELIVERED: 'Return_Delivered',
  ON_UPDATE_RETURN_LIQUIDATED: 'on_update_return_liquidated',
  RETURN_LIQUIDATED: 'Liquidated',
  RTO_DELIVERED: 'RTO-Delivered',
}
const returnRequestReasonCodes = ['001', '002', '003', '004', '005'];
const partcancelReturnReasonCodes = ['002', '012'];
const returnRejectedRequestReasonCodes = ['001', '002', '003', '004', '005', '007', '008'];
const ROUTING_ENUMS = ['P2P', 'P2H2P']
const reasonCodes = {
  '001': {
    Reason: 'Price of one or more items have changed due to which buyer was asked to make additional payment',
    RTO: 'No',
    USED_BY: 'BNP'
  },
  '002': {
    Reason: 'One or more items in the Order not available',
    RTO: 'No',
    USED_BY: 'SNP'
  },
  '003': {
    Reason: 'Product available at lower than order price',
    RTO: 'Yes',
    USED_BY: 'BNP'
  },
  '005': {
    Reason: 'Merchant rejected the order',
    RTO: 'No',
    USED_BY: 'SNP'
  },
  '006': {
    Reason: 'Order / fulfillment not received as per buyer app TAT SLA',
    RTO: 'Yes',
    USED_BY: 'BNP'
  },
  '007': {
    Reason: 'Order / fulfillment not received as per buyer app TAT SLA',
    RTO: 'Yes',
    USED_BY: 'LBNP',
  },
  '008': {
    Reason: 'Order / fulfillment not ready for pickup',
    RTO: 'No',
    USED_BY: 'LSP'
  },
  '009': {
    Reason: 'Wrong product delivered',
    RTO: 'Yes',
    USED_BY: 'BNP'
  },
  '010': {
    Reason: 'Buyer wants to modify address / other order details',
    RTO: 'Yes',
    USED_BY: 'BNP'
  },
  '011': {
    Reason: 'Buyer not found or cannot be contacted',
    RTO: 'Yes',
    USED_BY: 'LSP & SNP'
  },
  '012': {
    Reason: 'Buyer does not want product any more',
    RTO: 'Yes',
    USED_BY: 'LSP & SNP'
  },
  '013': {
    Reason: 'Buyer refused to accept delivery',
    RTO: 'Yes',
    USED_BY: 'LSP & SNP ',
  },
  '014': {
    Reason: 'Address not found',
    RTO: 'Yes',
    USED_BY: 'LSP & SNP'
  },
  '015': {
    Reason: 'Buyer not available at location',
    RTO: 'Yes',
    USED_BY: 'LSP & SNP'
  },
  '016': {
    Reason: 'Accident / rain / strike / vehicle issues',
    RTO: 'No',
    USED_BY: 'LSP'
  },
  '017': {
    Reason: 'Order delivery delayed or not possible',
    RTO: 'No',
    USED_BY: 'LSP'
  },
  '018': {
    Reason: 'Delivery pin code not serviceable',
    RTO: 'No',
    USED_BY: 'SNP',
  },
  '019': {
    Reason: 'Pickup pin code not serviceable',
    RTO: 'No',
    USED_BY: 'SNP',
  },
  '020': {
    Reason: 'Order lost in transit',
    RTO: 'No',
    USED_BY: 'LSP & SNP'
  },
  '021': {
    Reason: 'Packed order not complete',
    RTO: 'No',
    USED_BY: 'LSP'
  },
  '999': {
    Reason: 'Order confirmation failure',
    RTO: 'N/A',
    USED_BY: 'BNP'
  },
  '998': {
    Reason: 'Order confirmation failure',
    RTO: 'N/A',
    USED_BY: 'SNP'
  },
  '997': {
    Reason: 'Order confirmation failure',
    RTO: 'N/A',
    USED_BY: 'LSP'
  },
  '996': {
    Reason: 'Order confirmation / completion failure',
    RTO: 'N/A',
    USED_BY: 'LBNP'
  },
}
const signMessage = async (signing_string, privateKey) => {
  await _sodium.ready;
  const sodium = _sodium;
  const signedMessage = sodium.crypto_sign_detached(
    signing_string,
    sodium.from_base64(privateKey, base64_variants.ORIGINAL)
  );
  return sodium.to_base64(signedMessage, base64_variants.ORIGINAL);
};

const createSigningString = async (message, created, expires) => {
  if (!created)
    created = Math.floor(new Date().getTime() / 1000 - 1 * 60).toString();
  if (!expires) expires = (parseInt(created) + 1 * 60 * 60).toString();
  await _sodium.ready;
  const sodium = _sodium;
  const digest = sodium.crypto_generichash(64, sodium.from_string(message));
  const digest_base64 = sodium.to_base64(digest, base64_variants.ORIGINAL);
  const signing_string = `(created): ${created}\n(expires): ${expires}\ndigest: BLAKE-512=${digest_base64}`;
  return { signing_string, expires, created };
};

function split_auth_header(auth_header) {
  const header = String(auth_header).replace("Signature ", "");
  let re = /\s*([^=]+)=([^,]+)[,]?/g;
  let m;
  let parts = {};
  while ((m = re.exec(header)) !== null) {
    if (m) {
      parts[m[1]] = remove_quotes(m[2]);
    }
  }
  return parts;
}

function remove_quotes(value) {
  if (
    value.length >= 2 &&
    value.charAt(0) == '"' &&
    value.charAt(value.length - 1) == '"'
  ) {
    value = value.substring(1, value.length - 1);
  }
  return value;
}

const verifyMessage = async (signedString, signingString, publicKey) => {
  try {
    await _sodium.ready;
    const sodium = _sodium;
    return sodium.crypto_sign_verify_detached(
      sodium.from_base64(signedString, base64_variants.ORIGINAL),
      signingString,
      sodium.from_base64(publicKey, base64_variants.ORIGINAL)
    );
  } catch (error) {
    return "false";
  }
};

const contextData = (action, resContext) => {
  const now = new Date();
  const ISTOffset = 330; // offset in minutes
  const ISTTime = new Date(now.getTime() + ISTOffset * 60 * 1000);
  let currentTimeStamp = ISTTime.toISOString();
  currentTimeStamp = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  let context = {
    domain: resContext?.domain,
    action: action,
    core_version: "1.2.0",
    bap_id: resContext?.bap_id,
    bap_uri: resContext?.bap_uri,
    bpp_id: `${process.env.ONDC_SUBSCRIBER_ID}`,
    bpp_uri: `${process.env.ONDC_SUBSCRIBER_URL}`,
    transaction_id: resContext?.transaction_id,
    message_id: resContext?.message_id,
    city: resContext?.city,
    country: "IND",
    timestamp: currentTimeStamp,
    ttl: resContext?.ttl,
  };
  return context;
};

async function createOndcRequestRawData(transaction_id, action, rawData, status, response, error) {
  try {
    const result = await BuyerOndcRequest.updateOne(
      { transaction_id, action },
      { $set: { action, reqBody: rawData, status, response, error } },
      { upsert: true }
    )
    return result;
  } catch (error) {
    console.error('Error Creating Request:', error);
    throw error;
  }
}

async function createOndcOnSearchRequestRawData(transaction_id, action, sellerNp, rawData, status, response) {
  try {
    const result = await BuyerOndcOnSearchRequest.create({ transactionId: transaction_id, action: action, sellerNp, reqBody: rawData, status: status, response: response });
    return result;
  } catch (error) {
    console.error('Error Creating Request:', error);
    throw error;
  }
}

async function updateOndcOnSearchRejectionData(transactionId, action, sellerNp, providerId, providerData, incremental) {
  try {
    let filter = { providerId, sellerNp, action };
    let update = { $set: { transactionId, reqBody: providerData } }
    const existingDocument = await BuyerOndcOnSearchRequest.findOne({ providerId, transactionId, sellerNp, action });
    // console.log("buyer on_search result ::::::======>existingDocument",existingDocument)

    if (incremental) {
      update = {
        $set: { transactionId },
        $push: {
          "reqBody.errors": {
            $each: providerData.errors
          }
        }
      };
    }
    if (existingDocument) {
      filter = { providerId, transactionId, sellerNp, action };
      update = {
        $push: {
          "reqBody.errors": {
            $each: providerData.errors
          }
        }
      };
    }
    const result = await BuyerOndcOnSearchRequest.findOneAndUpdate(
      filter,
      update,
      { new: true, upsert: true });
    // console.log("buyer on_search result ::::::======>result",result)

    return result;
  } catch (error) {
    console.error('Error Updating APi Request:', error);
    throw error;
  }
}

async function createOndcOnSearchFullRequestRawData(transaction_id, action, seller_np, provider_id, rawData) {
  try {
    const result = await buyerOndcOnSearchFullRequest.updateOne(
      { providerId: provider_id },
      { $set: { transactionId: transaction_id, action, sellerNp: seller_np, providerData: rawData } },
      { upsert: true }
    )
    return result;
  } catch (error) {
    console.error('Error Updating APi Request:', error);
    throw error;
  }
}

async function createOndcApiRecord(transaction_id, record) {
  try {
    const result = await BuyerOndcApiRecord.updateOne(
      { transactionId: transaction_id },
      {
        $push: {
          records: record
        },
      },
      { upsert: true }
    )
    return result;
  } catch (error) {
    console.error('Error Updating APi Request:', error);
    throw error;
  }
}

async function updateOndcApiErrors(transactionId, orderId, error) {
  try {
    const updatedDoc = await BuyerOndcApiError.findOneAndUpdate(
      {
        transactionId: transactionId,
        "errorsData.context.action": error.context.action,
      },
      {
        $set: { "errorsData.$[elem]": { ...error, status: true }, },
      },
      {
        arrayFilters: [
          {
            "elem.context.action": error?.context?.action,
          },
        ],
        new: true,
        useFindAndModify: false,
      }
    );
    if (!updatedDoc) {
      await BuyerOndcApiError.updateOne(
        {
          transactionId: transactionId,
          "errorsData.context.action": { $ne: error.context.action },
        },
        {
          $set: { ondcOrderId: orderId },
          $push: { errorsData: { ...error, status: true } },
        },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error('Error updateOndcApiErrors:', error);
    throw error;
  }
}

const ondcTransactionLog = async (type, reqdata) => {
  try {
    const data = JSON.stringify({
      "type": type,
      "data": reqdata
    });
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.ONDC_TRANSACTION_URL}`,
      headers: {
        'Authorization': `${process.env.ONDC_BUYER_TRANSACTION_LOG_JWT}`,
        'Content-Type': 'application/json'
      },
      data: data
    };
    const result = await axios.request(config);
    return result.status;
  } catch (error) {
    console.log('OndcTransactionLog error: ', error);
    return { error };
  }
};


function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0
}

function timestampCheck(date) {
  const dateParsed = new Date(Date.parse(date))
  if (!isNaN(dateParsed)) {
    if (dateParsed.toISOString() != date) {
      //FORMAT_ERR= Valid date but not in RFC 3339 format
      return { err: 'FORMAT_ERR' }
    }
  } else {
    //INVLD_DT= Invalid date-time format
    return { err: 'INVLD_DT' }
  }
}

const timeDiff = (time1, time2) => {
  const dtime1 = new Date(time1)
  const dtime2 = new Date(time2)
  if (isNaN(dtime1 - dtime2)) return 0
  else return dtime1 - dtime2
}

function checkContext(
  data,
  path,
) {
  if (!data) return
  const errObj = {}
  if (data.transaction_id === data.message_id) {
    errObj.id_err = "transaction_id and message id can't be same"
  }
  if (data.action != path) {
    errObj.action_err = `context.action should be ${path}`
  }
  if (!data.bpp_uri) {
    errObj.bpp_uri_err = `context.bpp_uri is missing`
  }
  if (!data?.core_version || data?.core_version !== "1.2.0") {
    errObj.bpp_uri_err = `context.core_version should be 1.2.0`
  }
  if (data.ttl && data.ttl != ondcConstants.RET_CONTEXT_TTL) {
    {
      errObj.ttl_err = `ttl = ${ondcConstants.RET_CONTEXT_TTL} as per the API Contract`
    }
  }
  if (data.timestamp) {
    const date = data.timestamp
    const result = timestampCheck(date)
    if (result && result.err === 'FORMAT_ERR') {
      errObj.timestamp_err = 'Timestamp not in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format'
    } else if (result && result.err === 'INVLD_DT') {
      errObj.timestamp_err = 'Timestamp should be in date-time format'
    }
  }
  if (_.isEmpty(errObj)) {
    const result = { valid: true, SUCCESS: 'Context Valid' }
    return result
  } else {
    const result = { valid: false, ERRORS: errObj }
    return result
  }
}

function checkBppId(input) {
  try {
    if (!input) {
      return `bpp_id is not present`
    }
    if (
      input?.startsWith('https://') ||
      input.startsWith('www') ||
      input.startsWith('https:') ||
      input.startsWith('http')
    ) {
      return `context/bpp_id should not be a url`
    }
    return null
  } catch (e) {
    return e
  }
}

const checkPaymentStatus = (payment) => {
  if (payment?.status == 'PAID') {
    if (!payment?.params?.transaction_id) {
      return false
    }
  }
  return true
}

const compareCoordinates = (coord1, coord2) => {
  if (!coord1 || !coord2) return false
  // Remove all spaces from the coordinates
  const cleanCoord1 = coord1.replace(/\s/g, '')
  const cleanCoord2 = coord2.replace(/\s/g, '')
  // Compare the cleaned coordinates
  return cleanCoord1 === cleanCoord2
}


function isEqualCustom(obj1, obj2) {
  const price1 = parseFloat(obj1?.value);
  const price2 = parseFloat(obj2?.value);
  if (price1 !== price2) {
    return false;
  }
  for (let key in obj1) {
    if (key !== 'value' && obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1?.sort()) === JSON.stringify(arr2?.sort());
}

function compareArrays(array1, array2) {
  const keys1 = array1 && Object.keys(array1).sort();
  const keys2 = array2 && Object.keys(array2).sort();
  if (!arraysEqual(keys1, keys2)) {
    return false;
  }
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (
      typeof array1[key] === "object" &&
      typeof array2[key] === "object"
    ) {
      if (!compareArrays(array1[key], array2[key])) {
        return false;
      }
    } else {
      if (array1[key] !== array2[key]) {
        return false;
      }
    }
  }
  return true;
}

const checkQuoteTrailSum = (
  fulfillmentArr,
  price,
  priceAtConfirm,
  errorObj,
  action,
) => {
  let quoteTrailSum = 0
  if (fulfillmentArr?.length) {
    for (const obj of fulfillmentArr) {
      const arrType = ['misc', 'packing', 'delivery', 'tax', 'item']
      const quoteTrailItems = _.filter(obj.tags, { code: 'quote_trail' })
      for (const item of quoteTrailItems) {
        if (item?.list?.length) {
          for (const val of item.list) {
            if (val.code === 'type') {
              if (!arrType.includes(val.value)) {
                errorObj[`invalidQuoteTrailType${action}`] = `Invalid Quote Trail Type '${val.value}'. It should be equal to one of the given value in small_case 'misc', 'packing', 'delivery', 'tax' or 'item'`
              }
            }
            if (val.code === 'value') {
              quoteTrailSum -= val.value
            }
          }
        }
      }
    }
  }
  quoteTrailSum = Number(quoteTrailSum?.toFixed(2))
  priceAtConfirm = Number(priceAtConfirm)?.toFixed(2)
  price = Number(price?.toFixed(2))
  const sum = (quoteTrailSum + price)?.toFixed(2)
  if (parseFloat(priceAtConfirm) != parseFloat(sum)) {
    const key = `invldQuoteTrailPrices`
    errorObj[key] = `quote_trail price and item quote price sum for ${action}[${sum}] should be equal to the price as in ${ondcConstants.ON_CONFIRM}[${priceAtConfirm}]`
  }
}

function areTimestampsLessThanOrEqualTo(timestamp1, timestamp2) {
  const date1 = new Date(timestamp1).getTime()
  const date2 = new Date(timestamp2).getTime()
  return date1 <= date2
}

function isValidTimestamp(timestamp) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(timestamp)
}

function checkTimeRanges(ff) {
  const keys = ['start', 'end']
  const errors = []
  if (!ff?.start?.time || !Object.keys(ff?.start?.time)?.length) {
    errors.push(`/start/time is not provided in delivery FF`)
    return
  }
  if (!ff?.end?.time || !Object.keys(ff?.end?.time)?.length) {
    errors.push(`/end/time is not provided in delivery FF`)
    return
  }
  keys.forEach((key) => {
    if (!ff[key]?.time?.range) {
      errors.push(`/${key}/time/range is not provided in delivery FF`)
      return
    }
    const range = ff[key]?.time?.range
    if (!range?.start) {
      errors.push(`/${key}/time/range should have start timestamp in delivery FF`)
      return
    }
    if (!range?.end) {
      errors.push(`/${key}/time/range should have end timestamp in delivery FF`)
      return
    }
    if (
      !isValidTimestamp(range?.start) ||
      !isValidTimestamp(range?.end)
    ) {
      errors.push(`/${key}/range has invalid timestamp format`)
      return
    }
  })
  return errors.length === 0 ? null : errors
}

function compareTimeRanges(ff1, action1, ff2, action2) {
  const keys = ['start', 'end']
  const errors = []

  keys.forEach((key) => {
    if (!ff1[key]?.time?.range || !ff2[key]?.time?.range) {
      errors.push(`/${key}/range is not provided in one or both objects`)
      return
    }

    const range1 = ff1[key]?.time?.range
    const range2 = ff2[key]?.time?.range

    if (
      !isValidTimestamp(range1?.start) ||
      !isValidTimestamp(range1?.end) ||
      !isValidTimestamp(range2?.start) ||
      !isValidTimestamp(range2?.end)
    ) {
      errors.push(`/${key}/range has invalid timestamp format`)
      return
    }

    if (range1.start !== range2.start) {
      errors.push(
        `/${key}/range/start_time "${range1.start}" of ${action1} mismatched with /${key}/range/start_time "${range2.start}" of ${action2}`,
      )
    }

    if (range1.end !== range2.end) {
      errors.push(
        `/${key}/range/end_time "${range1.end}" of ${action1} mismatched with /${key}/range/end_time "${range2.end}" of ${action2}`,
      )
    }
  })
  return errors.length === 0 ? null : errors
}

function compareFulfillmentObject(obj1, obj2, keys, i, apiSeq) {
  const errors = []
  keys.forEach((key) => {
    if (_.isArray(obj1?.[key])) {
      obj1[key] = _.sortBy(obj1[key], ['code'])
    }
    if (_.isArray(obj2?.[key])) {
      obj2[key] = _.sortBy(obj2[key], ['code'])
    }

    if (!_.isEqual(obj1?.[key], obj2?.[key])) {
      if (
        typeof obj1?.[key] === 'object' &&
        typeof obj2?.[key] === 'object' &&
        Object.keys(obj1[key]).length > 0 &&
        Object.keys(obj2[key]).length > 0
      ) {
        const obj1_nested = obj1[key]
        const obj2_nested = obj2[key]

        const obj1_nested_keys = Object.keys(obj1_nested)
        const obj2_nested_keys = Object.keys(obj2_nested)

        const nestedKeys = obj1_nested_keys.length > obj2_nested_keys.length ? obj1_nested_keys : obj2_nested_keys

        nestedKeys.forEach((key_nested) => {
          if (!_.isEqual(obj1_nested[key_nested], obj2_nested[key_nested])) {
            const errKey = `message/order.fulfillments/${i}/${key}/${key_nested}`
            const errMsg = `Mismatch occurred while comparing '${obj1.type}' fulfillment object with ${apiSeq} on key '${key}/${key_nested}'`
            errors.push({ errKey, errMsg })
          }
        })
      } else {
        const errKey = `message/order.fulfillments/${i}/${key}`
        const errMsg = `Mismatch occurred while comparing '${obj1.type}' fulfillment object with ${apiSeq} on key '${key}'`
        errors.push({ errKey, errMsg })
      }
    }
  })
  return errors
}

const checkQuoteTrail = (quoteTrailItems, errorObj, selectPriceMap, itemIds, itemFFIds, items, ffId) => {
  if (quoteTrailItems?.length) {
    const ids = [];
    for (const item of quoteTrailItems) {
      let value = null
      let itemValue = null
      let itemID = null
      let type = null
      if (item?.list?.length) {
        for (const val of item.list) {
          if (val.code === 'type') {
            type = val.value
          }
          else if (val.code === 'id') {
            itemID = val.value
            if (itemID && type === "item") {
              if (ids?.includes(itemID)) {
                const key = `invalidQuoteTrail[${itemID}]`
                errorObj[key] =
                  `Multiple quote_trail found for same item id [${itemID}].`
              }
              else {
                ids.push(itemID);
              }
            }
            const Item = items?.find((item) => item.id === itemID && item.fulfillment_id === ffId)
            const ItemQty = Item?.quantity?.count
            value = selectPriceMap[val?.value] * ItemQty
          } else if (val.code === 'value') {
            itemValue = Math.abs(parseFloat(val.value))
          }
        }
      }
      if (value && itemValue && value !== itemValue && type === 'item') {
        const key = `invalidPrice[${itemID}]`
        errorObj[key] =
          `Price mismatch for [${itemID}] provided in quote object '[${itemValue}]'. It should be '[${value}]'`
      }
      if (!itemIds.includes(itemID) && type === 'item') {
        const key = `invalidItemID[${itemID}]`
        errorObj[key] = `Item ID [${itemID}] not present in items array`
      }
      if (!itemFFIds.includes(itemID) && type !== 'item') {
        const key = `invalidFulfillmentID[${itemID}]`
        errorObj[key] = `Fulfillment ID [${itemID}] not present in items array`
      }
    }
  }
}

const mapCancellationID = (cancelled_by, reason_id, errorObj) => {
  if (reason_id in reasonCodes && reasonCodes[reason_id].USED_BY.includes(cancelled_by)) {
    return true
  } else {
    errorObj['invldCancellationID'] = `Invalid CancellationID ${reason_id} or not allowed for ${cancelled_by}`
    return false
  }
}
function checkIdInUri(Uri, id) {
  return Uri?.includes(id)
}
function validateBppUri(bppUri, bpp_id, errorObj) {
  if (!checkIdInUri(bppUri, bpp_id)) {
    errorObj['bpp_id_in_uri'] = `Bpp_id ${bpp_id} is not found in BppUri ${bppUri}`
  }
}
const compareSTDwithArea = (pincode, std) => {
  return areaPincodes.some((e) => e.Pincode === pincode && e['STD Code'] === std)
}

const checkMandatoryTags = (i, index, item, errorObj, categoryJSON, categoryName, rejectedItems, providerId, itemId, providerName, itemName, eanNum) => {
  let attributeTag = null
  let originTag = null
  let vegTag = null
  if (item?.tags) {
    for (const tag of item.tags) {
      originTag = tag.code === 'origin' ? tag : originTag
      attributeTag = tag.code === 'attribute' ? tag : attributeTag
      vegTag = tag.code === 'veg_nonveg' ? tag : vegTag
    }
  }
  if (!attributeTag && categoryName !== 'Grocery') {
    const key = `message.catalog.bpp/providers[${i}].items[?(@.id=='${item.id}')]/tags`
    errorObj?.rejectionError.push({
      path: key,
      message: `Attribute tag fields are missing for ${categoryName} item[${index}]`,
      code: "20000",
      type: "ITEM-ERROR",
    });
    errorObj?.rejectionReportError.push({
      path: key,
      message: `Attribute tag fields are missing for ${categoryName} item[${index}]`,
      code: "20000",
      type: "ITEM-ERROR",
      providerId: providerId,
      itemId: itemId,
      providerName: providerName,
      itemName: itemName,
      eanNum: eanNum
    });
    rejectedItems.push({ id: item.id, error: key })
  }
  if (vegTag) {
    item?.tags?.map((tag, tagI) => {
      switch (tag.code) {
        case 'veg_nonveg':
          const allowedCodes = ['veg', 'non_veg', 'egg']
          for (const it of tag.list) {
            if (it.code && !allowedCodes.includes(it.code)) {
              const key = `message.catalog.bpp/providers[${i}].items[?(@.id=='${item.id}')]/tags[${tagI}]/veg_nonveg`
              errorObj?.rejectionError.push({
                path: key,
                message: `item_id: ${item.id} should have veg_nonveg one of the 'veg', 'non_veg' in bpp/providers[${i}]`,
                code: "20000",
                type: "ITEM-ERROR",
              });
              errorObj?.rejectionReportError.push({
                path: key,
                message: `item_id: ${item.id} should have veg_nonveg one of the 'veg', 'non_veg' in bpp/providers[${i}]`,
                code: "20000",
                type: "ITEM-ERROR",
                providerId: providerId,
                itemId: itemId,
                providerName: providerName,
                itemName: itemName,
                eanNum: eanNum
              });
              rejectedItems.push({ id: item.id, error: key })
            }
          }
          break
      }
    })
  }
  // if (attributeTag) {
  //   const tags = attributeTag.list
  //   const ctgrID = item.category_id
  //   if (categoryJSON.hasOwnProperty(ctgrID)) {
  //     const mandatoryTags = categoryJSON[ctgrID]
  //     const missingMandatoryTags = []
  //     tags?.forEach((tag) => {
  //       const tagCode = tag.code
  //       if (!mandatoryTags[tagCode]) {
  //         missingMandatoryTags.push(tag.code)
  //       }
  //     })
  //     if (missingMandatoryTags.length > 0) {
  //       const key = `message.catalog.bpp/providers[${i}].items[?(@.id=='${item.id}')]/tags`
  //       errorObj?.rejectionError.push({
  //         path: key,
  //         message: `Invalid attribute for item with category id: ${missingMandatoryTags.join(', ')}`,
  //         code: "20000",
  //         type: "ITEM-ERROR",
  //       });
  //       errorObj?.rejectionReportError.push({
  //         path: key,
  //         message: `Invalid attribute for item with category id: ${missingMandatoryTags.join(', ')}`,
  //         code: "20000",
  //         type: "ITEM-ERROR",
  //         providerId: providerId,
  //         itemId: itemId,
  //         providerName: providerName,
  //         itemName: itemName,
  //         eanNum: eanNum
  //       });
  //       rejectedItems.push({ id: item.id, error: key })
  //     }
  //     for (const tagName in mandatoryTags) {
  //       if (mandatoryTags.hasOwnProperty(tagName)) {
  //         const tagInfo = mandatoryTags[tagName]
  //         const isTagMandatory = tagInfo.mandatory
  //         if (isTagMandatory) {
  //           let tagValue = null
  //           let originalTag = null
  //           const tagFound = tags?.some((tag) => {
  //             const res = tag.code === tagName.toLowerCase()
  //             if (res) {
  //               tagValue = tag.value
  //               originalTag = tag.value
  //             }
  //             return res
  //           })
  //           if (!tagFound) {
  //             const key = `message.catalog.bpp/providers[${i}].items[?(@.id=='${item.id}')]/tags`
  //             errorObj?.rejectionError.push({
  //               path: key,
  //               message: `Mandatory tag field [${tagName.toLowerCase()}] missing for ${categoryName} item[${index}]`,
  //               code: "20000",
  //               type: "ITEM-ERROR",
  //             });
  //             errorObj?.rejectionReportError.push({
  //               path: key,
  //               message: `Mandatory tag field [${tagName.toLowerCase()}] missing for ${categoryName} item[${index}]`,
  //               code: "20000",
  //               type: "ITEM-ERROR",
  //               providerId: providerId,
  //               itemId: itemId,
  //               providerName: providerName,
  //               itemName: itemName,
  //               eanNum: eanNum
  //             });
  //             rejectedItems.push({ id: item.id, error: key })
  //           }
  //           else {
  //             if (tagInfo.value.length > 0) {
  //               let isValidValue = false
  //               let regexPattern = ''
  //               if (Array.isArray(tagInfo.value)) {
  //                 isValidValue = tagInfo.value.includes(originalTag) || tagInfo.value.includes(tagValue)
  //               } else if (
  //                 typeof tagInfo.value === 'string' &&
  //                 tagInfo.value.startsWith('/') &&
  //                 tagInfo.value.endsWith('/')
  //               ) {
  //                 regexPattern = tagInfo.value.slice(1, -1)
  //                 const regex = new RegExp(regexPattern)
  //                 isValidValue = regex.test(originalTag) || regex.test(tagValue)
  //               }
  //               if (!isValidValue) {
  //                 const key = `message.catalog.bpp/providers[${i}].items[?(@.id=='${item.id}')]/tags`
  //                 errorObj?.rejectionError.push({
  //                   path: key,
  //                   message: `Invalid item value: [${originalTag}]. It must be one of the allowed values or match the regex pattern [${regexPattern}].`,
  //                   code: "20000",
  //                   type: "ITEM-ERROR",
  //                 });
  //                 errorObj?.rejectionReportError.push({
  //                   path: key,
  //                   message: `Invalid item value: [${originalTag}]. It must be one of the allowed values or match the regex pattern [${regexPattern}].`,
  //                   code: "20000",
  //                   type: "ITEM-ERROR",
  //                   providerId: providerId,
  //                   itemId: itemId,
  //                   providerName: providerName,
  //                   itemName: itemName,
  //                   eanNum: eanNum
  //                 });
  //                 rejectedItems.push({ id: item.id, error: key })
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  return errorObj
}

const groceryObj = {
  brand: {
    mandatory: true,
    value: [],
  },
}

const groceryJSON = {
  'Fruits and Vegetables': groceryObj,
  'Masala & Seasoning': groceryObj,
  'Falseil & Ghee': groceryObj,
  'Eggs, Meat & Fish': groceryObj,
  'Detergents and Dishwash': groceryObj,
  'Bakery, Cakes & Dairy': groceryObj,
  'Pet Care': groceryObj,
  'Dairy and Cheese': groceryObj,
  'Snacks, Dry Fruits, Nuts': groceryObj,
  'Pasta, Soup and Noodles': groceryObj,
  'Cereals and Breakfast': groceryObj,
  'Sauces, Spreads and Dips': groceryObj,
  'Chocolates and Biscuits': groceryObj,
  'Cooking and Baking Needs': groceryObj,
  'Tinned and Processed Food': groceryObj,
  'Atta, Flours and Sooji': groceryObj,
  'Rice and Rice Products': groceryObj,
  'Dals and Pulses': groceryObj,
  'Salt, Sugar and Jaggery': groceryObj,
  'Energy and Soft Drinks': groceryObj,
  'Water': groceryObj,
  'Tea and Coffee': groceryObj,
  'Fruit Juices and Fruit Drinks': groceryObj,
  'Snacks and Namkeen': groceryObj,
  'Ready to Cook and Eat': groceryObj,
  'Pickles and Chutney': groceryObj,
  'Indian Sweets': groceryObj,
  'Frozen Vegetables': groceryObj,
  'Frozen Snacks': groceryObj,
  'Gift Voucher': groceryObj,
}

function getStatutoryRequirement(category) {
  const groceryCategoryMappingWithStatutory = {
    "Bakery, Cakes & Dairy": statutory_reqs.Both,
    "Dairy and Cheese": statutory_reqs.Both,
    "Snacks, Dry Fruits, Nuts": statutory_reqs.Both,
    "Cereals and Breakfast": statutory_reqs.Both,
    "Sauces, Spreads and Dips": statutory_reqs.Both,
    "Chocolates and Biscuits": statutory_reqs.Both,
    "Tinned and Processed Food": statutory_reqs.Both,
    "Energy and Soft Drinks": statutory_reqs.Both,
    "Fruit Juices and Fruit Drinks": statutory_reqs.Both,
    "Snacks and Namkeen": statutory_reqs.Both,
    "Ready to Cook and Eat": statutory_reqs.Both,
    "Pickles and Chutney": statutory_reqs.Both,
    "Indian Sweets": statutory_reqs.Both,
    "Frozen Snacks": statutory_reqs.Both,
    "Masala & Seasoning": statutory_reqs.PackagedCommodities,
    "Oil & Ghee": statutory_reqs.PackagedCommodities,
    "Eggs, Meat & Fish": statutory_reqs.PackagedCommodities,
    "Pet Care": statutory_reqs.PackagedCommodities,
    "Pasta, Soup and Noodles": statutory_reqs.PackagedCommodities,
    "Cooking and Baking Needs": statutory_reqs.PackagedCommodities,
    "Atta, Flours and Sooji": statutory_reqs.PackagedCommodities,
    "Rice and Rice Products": statutory_reqs.PackagedCommodities,
    "Dals and Pulses": statutory_reqs.PackagedCommodities,
    "Salt, Sugar and Jaggery": statutory_reqs.PackagedCommodities,
    "Tea and Coffee": statutory_reqs.PackagedCommodities,
    "Cleaning & Household": statutory_reqs.PackagedCommodities,
    "Detergents and Dishwash": statutory_reqs.PackagedCommodities,
    "Fruits and Vegetables": statutory_reqs.None,
    "Water": statutory_reqs.None,
    "Frozen Vegetables": statutory_reqs.None,
    "Gift Voucher": statutory_reqs.None
  };
  return groceryCategoryMappingWithStatutory[category]
}

const statutory_reqs = {
  PrepackagedFood: '@ondc/org/statutory_reqs_prepackaged_food',
  PackagedCommodities: '@ondc/org/statutory_reqs_packaged_commodities',
  None: 'None',
  Both: 'Both'
}

function checkForStatutory(item, i, j, errorObj, statutoryArr, rejectedItems, providerId, itemId, providerName, itemName, eanNum) {
  const requiredFields = {
    '@ondc/org/statutory_reqs_prepackaged_food': [
      'nutritional_info',
      'additives_info',
      'brand_owner_FSSAI_license_no',
      'other_FSSAI_license_no',
      'importer_FSSAI_license_no',
    ],
    '@ondc/org/statutory_reqs_packaged_commodities': [
      'manufacturer_or_packer_name',
      'manufacturer_or_packer_address',
      'common_or_generic_name_of_commodity',
      'month_year_of_manufacture_packing_import',
    ],
  }
  statutoryArr?.forEach((statutory_req) => {
    if (!_.isEmpty(item[statutory_req] || typeof item[statutory_req] !== 'object' || item[statutory_req] === null)) {
      const data = item[statutory_req]
      requiredFields[statutory_req].forEach((field, k) => {
        if (typeof data[field] !== 'string' || data[field].trim() === '') {
          const key = `message.catalog.bpp/providers[${i}].items[?(@.id=='${item.id}')]/${statutory_req}/${field}`
          errorObj?.rejectionError.push({
            path: key,
            message: `The item${j}/'${statutory_req}'/${field} is missing or not a string in bpp/providers/items for /${ondcConstants.ON_SEARCH}`,
            code: "20000",
            type: "ITEM-ERROR",
          });
          errorObj?.rejectionReportError.push({
            path: key,
            message: `The item${j}/'${statutory_req}'/${field} is missing or not a string in bpp/providers/items for /${ondcConstants.ON_SEARCH}`,
            code: "20000",
            type: "ITEM-ERROR",
            providerId: providerId,
            itemId: itemId,
            providerName: providerName,
            itemName: itemName,
            eanNum: eanNum
          });
          rejectedItems.push({ id: item.id, error: `${statutory_req}_missing` })
        }
      })
    } else {
      const key = `message.catalog.bpp/providers[${i}].items[?(@.id=='${item.id}')]/${statutory_req}`
      errorObj?.rejectionError.push({
        path: key,
        message: `The item ${item.id} is not having item${j}/'${statutory_req}' in bpp/providers for /${ondcConstants.ON_SEARCH}`,
        code: "20000",
        type: "ITEM-ERROR",
      });
      errorObj?.rejectionReportError.push({
        path: key,
        message: `The item ${item.id} is not having item${j}/'${statutory_req}' in bpp/providers for /${ondcConstants.ON_SEARCH}`,
        code: "20000",
        type: "ITEM-ERROR",
        providerId: providerId,
        itemId: itemId,
        providerName: providerName,
        itemName: itemName,
        eanNum: eanNum
      });
      rejectedItems.push({ id: item.id, error: `${statutory_req}_not_found` })
    }
  })
  return errorObj
}


const getDecimalPrecision = (numberString) => {
  const parts = numberString.trim().split('.')
  if (parts.length === 2) {
    return parts[1].length
  } else {
    return 0
  }
}

const checkGpsPrecision = (coordinates) => {
  if (!coordinates || !coordinates.includes(',')) return 0;
  const [lat, long] = coordinates.split(',')
  if (isNaN(lat) || isNaN(long)) return 0;
  const latPrecision = getDecimalPrecision(lat)
  const longPrecision = getDecimalPrecision(long)
  const decimalPrecision = ondcConstants.DECIMAL_PRECISION
  if (latPrecision >= decimalPrecision && longPrecision >= decimalPrecision) {
    return 1
  } else return 0
}

const isValidPhoneNumber = (value) => {
  const phoneRegex = /^(\d{10}|\d{11})$/
  if (value?.startsWith('0')) {
    value = value.substring(1)
  }
  const val = value?.replace(/[^\d]/g, '')
  return phoneRegex.test(val)
}

const emailRegex = (email) => {
  const emailRE = /^\S+@\S+\.\S+$/
  return emailRE.test(email)
}

function deepOmit(obj, keysToOmit) {
  if (_.isArray(obj)) {
    return obj.map(item => deepOmit(item, keysToOmit));
  }
  if (_.isObject(obj)) {
    obj = _.omit(obj, keysToOmit);
    _.forOwn(obj, (value, key) => {
      obj[key] = deepOmit(value, keysToOmit);
    });
  }
  return obj;
}

function deepCompareWithOmissions(obj1, obj2, keysToOmit = []) {
  const filteredObj1 = deepOmit(obj1, keysToOmit);
  const filteredObj2 = deepOmit(obj2, keysToOmit);
  return _.isEqual(filteredObj1, filteredObj2);
}

function isoDurationToMinutes(duration) {
  const regex = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/;
  const match = duration?.match(regex);
  if (match) {
    const days = parseInt(match[1] || 0, 10);
    const hours = parseInt(match[2] || 0, 10);
    const minutes = parseInt(match[3] || 0, 10);
    const seconds = parseInt(match[4] || 0, 10);
    // Convert everything to minutes
    return days * 1440 + hours * 60 + minutes + Math.floor(seconds / 60);
  }
  else {
    return null;
  }
}


const serialQueueAll = (requestArray) => {
  return new Promise((resolve) => {
    let counter = 0;
    const resultArray = [];
    const startProcess = async () => {
      if (requestArray[counter] !== undefined) {
        const func = _.get(requestArray, `[${counter}].func`, null);
        const param = _.get(requestArray, `[${counter}].param`, {});
        let result = null;
        if (typeof func === "function") {
          result = await func(param);
        }
        resultArray.push(result);
        counter++;
        startProcess();
      } else {
        resolve(resultArray);
      }
    };
    startProcess();
  });
};

module.exports = {
  signMessage,
  createSigningString,
  verifyMessage,
  split_auth_header,
  contextData,
  createOndcRequestRawData,
  createOndcOnSearchRequestRawData,
  createOndcApiRecord,
  isObjectEmpty,
  timestampCheck,
  timeDiff,
  checkContext,
  checkBppId,
  checkPaymentStatus,
  compareCoordinates,
  isEqualCustom,
  compareArrays,
  checkQuoteTrailSum,
  areTimestampsLessThanOrEqualTo,
  ondcConstants,
  DeliveryTypes,
  quoteBreakupTitleType,
  apiFlowConstants,
  partcancelReturnReasonCodes,
  returnRequestReasonCodes,
  returnRejectedRequestReasonCodes,
  compareTimeRanges,
  compareFulfillmentObject,
  checkTimeRanges,
  ROUTING_ENUMS,
  checkQuoteTrail,
  mapCancellationID,
  validateBppUri,
  compareSTDwithArea,
  checkMandatoryTags,
  groceryJSON,
  checkForStatutory,
  getStatutoryRequirement,
  statutory_reqs,
  checkGpsPrecision,
  isValidPhoneNumber,
  emailRegex,
  deepCompareWithOmissions,
  isValidTimestamp,
  serialQueueAll,
  createOndcOnSearchFullRequestRawData,
  ondcTransactionLog,
  isoDurationToMinutes,
  updateOndcOnSearchRejectionData,
  updateOndcApiErrors,
  fnbOndcConstants
};
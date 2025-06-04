module.exports = {
  //NOTE:never change the order
  coinEarningActivities : [
                          "signUp",
                          "videoView",
                          "likedVideo",
                          "sharedVideo",
                          "liveStreamView",
                          // "performLiveStream",
                          "eventShared",
                          "follow",
                          "purchasedCoin",
                          // "coinsEarned",
                          "shopCall",
                          "bonus",
                          "orderPlaced",
                          "heartCount",
                          "flowerCount",
                          "cakeCount",
                          "crakersCount",
                          "customerOrder",
                          "refundCustomerOrder"
                          ],
  coinEarningMessages:{
    "signUp":"You have earned this coin by signing up on kiko.",
    "videoView":"You have earned this coin by watching a video.",
    "likedVideo":"You have earned this coin by liked a video.",
    "sharedVideo":"You have earned this coin by shared a video.",
    "liveStreamView":"You have earned this coin by watching a live stream.",
    "performLiveStream":"You have earned this coin by performing a live stream.",
    "eventShared":"You have earned this coin by sharing a event.",
    "follow":"You have earned this coin by start following a kiko user.",
    "orderPlaced":"You have earned this coin by placing a order.",
    "purchasedCoin":"You have placed a order.",
    // "coinsEarned":"You have earned this coin by placed a order.",
    "shopCall":"You have earned this coin by shop call a order.",
    "bonus":"You have earned this coin by bonus.",
    "heartCount":"You have gifted heart in an event",
    "flowerCount":"You have gifted flower in an event",
    "cakeCount":"You have gifted cake in an event",
    "crakersCount":"You have gifted crakers in an event",
    "customerOrder": "Customer has placed an order.",
    "refundCustomerOrder": "Refund coin amount for order placed by customer."
  },
  coinEarningTitles:{
    "signUp":"Coin limit reached to max on sign up.",
    "videoView":"Coin limit reached to max on video view.",
    "likedVideo":"Coin limit reached to max on video like.",
    "sharedVideo":"Coin limit reached to max on video share.",
    "liveStreamView":"Coin limit reached to max on live stream view.",
    "performLiveStream":"Coin limit reached to max on perform live stream.",
    "eventShared":"Coin limit reached to max on event share.",
    "follow":"Coin limit reached to max on follow user.",
    "orderPlaced":"Coin limit reached to max on order placed.",
    "shopCall":"Coin limit reached to max on shop call.",
    "bonus":"Coin limit reached to max on bonus."
  },
  coinEarningText:{
    "signUp":"Log-in/Sign up",
    "videoView":"Video View",
    "likedVideo":"Like Video",
    "sharedVideo":"Video Share",
    "liveStreamView":"Live Stream View",
    "performLiveStream":"Live Stream Performance",
    "eventShared":"Event Share",
    "follow":"Follow",
    "orderPlaced":"Coin limit reached to max on order placed.",
    // "coinsEarned":"Coins Earned",
    "shopCall":"Shop Call",
    "bonus":"Bonus"
  },
  selectCoinLimits : "signUpMaxLimit ,videoViewMaxLimit ,likedVideoMaxLimit ,sharedVideoMaxLimit ,liveStreamViewMaxLimit ,performLiveStreamMaxLimit ,eventSharedMaxLimit ,followMaxLimit ,orderPlacedMaxLimit,shopCallMaxLimit,bonusMaxLimit",
  FCM: {
    "serverkey": "AAAAgr1jfIw:APA91bH6Ovz97unBhyD_dmRSmwu_TbHklc_0weqITSywae7ZfGIw6FkFF5nnyz8TcguLOdaP5l94iSDv2Pxe47l9NXwqXypcrVHbbGzQf1nB4B8oTGGoWJL-s89oASq1DUvqRKKhpm-K",
    "config": {
      "type": "service_account",
      "project_id": "kiko-live",
      "private_key_id": "c6fc75ec5122c07ef7815bd1b2f1dd30f9db28d9",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGeAl1gE4CIW14\n7jpN2UPA5POHsBu9Wo65dAQPHsBaNrneDbENPgzhNWI3vIabyNIErJ3ZV4cAv5Yl\nPUHeShtmv3DJtcv/tfM6bhNamFK8WFkKUD9np/S6S95eeG7z1f0GvLlCniNmYCLY\nDdhhMR8dY0wvxbFXlqPbaduW5xXncQR+PWFb4mKbCDmL0G+FFUs4ygHDSnnRKSD2\nsPTmbbPTq5TM9DZuCa0EEziPvfM7o18HwPh8f2DNBxM91WHeSnwq45Rg/DQsQRX/\nfE2Lbhb2tTRgljl+7R26zUk2Gr6xSOEuP86aZq//JZnia+XaauN9HnVuf4UCp6CL\nIKzoPPsxAgMBAAECggEAOOLSD0BR27F6H8Xkp0ilb2YQWW2EXe9VZlmXCkBtsM3r\n03ZIL7v/1BNJjiE20fMrI1TYv6GjW/cOEalvtke2d+paaS53BNnBmBdR688qM7r8\n9oRO0CancjhpydkqMDC/IA266hnKmr7mbdf2E9GREgrSnQTEko7mc27xllyw/g95\nAraOcjc877CMpU3Ozu9meOklcsKk1jdiMMmHULJ2AG2KtJUFxnypU4k8KeMb+e1E\nlFqeiAFW4/MUl6JwthtEj+aXYwQ/ywhqNDxBKfq0ARe8Zn8VGetoClNDWZrrQl/0\n2k0q7GDh7QJuU1q+BmFpY755VUmRkU3JIX91NehAkwKBgQDqS0t8gCRfAoY0CK/k\nYAwexkVF/y8pTGK6XUsPzIvSARRb9zFIDmsY1B+YP82YC+S2cjYHOhQcBY3c+hMW\nLtZpFOLpPk5+XyoLGG8hdQZ9Y+vhzaFTdD1q3QgPUWDLs2pSAoDz1jCayCv/QMvS\nXYL0O5TjjCeSlapcogHk/Qx1xwKBgQDY2xUl6nxKKfEphuHhGENojq3+s9cR2B2Y\ne626YxbvKM1u830G5b4od4UF+/U1sBek5yHlum5kFg+sls8itF3fL+9iSnwemT0M\nbwVpjDrG2yYxQbEKzBB69cQBCAbVuJLUq+YIYS1ngqzU3GqrKzLaLYM0VFTlbtTF\nEY3XcXEnRwKBgQCBgfFN9n8kTX7lUE/5yuWoNSyhjncBOwnvvhX5u7Ul9hbM5wzE\nqcOlS8vTGqGIhDp+Zw9aW042VxOdrFXUkztNhpAPIbO9wti4nV8AfXGC6jK+9C1S\nthQk99y2quL4dko03tFs916SkEdRpv2DYNE8M5sPVK+jJTuwTJUDgKTcjQKBgQDB\nOTy3wx6qCoMq6Fd99NujX3aju2TILpP4WUNsD3zQ7r9VvDlMGwt8DTsHIQDVrKj0\ns0nd42cXYRzoQJwiJSp7gr+/CfVcYlgmKwpciKmapIx8WTdCEqAgn7nc3WURq9uR\nCfX2w3fsgmAzbo7RI7W099avmvDmWgHV8pU7QYZ8YwKBgQCjMcl0avI0wADyz9oQ\now4u62Nfj2xyDOwRYbFwakOd7TTtOi/FArZIyAmFIvrXZLy12X9yyXzh7GiBIhI/\n/k/XyHa/gHO2DZGxRu6hd3g88iErSj8jK7RmkBuobKrNrPFzghT49ww1Io9k/ihz\nDWoWQPU9Lg341qtUD1N1rd0Nlg==\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-q6v3a@kiko-live.iam.gserviceaccount.com",
      "client_id": "109064808330821320715",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-q6v3a%40kiko-live.iam.gserviceaccount.com"
    }
  },
  FCM_TABE: {
    "type": "service_account",
    "project_id": "tabe-becb4",
    "private_key_id": "7d45a595a0a3ee777a675107f0318733021e251f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWWUI38k0kJwvE\n8bVhqtAB/SSR0wYHBjeSZhp3phijgs+rhw4R82rWSPD/1aeDBl+sp5aAuWX6+m6C\noyyEYYROHE3mDHkgVUFTIxXV+6MlBVNSRJC7hRdC8vmhJ9QoscOa2z7tvaj8Lb+2\nWuFBwpcPu23dGH5/x0n2OBh3W/3E5HEVfT4iHRmpZx4jhTzzHobjt0Ufq9ZoFzGA\n9Ep+g6ssnkaqmNlzKE7Ojm5xsvAx9CVLzFmTkCj5SJC+O5e4YeyNQbWzIB+IUHRb\nw+kMOVpgwJwqFb8LSOrNPa3hw4W6IjvibOIhQe+qZFh60CORoQIZeeGah/fQm3qu\ne+MfV/CLAgMBAAECggEAAkbV1IWyOqlf6O2CT8r1kgsJloAhAI9/cc9Vn6JRgUca\nt2Ew9CrbayXaMKio/1P6TZMRuHgZQUzj282QFvxFxsid+sza6oEaHdM+rTrfgdcO\nvZrbbxdCTUrXl1Xp3UbKFsmv+OytsB2fFPiqvnAqx5cZJ++7929H9bs+ma7BJ5RN\nz0EEcC7fR6r1U4PFeKf6TZQ+vmo48rmy7ruoGrkRKcc9oRRI6Cta/9MX42Nau7gz\nKDbZ1qXIomvnJhRhRBfh7tlrnkLyBC85Sr9NaB/oRQLd1zNdLVnpxlg0+2G5T2OB\ngfbQRRnNTVmz+w4EPFSyiVLc/Bi/haLSxz1dasVKtQKBgQDrVXpLjwLrpyUinxwH\n4atJRPRPPi8648Ryc8UpcPi7aFRdKakhJCHmzDHeD5GYhCt4nglbmx2Rikt4GqsL\noPllBjQdEyTeUEHhmCxUgYg9XafzES8vLxNW9TXqdAj3IapOLh9ctOOjVlDAEB8E\n4WE/o6MtKhpoGb6mnjqLWOEvDQKBgQDpLAOAh/SIy3vVdrG8P3B18Mq2PFYwlywS\ntLRITP4NNTo0tDKMMaeSWJrSVIHfWzV3rcum4nvnDWhF/ZUgpA9WTyIqhfUMNpue\ngZ4R3ZSdIk5fJvKPJ+YFUHrA0li8KCXO7v1yVMSur5L6JaCAINiTyIx8s3WI9Aqu\n5W6FJOb39wKBgDQMqMrTa6LxSf5ZUJrRp8/Bx4NLTqjovYdO4bmjue/BSH9+emDR\nHApu+UyTBvHDsdWwpoMzUJvjCYQb6d7dkKtubtJLbKka+SdLP+rE53wjHcVd9KCr\n+cwO2gjr9xupv4AhJWCcxYhXy+5e4m1y585qg+m2WTbTEt7JOkudsdh1AoGASHlH\ntWGMniAxI047PDmzqNTpDO+AEqZKKp5EEtzrcguDRfJka7LbVN95b7qYi2X8HnDE\nheCLhmtiZ67D9VtI8Rizk+gDHIK0p/W9vevTT2vkVCr05Y4PLsOvA9PdhM4twj4C\nRNEYOPuVgW7Ejk6nQnfpQrE87Q59a5MgYP3xVE0CgYEAw3e6pR3PXKSiRZdiSnp3\nL/ijn2KjsM1UrEgh6jgccIA57Y00wmWEdGHKt9sAhGfB7sERYxWqzAxeSbK8/JU5\nHyuMFZRxA4nXLL7MeDxGhAqY5wc0EDH7gwBXoGHz29L1xZB6SjR5vqxJWT39FvkO\n66nKEXSUXj6Bz5ble2iwNiU=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@tabe-becb4.iam.gserviceaccount.com",
    "client_id": "102731277778555811677",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tabe-becb4.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  },
  videoCallStatusEnum: ["calling", "cancelledByUser", "cancelledByAgent", "waiting", "connected", "disconnected", "online", "offline"],
  status: {
    Approved: "Approved",
    Rejected: "Rejected",
    InReview: "InReview"
  },
  userRoles: {
    'user':'user',
    'admin':'admin',
    'agent':'agent',
    'vendor':'vendor'
  },
  videoStatus: {
    Blocked: "Blocked",
    Published: "Published",
    InReview: "In Review",
    Waiting_for_review:"Waiting for review",
    Delete:"Delete"
  },
  userVideoUploadLimit: 50,
  flagTypeEnum: ['liveEvent', 'video', 'user'],
  notifyStatus: {
    Active: "Active",
    Pushed: "Pushed",
    Delete:"Delete"
  },
  userAddressAddLimit: 8,
  AddressStatus: {
    Active: "Active",
    Default: "Default",
    Delete: "Delete"
  },
  deviceTokenStatus: {
    Active: "Active"
  },
  orderDeliveryModeEnum: [ 'KikoDelivery', 'SelfDelivery', null ],
  withdrawStatusEnum: ["COMPLETED", "PENDING", "REJECTED", null],
  liveWithdrawStatusEnum: ["COMPLETED", "PENDING", "REJECTED", null],
  orderPaymentModeEnum:  ['KikoPayment', 'SelfPayment'],
  orderModeEnum: [ 'Ecom', 'VideoCall', 'PaymentLink', 'Reward', "Invoice", "Offline" ],
  orderStatusEnum: ['order-place', 'payment-initiated', 'payment-completed', 'payment-failed', 'order-cancelled', 'order-ready-to-pickup', 'order-pickup', 'order-delivered', 'order-returned', 'order-dispatch','order-processing'],
  notifyMeTittle: {
    "live":"Live Event."
  },
  eventSessionType: {
    Daily:"daily",
    Once:"once"
  },
  eventStatus: {
    Approved:"approved"
  },
  deviceType: {
    android: "android",
    ios:"ios"
  },
  maximumLoadingCapacityEnum: ["LCM", "MCV", "HCV","", null],
  deliveryPriorityEnum: ["Immediate", "T+1", "T+2","", null], 
  //Immediate matlab turant hoga
  //T+1 matlab aaj ka kal deliver hoga
  //T+2 matlab aaj ka parso deliver hoga

  orderDeliveryModeTypes: `'KikoDelivery', 'SelfDelivery'`,
  orderPaymentModeETypes:  `'KikoPayment', 'SelfPayment'`,
  orderModeTypes: `'Ecom', 'OneOnOne', 'PaymentLink', 'Reward'`,
  inviteUserType: ['existing', 'visitor', 'new'],
  helpDeskStatus: {
    pending: "pending",
    resolve: "resolve",
    inprogress: "inprogress"
  },
  helpDeskReponseMessage: {
    "data_not_added": "There is an error while creating ticket on help desk.",
    "document_created": "Ticket has been successfully created in help desk.",
    "error_getting_data": "There is an error while getting help desk data",
    "no_data_of_user": "There is no ticket created by user.",
    "successfully_get_data": "successfully get help desk data."
  },
  paginationLimit: 10,
  inviteUserType:['existing','visitor','new','visitor_new','visitor_existing'],
  videoCallStatus:{
    'calling':'calling',
    'disconnect':'disconnect',
    'connected':'connected',
    'busy':'busy',
    'onlineList':'onlineList',
    'unrelated':'unrelated',
    'onLineAgent':'onLineAgent',
    'missed':'missed',
    'reject':'reject',
    'cancel':'cancel',
    'address':'address'
  },
  videoCallingStatusEnum:[
  'calling',
  'disconnect',
  'connected',
  'busy',
  'onlineList',
  'unrelated',
  'onLineAgent',
  'reject',
  'missed',
  'cancel',
    'address' ],
  permissionsmodule: {
    invoice: "invoice"
  },
  errorMessage: {
    user_not_found: "User not found.",
    user_does_not_have_permission_to_create_invoice: "User does not have permission to create invoice.",
    setting_not_found: "Setting Data not found",
    order_not_found: "Order not found.",
    user_does_not_have_permission_to_view_invoice: "User does not have permission to view invoice.",
    data_not_found: "Data not found."
  },
  errorTemplate: {
    per_transaction_limit: "Max transaction limit is {{data}}.",
    per_day_limit: "Per day limit is {{data}}",
    per_mounth_limit: "Per mounth limit is {{data}}",
  },
  settingCollectionsKey: {
    invoice_template: "invoice_template",
    invoice_prefix: "invoice_prefix",
    invoice_count: "invoice_count",
    invoice_epiry_time: "invoice_epiry_time"
  },
  invoiceStatus: {
    pending: "pending",
    initiated: "initiated",
    paid: "paid",
    expired: "expired",
    cancel: "cancel"
  },
  paymentGateway: {
    razorpay: "razorpay"
  },
  supportedCurrency: {
    INR: "INR"
  },
  paymentCallBack: {
    url: 'https://kiko.live/invoice/',
    method: "get"
  },
  successMessage: {
    "successfull": "successfull"
  },
  razorpayConfig: {
    baseURL: "https://api.razorpay.com/v1",
    timeOut: 3000
  },

  easyWaySms: {
    APIKEY: "2602CE15F39F31",
    campaign: 0,
    routeid: 7,
    type: "text",
    senderId: "KIKOTV",
    url: `http://login.easywaysms.com/app/smsapi/index.php`,
    templateId:"1207162824287610974"
  },

  gupShup: {
    userid: 2000202768,
    password: "Kikotv@614",
    // userid: 2000202214,
    // password: "xxkzSEzC",
    auth_scheme: "plain",
    method: "SendMessage",
    format: "text",
    v: 1.1,
    msg_type: "TEXT",
    url: `https://enterprise.smsgupshup.com/GatewayAPI/rest`
  },

  borzoStatus: {
    "new": "Order Initiated", // Newly created order, waiting for verification from our dispatchers.
    "available": "In transit", // Order was verified and is available for couriers.
    "active": "In transit",   // A courier was assigned and is working on the order.
    "completed": "Order Completed",  // Order is completed.
    "reactivated": "In transit",   // Order was reactivated and is again available for couriers.
    "draft": "In transit", // The order is a draft and will not be delivered as such. You can create an actual order out of the draft in your Personal cabinet.
    "canceled": "Order Cancelled", // Order was canceled.
    "delayed": "In transit", // Order execution was delayed by a dispatcher.
    "planned": "In transit", //Planned delivery (No courier assigned)
    "finished": "Order Completed", // Delivery finished (Courier delivered the parcel)
    "failed": "Order Failed", // Delivery failed (Courier could not find a customer)
    "courier_assigned": "In transit", // Courier assigned, but still not departed
    "courier_departed": "In transit", // Courier departed to the pick-up point
    "parcel_picked_up": "In transit", // Courier took parcel at the pick-up point
    "courier_arrived": "In transit", // Courier has arrived and is waiting for a customer
    "deleted": "Order Deleted", // Delivery deleted
  },

  dunzoStatus: {
    "created": "Order Initiated",   // (Task created)
    "queued": "In transit",  // (Dunzo is looking for a runner to be assigned to the task) 
    "runner_accepted": "In transit", // (Runner en route to pick up the items) 
    "reached_for_pickup": "In transit", // (Runner has reached the pickup location) 
    "pickup_complete": "In transit", // (Runner has picked up the items) 
    "started_for_delivery": "In transit", // (Runner is moving towards the drop-off) 
    "reached_for_delivery": "In transit", // (Runner has reached the drop-off location)
    "delivered": "Order Completed", // (Items were delivered successfully)
    "cancelled": "Order Cancelled", // (Task cancelled)
    "runner_cancelled": "In transit", // (Runner cancelled, Dunzo is looking for another runner to be assigned to the task)
  },

  borzoRealTimeStatus: {
    "new": "order_created", // Newly created order, waiting for verification from our dispatchers.
    "planned": "looking_for_courier", //Planned delivery (No courier assigned)
    "courier_assigned": "courier_assigned", // Courier assigned, but still not departed
    "courier_departed": "courier_departed", // Courier departed to the pick-up point
    "parcel_picked_up": "parcel_picked_up", // Courier took parcel at the pick-up point
    "active": "active",   // A courier was assigned and is working on the order.
    "courier_arrived": "courier_arrived", // Courier has arrived and is waiting for a customer
    "finished": "parcel_delivered", // Delivery finished (Courier delivered the parcel)
    "deleted": "order_deleted", // Delivery deleted
    "canceled": "order_cancelled", // Order was canceled.
    "delayed": "delayed", // Order execution was delayed by a dispatcher.
    "failed": "order_failed", // Delivery failed (Courier could not find a customer)
  },

  dunzoRealTimeStatus: {
    "created": "order_created",   // (Task created)
    "queued": "looking_for_courier",  // (Dunzo is looking for a runner to be assigned to the task) 
    "runner_accepted": "courier_assigned", // (Runner en route to pick up the items) 
    "reached_for_pickup": "courier_departed", // (Runner has reached the pickup location) 
    "pickup_complete": "parcel_picked_up", // (Runner has picked up the items) 
    "started_for_delivery": "active", // (Runner is moving towards the drop-off) 
    "reached_for_delivery": "courier_arrived", // (Runner has reached the drop-off location)
    "delivered": "parcel_delivered", // (Items were delivered successfully)
    "cancelled": "order_cancelled", // (Task cancelled)
    "runner_cancelled": "runner_cancelled", // (Runner cancelled, Dunzo is looking for another runner to be assigned to the task)
  },

  shadowfaxRealTimeStatus: {
    "ACCEPTED": "order_created", // Newly created order, waiting for verification from our dispatchers.
    "ALLOTTED": "courier_assigned", // Courier assigned, but still not departed
    "ARRIVED": "parcel_picked_up", // Parcel picked up
    "DISPATCHED": "courier_departed", // Courier departed to the pick-up point
    "ARRIVED_CUSTOMER_DOORSTEP": "courier_arrived", // Pracel at customer doorstep (not delivered yet)
    "DELIVERED": "parcel_delivered", // Order delivered to customer
    "CANCELLED": "order_cancelled", // Order was canceled.
    "CANCELLED_BY_CUSTOMER": "order_cancelled", // Order was canceled.
  },

  shadowfaxFlashRealTimeStatus: {
    "CREATED": "order_created", // Newly created order, waiting for verification from our dispatchers.
    "ACCEPTED": "order_created", // Newly created order, waiting for verification from our dispatchers.
    "ALLOTTED": "courier_assigned", // Courier assigned, but still not departed
    "ARRIVED": "parcel_picked_up", // Parcel picked up
    "COLLECTED": "courier_departed", // Courier departed to the pick-up point
    "CUSTOMER_DOOR_STEP":"courier_arrived", // status taken from swagger
    "ARRIVED_AT_CUSTOMER_DOORSTEP": "courier_arrived", // Pracel at customer doorstep (not delivered yet) // status taken from doc
    "DELIVERED": "parcel_delivered", // Order delivered to customer
    "CANCELLED": "order_cancelled", // Order was canceled.
    "CANCELLED_BY_CUSTOMER": "order_cancelled", // Order was canceled.
    "RTS_INITIATED": "rto_initiated", // Order was canceled.
    "RTS_COMPLETED": "rto_delivered", // Order was canceled.
  },

  ondcOrdersStatus: [
    "Pending",
    "Created",
    "Accepted",
    "In-progress",
    "Completed",
    "Cancelled"
],

  ondcCatalougeRejection: {
    "90001":	"Fulfilment rate below declared standards"
    ,"90002":	"On-time delivery rate below declared standards"
    ,"90003":	"Select call failure more than published threshold"
    ,"90004":	"Init call failure more than published threshold"
    ,"90005":	"Confirm call failure more than published threshold"
    ,"90006":	"Percentage of customer issues resolved within resolution TATs is below published standards"
    ,"90007":	"Duplicate Store"
    ,"90008":	"Customer complaints more than published standards"
    ,"90009":	"Rejected store due to Item level rejection above threshold"
    ,"90010":	"Missing authorisation from NP"
    ,"90011":	"Merchant status sent by Seller NP is unavailable"
    ,"90012":	"Country of Origin not present (For Packaged Products)"
    ,"90013":	"Only Hyperlocal Delivery allowed"
    ,"90014":	"Invalid Latitude"
    ,"90015":	"Invalid Longitude"
    ,"90016":	"Invalid customisation group data"
    ,"90017":	"Stores less than declared threshold"
    ,"90018":	"Empty Address field"
    ,"90019":	"Other Provider Error"
    ,"90020":	"Tags type not present against items"
    ,"90021":	"Invalid Address received"
    ,"90022":	"Invalid city received"
    ,"90023":	"Invalid contact number- not 10 digit"
    ,"90024":	"Invalid FSSAI"
    ,"90025":	"Delivery radius not given"
    ,"90026":	"Store timing not in correct format"
    ,"90027":	"Locality & city mismatch"
    ,"90028":	"Store not received on search for 2 consecutive days"
    ,"90029":	"Store disabled by Seller App"
    ,"90030":	"Store Category mapping sent empty or unavailable at Buyer App side"
    ,"90031":	"NP integration version mis-match"
    ,"90032":	"Store location error"
    ,"90033":	"Provider in Blacklisted"
    ,"91001":	"Item price > MRP"
    ,"91002":	"Use of restrictive keywords"
    ,"91003":	"No Images found"
    ,"91004":	"Duplicate Images Found"
    ,"91005":	"Low quality Image Found"
    ,"91006":	"Image Title Mismatch"
    ,"91007":	"Other Mandatory/Statutory Field not there"
    ,"91008":	"Duplicate Product"
    ,"91010":	"Price is Zero"
    ,"91011":	"Incorrect Image File Format"
    ,"91012":	"Country of Origin not present (For Packaged Products)"
    ,"91013":	"Net Quantity not present"
    ,"91014":	"FSSAI/Statutory requirement not present (For packaged products)"
    ,"91015":	"BIS Mark not present"
    ,"91016":	"Product miscategorized"
    ,"91017":	"Others - Add specific Error Description"
    ,"91018":	"Available quantity for the SKU is either absent or invalid"
    ,"91019":	"Category for the SKU does not exist"
    ,"91020":	"The parameters for customisation of SKU are not shared"
    ,"91021":	"Category field is missing"
    ,"91022":	"Customer care contact details missing"
    ,"91023":	"MRP less than zero"
    ,"91024":	"Price less than zero"
    ,"91025":	"Item status sent by Seller NP is unavailable"
    ,"91026":	"Invalid Item ID"
    ,"91027":	"Invalid Service Provider ID"
    ,"91028":	"Customisation not present"
    ,"91029":	"Invalid customisation group"
    ,"92001":	"NP integration version mis-match"
    ,"92002":	"Missing authorisation from NP"
    ,"92003":	"Mandatory field missing or the data format is incorrect for all Providers"
    ,"92004":	"Invalid domain sent"
    ,"92005":	"NP is blacklisted or inactive or not onboarded yet"
    ,"92006":	"Provider Rejections crossed threshold in single transaction ID"
  },


  ondcCancelReason:{
    "001": "Price of one or more items have changed due to which buyer was asked to make additional payment",
    "002": "One or more items in the Order not available",
    "003": "Product available at lower than order price",
    "004": "Order / fulfillment in pending shipment / delivery state for too long",
    "005": "Merchant rejected the order",
    "006": "Order / fulfillment not received as per buyer app SLA",
    "008": "Order / fulfillment not ready for pickup",
    "009": "Wrong product delivered",
    "010": "Buyer wants to modify details",
    "011": "Buyer not found or cannot be contacted",
    "012": "Buyer does not want product any more",
    "013": "Buyer refused to accept delivery",
    "014": "Address not found",
    "015": "Buyer not available at location",
    "016": "Accident / rain / strike / vehicle issues",
    "017": "Order delivery delayed or not possible",
    "018": "Delivery pin code not serviceable",
    "019": "Pickup pin code not serviceable",
    "020": "Order lost in transit",
    "021": "Packed order not complete",
  },

  // settlement_details: [
  //   {
  //     "settlement_counterparty": "seller-app",
  //     "beneficiary_name":"Smooth Tag Technologies Pvt. Ltd.",
  //     "settlement_type": "neft",
  //     "settlement_bank_account_no": "50200058582942",
  //     "settlement_ifsc_code": "HDFC0000015",
  //     "settlement_phase": "sale-amount",
  //     "settlement_status": "NOT-PAID",
  //     "bank_name":"HDFC BANK LTD ",
  //     "branch_name":"MUMBAI - MULUND (WEST)"
  //   }
  // ],

  settlement_details: [
    {
      "settlement_counterparty": "seller-app",
      "upi_address":"",
      "beneficiary_name": "SMOOTH TAG TECHNOLOGIES PRIVATE LIMITED",
      "settlement_type": "neft",
      "settlement_bank_account_no": "50200057222741",
      "settlement_ifsc_code": "HDFC0000015",
      "settlement_phase": "sale-amount",
      // "settlement_status": "NOT-PAID",
      "bank_name": "HDFC BANK LTD ",
      "branch_name": "MUMBAI - MULUND WEST (WEST)"
    }
  ],

  catagoryId : [
    "Cheesecakes",
    "Chicken",
    "Chicken wings",
    "Chips",
    "Coffee",
    "Cookies",
    "Crepes",
    "Dal",
    "Desserts",
    "Dhokla",
    "Dosa",
    "Doughnuts",
    "Eggs",
    "Energy Drinks",
    "Falafel",
    "Fresh Juice",
    "Fries",
    "Ice cream",
    "Idli",
    "Kabab",
    "Kachori",
    "Kulfi",
    "Lassi",
    "Meal bowl",
    "Mezze",
    "Mithai",
    "Momos",
    "Mutton",
    "Nachos",
    "Noodles",
    "Pakodas",
    "Pancakes",
    "Paneer",
    "Pasta",
    "Pastries",
    "Pie",
    "Pizza",
    "Poha",
    "Raita",
    "Rice",
    "Rolls",
    "Roti",
    "Salad",
    "Samosa",
    "Sandwich",
    "Seafood",
    "Shakes & Smoothies",
    "Soft Drink",
    "Soup",
    "Spring Roll",
    "Sushi",
    "Tacos",
    "Tandoori",
    "Tart",
    "Tea",
    "Thali",
    "Tikka",
    "Upma",
    "Uttapam",
    "Vada",
    "Vegetables",
    "Waffle",
    "Wrap",
    "Yogurt"
  ]     
};

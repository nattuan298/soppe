import { browserConfig } from "src/constants/browser-config";

const apiPrefix = `${browserConfig.apiBaseUrl}/auth/members`;
// const apiPrefixPayment = browserConfig.kbankApiURL;

export const apiRoute = {
  signIn: {
    MEMBER_ID: `${apiPrefix}/signIn`,
    FACEBOOK: `${apiPrefix}/facebook`,
    PHONENUMBER: `${apiPrefix}/phone/verify`,
    SENDOTP: `${apiPrefix}/phone/verifyOtp`,
    TWOFA: `${apiPrefix}/2fa`,
  },
  signup: {
    postPhoneNumber: "/sms/send-otp",
    postOTP: "/sms/verify-otp",
    getCity: "/provinces/find-by-country",
    getCityHasBranch: "/provinces/contain-branches",
    getDistrict: "/districts/get-by-province",
    getSubDistrict: "/sub-districts/get-by-district",
    getBank: "/banks/find-by-country",
    signup: "/auth/members/signUp",
    signOut: "/auth/members/signOut",
    verifyIdCard: "/auth/members/verify-id-card",
    temporaryAccounts: "/temporary-accounts",
  },
  members: {
    accountInformation: "/members/account-information",
    mobileConnection: "/members/account-information/mobile-connection",
    facebookConnection: "/members/account-information/facebook-connection",
    documents: "/members/documents",
    getPoints: "/members/points-and-values",
    sponsorInfor: "/members/sponsor-information",
    transferBmc: "/members/transfer-bmc",
    transferBmcHistory: "/members/transfer-bmc-history",
    personalStatistic: "/members/personal-statistic",
    generateDynamicLink: "/members/sponsor/dynamic-link",
    uploadAvatar: "/members/account-information/avatar",
    newPinSponsor: "/members/new-pin-sponsor",
    matchingSponsor: "/members/matching-sponsor",
    newRegister: "members/new-register",
    favoriteMemberList: "/members/favorite-member-list",
    organizationList: "/members/organization-list",
    sponsorChart: "/members/sponsor-chart",
    trip: "/members/trip",
    travelPVHistory: "/members/pv-travel-history",
    commissionReport: "/members/commission-report",
    pvHistory: "/members/pv-history",
    organizationTree: "/members/organization-tree",
  },
  upload: {
    getUploadSignURL: "/upload/upload-signed-url",
    getSignURL: "/upload/signed-url",
  },
  products: {
    getProductDetail: "/products/productCode",
    searchListProduct: "/products",
    getReviews: "/reviews",
    getListProduct: "/products/list",
    generateDynamicLink: "/products/dynamic-link",
    categories: "/categories",
  },
  userInfors: {
    listAddress: "/address-books",
  },
  reviewProduct: {
    reviewProduct: "/reviews",
  },
  helpCenter: {
    getfaqCategories: "/faq-categories",
    getfaqs: "/faqs",
    helpful: "/faqs/helpful",
    notHelpful: "/faqs/not-helpful",
    provinces: "/provinces/contain-branches",
    branches: "/branches/help-center",
  },
  categories: {
    getCategories: "/categories",
  },
  branch: {
    getBranchCheckout: "/branches/checkout",
  },
  orders: {
    listOrders: "/orders",
    shippingFee: "/orders/shippingFee",
    draftOrders: "/orders/create-order-draft",
  },
  addressBook: {
    listAddress: "/address-books",
  },
  sponsors: {
    sponsors: "/sponsors",
    makeOrder: "/sponsors/make-order",
    directAnalysis: "/agent-reports/sponsor-analysis",
    g1Analysis: "/members/g1-analysis",
  },
  payment: {
    registerCharge: "payment/k-payment/register/card/v2/charge",
    normalCharge: "/payment/k-payment/card/v2/charge",
    statePayment: "/payment/k-payment/state",
    statePaymentRegister: "/payment/k-payment/register/state",
    createOrderForQR: "/payment/k-payment/qr/v2/order",
    createOrderForQRRegister: "/payment/k-payment/register/qr/v2/order",
    qrFeatureCheckStatus: "/qr-feature/check-status",
  },
  sponsor: {
    listSponsorHistory: "/sponsors/history",
  },
  pointTopup: {
    makeOrder: "/scm-points/make-order",
    totalSCMP: "/members/points-and-values",
    Ecommission: "members/e-commission",
    decreaseEcommission: "/scm-points/decrease-e-commission",
    detail: "scm-points/detail",
    updatePayment: "/scm-points/update-payment-fields",
  },
  favoriteProduct: {
    getFavorites: "/favourite-products",
  },
  admin: {
    tracking: "/admin/orders/tracking-status",
  },
  search: {
    popular: "/popular-keywords",
  },
  security: {
    getState: "/members/security/state",
    generateSecurity: "/members/security/2fa/generate",
    turnOnSecurity: "/members/security/2fa/turn-on",
    turnOffSecurity: "/members/security/2fa/turn-off",
  },
  templateSections: {
    sectionItem: "/admin/home-templates/sections-item",
    sectionItemLink: "/admin/home-templates/sections-item-link",
  },
  agentReports: {
    ecommStatement: "/agent-reports/ecomm-statement",
    cycleAndFob: "/agent-reports/cycle-and-fob",
    cycleHistory: "/agent-reports/cycle-history",
    expireList: "/agent-reports/expire-list",
    nearExpireList: "/agent-reports/near-expire-list",
  },
  note: {
    note: "/note",
  },
  article: {
    getArticles: "/articles",
  },
  notifications: {
    getNotifications: "/notifications",
    readNotifications: "/notifications/read",
    readAllNotifications: "/notifications/mark-read-all",
    countAllUnreadNotifications: "/notifications/list",
    subscribeNotification: "/notifications/subscribe/topic",
    unSubscribeNotification: "/notifications/unsubscribe/topic",
    topic: "/notifications/topic",
    register: "/notifications/register",
  },
  trip: {
    processPV: "/agent-reports/progress-trip",
  },
  setting: {
    notification: "/members/notify-status",
  },
  coupon: {
    apply: "/coupons/apply",
    applyRegister: "/coupons/apply/sign-up",
  },
};

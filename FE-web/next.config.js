const nextTranslate = require("next-translate");

module.exports = {
  compress: false, // should delegate this to nginx instead
  images: {
    domains: [
      "share.stl.vmo.group",
      "via.placeholder.com",
      "scm-ecommerce.s3.amazonaws.com",
      "helpx.adobe.com",
      "stg-scm-ecommerce.s3.amazonaws.com",
      "scm-ecommerce.s3.ap-southeast-1.amazonaws.com",
      "prod-scm-ecommerce.s3.amazonaws.com",
      "scm-ecommerce.s3.amazonaws.com",
      "stg-scm-ecommerce.s3.amazonaws.com",
      "scm-ecommerce.s3.ap-southeast-1.amazonaws.com",
      "prod-scm-ecommerce.s3.amazonaws.com",
      "prod-scm-ecommerce.s3.ap-southeast-1.amazonaws.com",
      "scm-ecommerce-pub.s3.amazonaws.com",
      "stg-scm-ecommerce-pub.s3.amazonaws.com",
      "prod-scm-ecommerce-pub.s3.amazonaws.com",
      "stg-scm-ecommerce-pub.scmconnext.com",
      "prod-scm-ecommerce-pub.scmconnext.com",
      "soppe.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  poweredByHeader: false,
  publicRuntimeConfig: {
    // Will be available to both server and browser
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    appID: process.env.NEXT_PUBLIC_APP_ID || "",
    urlReferralLink: process.env.NEXT_PUBLIC_BASE_URL || "",
    referralRedirectUrl: process.env.NEXT_PUBLIC_REFERRAL_URL || "",
    apiKey: process.env.REACT_APP_AGENT_API_KEY || "",
    projectId: process.env.REACT_APP_AGENT_PROJECT_ID || "",
    authDomain: process.env.REACT_APP_AGENT_AUTH_DOMAIN || "",
    storageBucket: process.env.REACT_APP_AGENT_STORAGE_BUCKET || "",
    messagingSenderId: process.env.REACT_APP_AGENT_MESSAGING_SENDER_ID || "",
    appId: process.env.REACT_APP_AGENT_APP_ID || "",
    measurementId: process.env.REACT_APP_AGENT_MEASUREMENT_ID || "",
    keyMap: process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP || "",
    kbankPublicKey: process.env.NEXT_PUBLIC_KBANK_PUBLIC_KEY || "",
    kbankBaseURL: process.env.NEXT_PUBLIC_KBANK_BASE_URL || "",
    kbankMId: process.env.NEXT_PUBLIC_KBANK_M_ID || "",
    kbankApiURL: process.env.NEXT_KBANK_API_URL || "",
  },

  ...nextTranslate(),
};

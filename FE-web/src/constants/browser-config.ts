import getConfig from "next/config";

// holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

export const browserConfig = {
  apiBaseUrl: publicRuntimeConfig.apiBaseUrl,
  appID: publicRuntimeConfig.appID,
  url: publicRuntimeConfig.urlReferralLink,
  referralRedirectUrl: publicRuntimeConfig.referralRedirectUrl,
  apiKey: publicRuntimeConfig.apiKey,
  projectId: publicRuntimeConfig.projectId,
  authDomain: publicRuntimeConfig.authDomain,
  storageBucket: publicRuntimeConfig.storageBucket,
  messagingSenderId: publicRuntimeConfig.messagingSenderId,
  appId: publicRuntimeConfig.appId,
  measurementId: publicRuntimeConfig.measurementId,
  keyMap: publicRuntimeConfig.keyMap,
  kbankPublicKey: publicRuntimeConfig.kbankPublicKey,
  kbankBaseURL: publicRuntimeConfig.kbankBaseURL,
  kbankMId: publicRuntimeConfig.kbankMId,
  kbankApiURL: publicRuntimeConfig.kbankApiURL,
};

import { Media } from "types/api-response-type";
import {
  routeCommissionReportBase,
  routeCycleAndFOBReportBase,
  routeCycleHistoryReportBase,
  routeEcommissionStatementBase,
  routeMakePinOfCirectSponsorTeamBase,
  routeNewPinOfCirectSponsorTeamBase,
  routeNewRegisterUpdateSuExSteamBase,
} from "./routes";

import { browserConfig } from "src/constants/browser-config";
export const imageProductComingSoon = "/assets/images/product-image-placeholder.jpg";
export const imageDummy = "/assets/images/dummy-image.svg";
export const imageDummySquare = "/assets/images/dummy_square.svg";

export const defaultImages: Media[] = [
  {
    urlPreSign: "",
    url: "",
    fileType: "",
    position: 0,
  },
];

// export const defaultImageDummy: Medias[] = [
//   {
//     _id: "",
//     urlPreSign: imageDummy,
//     url: imageDummy,
//     fileType: "",
//     position: 0,
//   },
// ];

export const API_KEY_PAYMENT = browserConfig.kbankPublicKey;
export const MID_PAYMENT = browserConfig.kbankMId;
export const KBANK_BASE_URL = browserConfig.kbankBaseURL;

export type FieldUrlType = {
  key: string;
  url: string;
};

export const initValueFieldUrl: FieldUrlType = {
  key: "",
  url: "",
};

export const REPORT_PATHS = new Set([
  routeCycleAndFOBReportBase,
  routeCycleHistoryReportBase,
  routeEcommissionStatementBase,
  routeCommissionReportBase,
  routeNewPinOfCirectSponsorTeamBase,
  routeMakePinOfCirectSponsorTeamBase,
  routeNewRegisterUpdateSuExSteamBase,
]);

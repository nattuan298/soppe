import {
  routeAccountBase,
  routeCheckoutBase,
  routeHomeBase,
  routeMyAccountBase,
  routeOrganizationChart,
  routeReportAnalysisBase,
  routeSponsorChart,
  routeTripProcess,
} from "./routes";

export const PathnameGetPoints = new Set([
  routeReportAnalysisBase,
  routeCheckoutBase,
  routeHomeBase,
  routeAccountBase,
  routeOrganizationChart,
  routeSponsorChart,
  routeTripProcess,
]);

export const PathnameGetAccountInfor = new Set([
  routeReportAnalysisBase,
  routeHomeBase,
  routeAccountBase,
  routeMyAccountBase,
  routeOrganizationChart,
  routeTripProcess,
  routeSponsorChart,
]);

import { ParsedUrlQueryInput } from "querystring";
import { UrlObject } from "url";

export const routeHomeBase = "/";
export const routeHomeUrl = makeUrlObjectFromRouteBase(routeHomeBase);

export const routeProductsBase = "/products";
export const routeProductsUrl = makeUrlObjectFromRouteBase(routeProductsBase);

export const routeSigninBase = "/signin";
export const routeSigninUrl = makeUrlObjectFromRouteBase(routeSigninBase);

export const routeSigninMemberId = "/signin-member-id";
export const routeSigninMemberIdUrl = makeUrlObjectFromRouteBase(routeSigninMemberId);

export const routeSigninPhoneNumber = "/signin-phone-number";
export const routeSigninPhoneNumberUrl = makeUrlObjectFromRouteBase(routeSigninPhoneNumber);

export const routeSignupBase = "/signup";
export const routeSignupUrl = makeUrlObjectFromRouteBase(routeSignupBase);

export const routeForgotPassBase = "/forgot-password";
export const routeForgotPassUrl = makeUrlObjectFromRouteBase(routeForgotPassBase);

export const routeRecoverBase = "/recover-password";
export const routeRecoverPassUrl = makeUrlObjectFromRouteBase(routeRecoverBase);

export const routeCartBase = "/shopping-cart";
export const routeCartUrl = makeUrlObjectFromRouteBase(routeCartBase);

export const routeReviewProductBase = "/review-product";
export const routeReviewProductUrl = makeUrlObjectFromRouteBase(routeReviewProductBase);

export const routeCheckoutBase = "/checkout";
export const routeCheckoutUrl = makeUrlObjectFromRouteBase(routeCheckoutBase);

export const routeCheckoutSuccessBase = "/checkout/success";
export const routeCheckoutSuccessUrl = makeUrlObjectFromRouteBase(routeCheckoutSuccessBase);

export const routeProductDetailBase = "/product-detail/[id]";
export const routeProductDetailUrl = makeUrlObjectFromRouteBase(routeProductDetailBase);

export const routeHelpCenter1Base = "/help-center-1";
export const routeHelpCenter1Url = makeUrlObjectFromRouteBase(routeHelpCenter1Base);

export const routeHelpCenter2Base = "/help-center-2/[id]";
export const routeHelpCenter2Url = makeUrlObjectFromRouteBase(routeHelpCenter2Base);

export const routeHelpCenter3Base = "/help-center-3/[id]";
export const routeHelpCenter3Url = makeUrlObjectFromRouteBase(routeHelpCenter3Base);

export const routeProductsListing = "/products-listing";
export const routeProductsListingUrl = makeUrlObjectFromRouteBase(routeProductsListing);

export const routeFavoriteProductBase = "/favorite-product";
export const routeFavoriteProductUrl = makeUrlObjectFromRouteBase(routeFavoriteProductBase);

export const routeMyOrderBase = "/my-order";
export const routeMyOrderUrl = makeUrlObjectFromRouteBase(routeMyOrderBase);

export const routeMyOrderDetailBase = "/my-order/[id]";
export const routeMyOrderDetailUrl = makeUrlObjectFromRouteBase(routeMyOrderDetailBase);

export const routeTrackingOrderBase = "/my-order/tracking/[id]";
export const routeTrackingOrderUrl = makeUrlObjectFromRouteBase(routeTrackingOrderBase);

export const routeMyAccountBase = "/account-information";
export const routeMyAccountUrl = makeUrlObjectFromRouteBase(routeMyAccountBase);



export const routeCheckoutPointTopupBase = "/checkout-topup-scm-point";
export const routeCheckoutPointTopupURL = makeUrlObjectFromRouteBase(routeCheckoutPointTopupBase);

export const routeConfirmPointTopupBase = "/order-confirmation-topup-scm-point";
export const routeConfirmPointTopupURL = makeUrlObjectFromRouteBase(routeConfirmPointTopupBase);

export const routeSponsorBase = "/invite-friend";
export const routeSponsorURL = makeUrlObjectFromRouteBase(routeSponsorBase);

export const routeSponsoredUserHistoryBase = "/sponsored-user-history";
export const routeSponsoredUserHistoryURL = makeUrlObjectFromRouteBase(
  routeSponsoredUserHistoryBase,
);
export const routeAddressBookBase = "/address-book";
export const routeAddressBookURL = makeUrlObjectFromRouteBase(routeAddressBookBase);

export const routeCreateAddressFormBase = "/add-new-address-book";
export const routeCreateAddressBookURL = makeUrlObjectFromRouteBase(routeCreateAddressFormBase);

export const routeEditAddressFormBase = "/edit-address-book/[id]";
export const routeEditAddressBookURL = makeUrlObjectFromRouteBase(routeEditAddressFormBase);

export const routeSignin2faBase = "/signin-2fa";
export const routeSignin2faURL = makeUrlObjectFromRouteBase(routeSignin2faBase);

export const routeSecurityBase = "/security";
export const routeSecurityURL = makeUrlObjectFromRouteBase(routeSecurityBase);

export const routeReferrallinkBase = "/referrallink/[id]";
export const routeReferrallinkURL = makeUrlObjectFromRouteBase(routeReferrallinkBase);

export const routeAccountBase = "/my-account";
export const routeAccountURL = makeUrlObjectFromRouteBase(routeAccountBase);

export const routeSeeAllProductBase = "/sections-item/[id]";
export const routeseeAllProductURL = makeUrlObjectFromRouteBase(routeSeeAllProductBase);

export const routeQaCodePublicBase = "/qa-code-public";
export const routeQaCodePublicURL = makeUrlObjectFromRouteBase(routeQaCodePublicBase);

export const routeTransferBmcPvPointBase = "/transfer-bmc-pv-point";
export const routeTransferBmcPvPointUrl = makeUrlObjectFromRouteBase(routeTransferBmcPvPointBase);

export const routeTransferBmcPvPointHistoryBase = "/transfer-bmc-pv-point/history";
export const routeTransferBmcPvPointHistoryUrl = makeUrlObjectFromRouteBase(
  routeTransferBmcPvPointHistoryBase,
);

export const routeEcommissionStatementBase = "/ecommission-statement";
export const routeEcommissionStatementURL = makeUrlObjectFromRouteBase(
  routeEcommissionStatementBase,
);

export const routeReportAnalysisBase = "/report-analysis";
export const routeReportAnalysisUrl = makeUrlObjectFromRouteBase(routeReportAnalysisBase);

export const routeNotFoundBase = "/404";
export const routeNotFoundURL = makeUrlObjectFromRouteBase(routeNotFoundBase);

export const routeSettingsBase = "/settings";
export const routeSettingsURL = makeUrlObjectFromRouteBase(routeSettingsBase);

export const routeSettingsEditBase = "/settings-edit";
export const routeSettingsEditURL = makeUrlObjectFromRouteBase(routeSettingsEditBase);

export const routeNotificationBase = "/notification";
export const routeNotificationURL = makeUrlObjectFromRouteBase(routeNotificationBase);

export const routeNewsArticleBase = "/news-article";
export const routeNewsArticleURL = makeUrlObjectFromRouteBase(routeNewsArticleBase);

export const routeNewsArticleDetailBase = "/news-article/[id]";
export const routeNewsArticleDetailURL = makeUrlObjectFromRouteBase(routeNewsArticleDetailBase);
export const routeNotesBase = "/list-notes";

export const routeNotesURL = makeUrlObjectFromRouteBase(routeNotesBase);
export const routeAccountQRCodeBase = "/account-qr-code";
export const routeAccountQRCodeURL = makeUrlObjectFromRouteBase(routeAccountQRCodeBase);

export const routeAccountMemberProfileBase = "/account-member-profile";
export const routeAccountMemberProfileURL = makeUrlObjectFromRouteBase(
  routeAccountMemberProfileBase,
);
export const routeDirectSponsorAnalysisBase = "/direct-sponsor-analysis";
export const routeDirectSponsorAnalysisURL = makeUrlObjectFromRouteBase(
  routeDirectSponsorAnalysisBase,
);
export const routeCreateNoteBase = "/create-new-note";
export const routeCreateNoteURL = makeUrlObjectFromRouteBase(routeCreateNoteBase);

export const routeCycleAndFOBReportBase = "/cycle-and-fob-report";
export const routeCycleAndFOBReportURL = makeUrlObjectFromRouteBase(routeCycleAndFOBReportBase);

export const routeCommissionReportBase = "/commission-report";
export const routeCommissionReportURL = makeUrlObjectFromRouteBase(routeCommissionReportBase);

export const routeCycleHistoryReportBase = "/cycle-history-report";
export const routeCycleHistoryReportURL = makeUrlObjectFromRouteBase(routeCycleHistoryReportBase);

export const routePvHistoryReportBase = "/pv-history-report";
export const routePvHistoryReportURL = makeUrlObjectFromRouteBase(routePvHistoryReportBase);

export const routeNewPinOfCirectSponsorTeamBase = "/new-pin-of-direct-sponsor-team";
export const routeNewPinOfCirectSponsorTeamBaseURL = makeUrlObjectFromRouteBase(
  routeNewPinOfCirectSponsorTeamBase,
);

export const routeMakePinOfCirectSponsorTeamBase = "/matching-pin-of-direct-sponsor-team";
export const routemakePinOfCirectSponsorTeamBaseURL = makeUrlObjectFromRouteBase(
  routeMakePinOfCirectSponsorTeamBase,
);

export const routeNewRegisterUpdateSuExSteamBase = "/new-register-update-su-ex-steam";
export const routeNewRegisterUpdateSuExSteamBaseURL = makeUrlObjectFromRouteBase(
  routeNewRegisterUpdateSuExSteamBase,
);
export const routeTravelPVHistoryBase = "/travel-pv-history";
export const routeTravelPVHistoryURL = makeUrlObjectFromRouteBase(routeTravelPVHistoryBase);

export const routeExpiredMemberListBase = "/expired-member-list";
export const routeExpiredMemberListURL = makeUrlObjectFromRouteBase(routeExpiredMemberListBase);

export const routeNearExpireMemberListBase = "/near-expire-member-list";
export const routeNearExpireMemberListURL = makeUrlObjectFromRouteBase(
  routeNearExpireMemberListBase,
);

export const routeEditNoteBase = "/edit-note/[id]";
export const routeEditNoteURL = makeUrlObjectFromRouteBase(routeEditNoteBase);

export const routeTripProcess = "/trip-progress";
export const routeG1Analysis = "/g1-analysis";

export const routeFavoriteMemberBase = "/favorite-member";
export const routeOrganizationChart = "/organization-chart";
export const routeSponsorChart = "/sponsor-chart";

export function makeUrlObjectFromRouteBase(routeBase: string, query: ParsedUrlQueryInput = {}) {
  const url: UrlObject = {
    pathname: routeBase,
    query,
  };
  return url;
}

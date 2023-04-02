import { ThemeProvider } from "@material-ui/core";
import classnames from "classnames";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Footer } from "src/components/footer";
import { Header } from "src/components/header";
import { PathnameGetAccountInfor, PathnameGetPoints } from "src/constants/goup_route";
import {
  routeAccountBase,
  routeAccountMemberProfileBase,
  routeAccountQRCodeBase,
  routeAddressBookBase,
  routeCartBase,
  routeCheckoutBase,
  routeCheckoutPointTopupBase,
  routeCheckoutSuccessBase,
  routeCommissionReportBase,
  routeConfirmPointTopupBase,
  routeCreateAddressFormBase,
  routeCreateNoteBase,
  routeCycleAndFOBReportBase,
  routeCycleHistoryReportBase,
  routeDirectSponsorAnalysisBase,
  routeEcommissionStatementBase,
  routeEditAddressFormBase,
  routeEditNoteBase,
  routeExpiredMemberListBase,
  routeFavoriteMemberBase,
  routeFavoriteProductBase,
  routeG1Analysis,
  routeHelpCenter1Base,
  routeHelpCenter2Base,
  routeHelpCenter3Base,
  routeHomeBase,
  routeMakePinOfCirectSponsorTeamBase,
  routeMyAccountBase,
  routeMyOrderBase,
  routeMyOrderDetailBase,
  routeNearExpireMemberListBase,
  routeNewPinOfCirectSponsorTeamBase,
  routeNewRegisterUpdateSuExSteamBase,
  routeNewsArticleBase,
  routeNewsArticleDetailBase,
  routeNotFoundBase,
  routeNotesBase,
  routeNotificationBase,
  routeOrganizationChart,
  routePointTopupBase,
  routeProductDetailBase,
  routeProductsBase,
  routeProductsListing,
  routePvHistoryReportBase,
  routeQaCodePublicBase,
  routeReferrallinkBase,
  routeReportAnalysisBase,
  routeReviewProductBase,
  routeSecurityBase,
  routeSeeAllProductBase,
  routeSettingsBase,
  routeSettingsEditBase,
  routeSignin2faBase,
  routeSigninBase,
  routeSigninMemberId,
  routeSigninPhoneNumber,
  routeSignupBase,
  routeSponsorBase,
  routeSponsorChart,
  routeSponsoredUserHistoryBase,
  routeTrackingOrderBase,
  routeTransferBmcPvPointBase,
  routeTransferBmcPvPointHistoryBase,
  routeTravelPVHistoryBase,
  routeTripProcess,
} from "src/constants/routes";
import { AppContextProvider } from "src/contexts";
// import { getCategories } from "src/feature/categories/category.slice";
import { resetStateCheckout } from "src/feature/checkout/slice";
import { fetchCheckoutGetListAddress } from "src/feature/checkout/action";
import {
  // getPopularKeyWords,
  updateKeySort,
  updateSearchValue,
} from "src/feature/searching/searching.slice";
import { pushNotification } from "src/feature/notifications/notification.slice";
import {
  fetchCountNotificationUnread,
  fetchGetTopic,
} from "src/feature/notifications/notification.action";
import { loadListProducts } from "src/feature/shopping-cart/slice";
import { fetchPostProductInCart } from "src/feature/shopping-cart/action";
import { resetState } from "src/feature/signup/slice";
import { fetchPoints, fetchUserInformation } from "src/feature/user/action";
import useLoggedIn from "src/hooks/useLoggedIn";
import axiosCutome from "src/lib/client/request";
import {
  initializeAnalytics,
  subscribeToTopic,
  unSubscribeToTopic,
} from "src/lib/firebase/clientApp";
import General from "src/modules/general";
import { RootState, store } from "src/state/store";
import { theme } from "src/theme";
import "styles/tailwind.css";
import { updatePreUrl } from "src/feature/user/slice";
import ConfigAxios from "src/feature/signin/sign-in-slice";

import { getCategoriesDispatch } from "src/feature/categories/category.action";
import { getPopularKeyWordsDispatch } from "src/feature/searching/searching.actions";

const ECOM_APP_PATHS = new Set([
  routeHomeBase,
  routeSigninBase,
  routeSignupBase,
  routeSigninMemberId,
  routeProductsBase,
  routeSigninPhoneNumber,
  routeCheckoutPointTopupBase,
  routeCartBase,
  routeReviewProductBase,
  routeCheckoutBase,
  routeProductDetailBase,
  routeHelpCenter1Base,
  routeHelpCenter2Base,
  routeHelpCenter3Base,
  routeAddressBookBase,
  routeFavoriteProductBase,
  routeProductsListing,
  routeMyOrderBase,
  routeMyOrderDetailBase,
  routeMyAccountBase,
  routePointTopupBase,
  routeSponsorBase,
  routeSponsoredUserHistoryBase,
  routeConfirmPointTopupBase,
  routeTrackingOrderBase,
  routeCreateAddressFormBase,
  routeEditAddressFormBase,
  routeSignin2faBase,
  routeSecurityBase,
  routeReferrallinkBase,
  routeCheckoutSuccessBase,
  routeAccountBase,
  routeSeeAllProductBase,
  routeQaCodePublicBase,
  routeNotFoundBase,
  routeTransferBmcPvPointBase,
  routeTransferBmcPvPointHistoryBase,
  routeEcommissionStatementBase,
  routeReportAnalysisBase,
  routeSettingsBase,
  routeSettingsEditBase,
  routeNotificationBase,
  routeNewsArticleBase,
  routeNewsArticleDetailBase,
  routeNotesBase,
  routeAccountQRCodeBase,
  routeAccountMemberProfileBase,
  routeDirectSponsorAnalysisBase,
  routeCreateNoteBase,
  routeCycleAndFOBReportBase,
  routeCycleHistoryReportBase,
  routeEditNoteBase,
  routeTravelPVHistoryBase,
  routeG1Analysis,
  routeTripProcess,
  routeCommissionReportBase,
  routeExpiredMemberListBase,
  routeNearExpireMemberListBase,
  routePvHistoryReportBase,
  routeNewPinOfCirectSponsorTeamBase,
  routeMakePinOfCirectSponsorTeamBase,
  routeNewRegisterUpdateSuExSteamBase,
  routeFavoriteMemberBase,
  routeOrganizationChart,
  routeSponsorChart,
]);

const SMALL_CART_PATHS = new Set([
  routeHomeBase,
  routeProductsBase,
  routeProductDetailBase,
  routeProductsListing,
]);

export const AUTH_PATH = new Set([
  routeCheckoutBase,
  routeAddressBookBase,
  routeMyOrderBase,
  routeMyOrderDetailBase,
  routeMyAccountBase,
  routeEditAddressFormBase,
  routeSignin2faBase,
  routeSecurityBase,
  routeReferrallinkBase,
  routeCheckoutSuccessBase,
  routeAccountBase,
  routeQaCodePublicBase,
  routeFavoriteProductBase,
  routeSponsorBase,
  routeSponsoredUserHistoryBase,
  routeTransferBmcPvPointBase,
  routeTransferBmcPvPointHistoryBase,
  routeReportAnalysisBase,
  routeNotificationBase,
  routeEcommissionStatementBase,
  routeDirectSponsorAnalysisBase,
  routeCycleAndFOBReportBase,
  routeCycleHistoryReportBase,
  routeEditNoteBase,
  routeEditNoteBase,
  routeCommissionReportBase,
  routePvHistoryReportBase,
  routeNewPinOfCirectSponsorTeamBase,
  routeMakePinOfCirectSponsorTeamBase,
  routeNewRegisterUpdateSuExSteamBase,
  routeFavoriteMemberBase,
  routeOrganizationChart,
  routeSponsorChart,
  routeSettingsBase,
]);

/**
 * Pass in `appBgColor` from page's `getServerSideProps` to change background color
 *
 * Pass in `hero` as `string[]` to add hero banner
 */

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const isEcomApp = ECOM_APP_PATHS.has(router.pathname);
  const hasSmallCart = SMALL_CART_PATHS.has(router.pathname);
  const { lang } = useTranslation("common");
  const currUrl = store.getState().user.currUrl;

  useEffect(() => {
    axiosCutome.defaults.headers.lang = lang;
    ConfigAxios.defaults.headers.lang = lang;
  }, [lang]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
    const firebaseCall = async () => {
      await initializeAnalytics();
    };
    firebaseCall();
  }, []);

  useEffect(() => {
    const newState = localStorage.getItem("stateCheckout");
    if (newState && ![routeCheckoutBase, routeCreateAddressFormBase].includes(router.pathname)) {
      localStorage.removeItem("stateCheckout");
    }
    const newStateSignUp = localStorage.getItem("stateSignUp");
    if (newStateSignUp && router.pathname !== routeSignupBase) {
      localStorage.removeItem("stateSignUp");
    }
  }, [router.pathname]);

  useEffect(() => {
    const asPath = router.asPath;
    if (currUrl !== asPath) {
      store.dispatch(updatePreUrl(asPath));
    }
  }, [router, currUrl]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
        />
        <link rel="shortcut icon" href="/favicon.ico"></link>
      </Head>
      <NextSeo title="SCM" description="SCM Connext - Drive to Your Success" />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppContextProvider
            initNotification={{
              message: "This text is read from context.notification ",
            }}
          >
            {isEcomApp ? (
              <ECommerceApp
                Component={Component}
                pageProps={pageProps}
                router={router}
                hasSmallCart={hasSmallCart}
              />
            ) : (
              <Component {...pageProps} />
            )}
            <General />
          </AppContextProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}
type ECommerceAppProps = Pick<AppProps, "Component" | "pageProps" | "router"> & {
  hasSmallCart: boolean;
};
function ECommerceApp({ Component, pageProps, router, hasSmallCart }: ECommerceAppProps) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useLoggedIn();
  const [cookiesObject] = useCookies();



  useEffect(() => {
    const member = cookiesObject.member;
    if (isLoggedIn && member) {
      dispatch(fetchUserInformation());
      dispatch(fetchCheckoutGetListAddress());
      dispatch(fetchCountNotificationUnread());
    }
    dispatch(loadListProducts());
    dispatch(fetchPostProductInCart());
  }, [dispatch, isLoggedIn, cookiesObject]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchGetTopic());
    }
  }, [dispatch, isLoggedIn]);

  const { topic, notifyStatus } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    if (notifyStatus) {
      const handlePushNotify = () => dispatch(pushNotification());
      subscribeToTopic(topic, handlePushNotify);
    } else if (topic) {
      unSubscribeToTopic(topic);
    }
  }, [dispatch, notifyStatus, topic]);

  useEffect(() => {
    if (isLoggedIn && PathnameGetPoints.has(router.pathname)) {
      dispatch(fetchPoints());
    }
  }, [dispatch, isLoggedIn, router.pathname]);

  useEffect(() => {
    if (isLoggedIn && PathnameGetAccountInfor.has(router.pathname)) {
      dispatch(fetchUserInformation());
    }
  }, [dispatch, isLoggedIn, router.pathname]);

  useEffect(() => {
    dispatch(getCategoriesDispatch());
    dispatch(getPopularKeyWordsDispatch());
  }, [dispatch]);

  useEffect(() => {
    if (router.pathname !== routeSignupBase) {
      dispatch(resetState());
    }
    if (![routeCheckoutBase, routeCreateAddressFormBase].includes(router.pathname)) {
      dispatch(resetStateCheckout());
    }
  }, [dispatch, router.pathname]);

  const categories = useSelector((state: RootState) => state.categoriesState.categories);
  const { popularKeyWords } = useSelector((state: RootState) => state.searchValue);

  const updateSearch = (value: string) => {
    dispatch(updateSearchValue(value));
  };

  const resetKeySort = () => {
    dispatch(updateKeySort(""));
  };


  return (
    <>
      <div
        className={classnames(
          "bg-white font-kanit bg-opacity-50 text-black-light",
          pageProps.appBgColor,
        )}
      >
        <div
          className={classnames(pageProps.appClassName || "mx-auto app lg:px-0 flex flex-col")}
          style={{ minHeight: "100vh" }}
        >
          <Header
            categories={categories}
            popularKeyWords={popularKeyWords}
            updateSearchValue={updateSearch}
            resetKeySort={resetKeySort}
          />
          <div className="body flex-grow">
            <Component {...pageProps} router={router} />
          </div>
          <Footer hasSmallCart={hasSmallCart} />
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

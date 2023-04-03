import ArrowRightNavigation from "@material-ui/icons/ChevronRight";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  routeAddressBookBase,
  routeCreateNoteBase,
  routeFavoriteMemberBase,
  routeFavoriteProductBase,
  routeHelpCenter1Base,
  routeHelpCenter2Base,
  routeHelpCenter3Base,
  routeMyAccountBase,
  routeMyOrderBase,
  routeNewsArticleBase,
  routeNotesBase,
  routeNotificationBase,
  routeOrganizationChart,
  routePointTopupBase,
  routeReportAnalysisBase,
  routeReviewProductBase,
  routeSecurityBase,
  routeSettingsBase,
  routeSigninUrl,
  routeSponsorBase,
  routeTransferBmcPvPointBase,
} from "src/constants/routes";
import { setHidenContent } from "src/feature/security/security.slice";
import useLoggedIn from "src/hooks/useLoggedIn";
import { RootState } from "src/state/store";
import { useLocationBase } from "src/hooks";

import DialogCustome from "../dialog";
import {
  AccountInfoIcon,
  AddressBook,
  AnalysisIcon,
  ArrowBackNavigation,
  HeartIcon,
  HelpCenterIcon,
  MyOrderNavigationIcon,
  NoteIcon,
  NotificationsIcon,
  OrganizationIcon,
  PointTopupIcon,
  SecurityIcon,
  SettingIcon,
  SponsorIcon,
  TripPromotion,
} from "../svg";
import cls from "./index.module.css";

export function LeftNavination({
  handleCloseNavigation,
  handleClickReport,
  inHeader = false,
  isMobile = false,
}: {
  handleCloseNavigation?: () => void;
  handleClickReport?: () => void;
  inHeader?: boolean;
  isMobile?: boolean;
}) {
  const { t } = useTranslation("common");
  const [openModalSignIn, setopenModalSignIn] = useState(false);
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const { isLoggedIn } = useLoggedIn();
  const { countUnreadCommon } = useSelector((state: RootState) => state.notification);
  const [modalTitle, setModalTitle] = useState<string>("");
  const { locationBase } = useLocationBase();

  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = (url: string, requiredLogin?: boolean, requiredLocation?: boolean) => () => {
    if (!isLoggedIn && requiredLogin) {
      setModalTitle(t`sign_in_to_use`);
      return setopenModalSignIn(true);
    }
    if (requiredLocation && locationBase !== "Thailand") {
      setModalTitle(t`only_in_thailand`);
      handleCloseNavigation?.();
      return setOpenModalLocation(true);
    }
    handleCloseNavigation?.();
    router.push(url);
    handleCloseNavigation?.();
  };

  const handleClickSecurity = () => {
    dispatch(setHidenContent(true));
    handleClick(routeSecurityBase, true)();
  };

  const handleCloseModal = () => {
    setopenModalSignIn(false);
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    handleCloseNavigation?.();
    router.push(routeSigninUrl);
  };

  return (
    <div
      className={`${cls.container} ${isMobile ? "w-auto" : "w-60"} ${
        inHeader ? "block" : "hidden sm:block"
      }`}
    >
      <div
        className={`flex justify-between items-center cursor-pointer ${cls.item} ${
          router.route.startsWith(routeMyOrderBase) ? "text-orange" : ""
        } ${router.route.startsWith(routeReviewProductBase) ? "text-orange" : ""}`}
        onClick={handleClick(routeMyOrderBase, true)}
      >
        <div className="flex justify-start">
          <div className="w-10">
            <MyOrderNavigationIcon />
          </div>
          <div>{t`my-order`}</div>
        </div>
        <ArrowRightNavigation className="text-inherit" />
      </div>
      <div
        className={`flex justify-between items-center cursor-pointer ${cls.item} ${
          router.route.startsWith(routeMyAccountBase) ? "text-orange" : ""
        }`}
        onClick={handleClick(routeMyAccountBase, true)}
      >
        <div className="flex justify-start">
          <div className="w-10">
            <AccountInfoIcon />
          </div>
          <div>{t`account_info`}</div>
        </div>
        <ArrowRightNavigation className="text-inherit" />
      </div>
      <div
        className={`flex cursor-pointer justify-between items-center ${cls.item}  ${
          router.route.startsWith(routeAddressBookBase) ? "text-orange" : ""
        }`}
        onClick={handleClick(routeAddressBookBase, true)}
      >
        <div className="flex justify-start">
          <div className="w-10">
            <AddressBook />
          </div>
          <div>{t`address_book`}</div>
        </div>
        <ArrowRightNavigation />
      </div>
      <div
        className={`flex justify-between items-center cursor-pointer ${cls.item} ${
          router.route.startsWith(routeFavoriteProductBase) ? "text-orange" : ""
        }`}
        onClick={handleClick(routeFavoriteProductBase, true)}
      >
        <div className="flex justify-start">
          <div className="w-10">
            <HeartIcon width="18" height="16.734" viewBox="0 0 16.734 22.777" />
          </div>
          <div>{t`favorite-product`}</div>
        </div>
        <ArrowRightNavigation />
      </div>
      <div className={`flex justify-between items-center ${cls.item}`}>
        <div className="border-lightestGray border-t w-full"></div>
      </div>

      <div
        className={`flex justify-between items-center cursor-pointer ${cls.item} ${
          router.route.startsWith(routeSettingsBase) ? "text-orange" : ""
        }`}
        onClick={handleClick(routeSettingsBase, true)}
      >
        <div className="flex justify-start">
          <div className="w-10">
            <SettingIcon />
          </div>
          <div>{t`settings`}</div>
        </div>
        <ArrowRightNavigation />
      </div>


      <DialogCustome
        open={openModalSignIn}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
      >
        <div className="text-center mb-8 mt-6 text-sm">{modalTitle}</div>
      </DialogCustome>
      <DialogCustome
        open={openModalLocation}
        handleConfirm={() => setOpenModalLocation(false)}
        buttonConfirmTite={t`ok`}
      >
        <div className="text-center mb-8 mt-6 text-sm">{modalTitle}</div>
      </DialogCustome>
    </div>
  );
}

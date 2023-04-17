/* eslint-disable indent */
import { MenuItem, Popover } from "@material-ui/core";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { routeProfile } from "src/constants/routes";
import { RootState } from "src/store";
import { authenticationService } from "src/store/authentication.slice";
import { unSubscribeToTopic } from "src/lib/firebase/clientApp";
import Breadcrumb from "../breadcrumb";
import { ClockBlack, EmailBlack, LogoConnext, LogoSuccessMore, SignoutIcon } from "../icons";
// import { Logo } from "../svg";
import NotifyBell from "./notify";
import "./styles.css";
// import { getUserById } from "src/store/internal-user.slice";
import { authorizedRequest } from "src/lib/request";
import { signOut } from "src/services/authentication.services";
import { execute } from "src/lib/execute";
import { Modal } from "../portal/modal";
import { getDetailInternalUserAction } from "src/store/internal-user.action";

interface HeaderProps {
  isLoggedIn: boolean;
}

export function Header({ isLoggedIn }: HeaderProps) {
  const isLogin = React.useMemo(
    () => isLoggedIn,
    [JSON.parse(localStorage.getItem("token") || "{}").jwtAccessToken],
  );
  return <>{isLogin ? <HeaderLogged /> : <HeaderNotLoggedIn />}</>;
}

function HeaderNotLoggedIn() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModalContact, setOpenModalContact] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation("common");
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    authorizedRequest.setLanguage(lng);
    execute.defaults.headers.lang = lng;
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showMenuSelectLanguage = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenModal = () => {
    setOpenModalContact(true);
  };

  const closeModal = () => {
    setOpenModalContact(false);
  };

  return (
    <div className="w-full">
      <div className="large:w-2/3 m-auto flex justify-between items-center header-not-logged-in">
        <div className="flex">
          <p className="txt-dashboard font-medium text-rose-700">{t`admin-dashboard`}</p>
        </div>
        <div></div>
      </div>
      {/* <div className="w-full bg-orange-light h-24"></div> */}
      <Modal
        isOpen={openModalContact}
        onClose={closeModal}
        className="w-96 h-auto rounded-2xl font-kanit"
      >
        <ul className="text-center">
          <li className="mt-6 mb-4 text-xl text-it-support">{t`it_support_contact`}</li>
          <li className="w-64 mx-auto text-sm mb-5 text-it-support">{t`please_contact_it_support`}</li>
          <LogoSuccessMore className="mx-auto mb-5" />
          <li className="flex flex-wrap justify-center mb-2.5">
            <img
              src="/assets/images/country/thailand.svg"
              alt="thaiLang"
              className="w-5 h-5 mr-2 mt-0.5"
            />{" "}
            <span className="text-lg">+66 (0) 81 - 144 - 5263</span>
          </li>
          <li className="text-center text-sm">
            <div className="items-center flex justify-center mb-8">
              <EmailBlack />
              <span className="text-lg text-email">chatchai.b@successmore.com</span>
            </div>
          </li>
          <li className="text-center mb-8 text-sm">
            <div className="items-center flex justify-center">
              <ClockBlack />
              <span className="text-sm text-email">
                {t`monday`} {t`to`} {t`friday`}
                {" 11:00am - 19:00pm"}
              </span>
            </div>
          </li>
        </ul>
      </Modal>
    </div>
  );
}

function HeaderLogged() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t, i18n } = useTranslation("common");
  const { urlUser } = useSelector((state: RootState) => state.internalUsers);
  const { topic } = useSelector((state: RootState) => state.notification);

  const getDataInternalUser = React.useCallback(() => {
    if (JSON.parse(localStorage.getItem("token") || "{}").jwtAccessToken) {
      dispatch(getDetailInternalUserAction(JSON.parse(localStorage.getItem("token") || "{}")._id));
    }
  }, []);

  React.useEffect(() => {
    getDataInternalUser();
  }, [getDataInternalUser]);

  async function handleLogout(event: React.FormEvent<HTMLElement>) {
    if (topic) {
      await unSubscribeToTopic(topic);
    }
    signOut().then((res) => {
      dispatch(authenticationService.logout);
    });
  }

  const changeLanguage = (lng: string) => {
    handleClose();
    i18n.changeLanguage(lng);
    authorizedRequest.setLanguage(lng);
    execute.defaults.headers.lang = lng;
  };

  const information = React.useMemo(() => {
    return {
      firstName: JSON.parse(localStorage.getItem("token") || "{}").firstName,
      lastName: JSON.parse(localStorage.getItem("token") || "{}").lastName,
      avatar: JSON.parse(localStorage.getItem("token") || "{}").avatarUrl,
    };
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showMenuSelectLanguage = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="shadow-headerSignIn fixed z-50 bg-white flex justify-between items-center px-5 header-logged">
      <Breadcrumb />
      <div className="flex items-center">



        <button className="flex" type="button" onClick={handleLogout}>
          <SignoutIcon className="mr-2" />
          <p>{t`signout`}</p>
        </button>
      </div>
      <Popover
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableScrollLock={true}
      >
        <MenuItem onClick={() => changeLanguage("th")}>
          <img src="/assets/images/country/thailand.svg" alt="thaiLang" className="w-4 h-4 mr-2" />
          {t`thai`}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("en")}>
          <img
            src="/assets/images/country/united-states.svg"
            alt="thaiLang"
            className="w-4 h-4 mr-2"
          />
          {t`english`}
        </MenuItem>
      </Popover>
    </div>
  );
}

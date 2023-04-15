import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { GroupBack } from "../svg";

interface PropsNavbar {
  goBackLink?: string;
  isAuth?: boolean;
  children?: React.ComponentPropsWithRef<"div">;
  ChangePasswordDeleteToken?: () => void;
}

export function Navbar({
  goBackLink,
  isAuth,
  children,
  ChangePasswordDeleteToken,
  ...rest
}: PropsNavbar) {
  const { t } = useTranslation("common");

  const history = useHistory();
  function goBackSignIn() {
    history.push(`${goBackLink}`);
    ChangePasswordDeleteToken && ChangePasswordDeleteToken();
  }
  return (
    <>
      {isAuth && goBackLink ? (
        <div className="w-full navbar-gradient h-24 top-20" {...rest}>
          <div className="h-24 -mt-24 w-2/3 m-auto flex justify-between items-center">
            <div role="button" onClick={goBackSignIn}>
              <GroupBack className="float-left" />
              <span className="text-white font-medium text-xl pl-7">{t`go-back`}</span>
            </div>
          </div>
        </div>
      ) : null}

      {isAuth && !goBackLink ? <div className="navbar-gradient h-24 w-full"></div> : null}

      {!isAuth && !goBackLink ? <div>{children}</div> : null}

      {!isAuth && goBackLink ? <div>{children}</div> : null}
    </>
  );
}

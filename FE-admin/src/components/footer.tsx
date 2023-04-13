import { useTranslation } from "react-i18next";

interface FooterProps {
  isLoggedIn: boolean;
}

export function Footer({ isLoggedIn }: FooterProps) {
  const { t } = useTranslation("common");

  return (
    <div className="w-full wide:relative medium:float-left">
      <div className={`${isLoggedIn ? "pl-5" : "w-2/3 "} m-auto flex justify-between`}>
        <span
          className={`${
            isLoggedIn ? "" : ""
          } wide:absolute medium:float-left medium:mr-4 -top-2 left=0 text-lg text-gray-primary`}
        >{t`footer-©-2021-Successmore`}</span>
        <p
          className={`wide:absolute medium:float-left -top-2 ${
            isLoggedIn ? "right-5" : "right-52"
          } text-base text-gray-primary`}
        >
          <a
            href="https://scmconnext.com/help-center-3/61b0a00816657045a987b643"
            className="cursor-pointer"
            target={"_blank"}
            rel="noreferrer"
          >{t`privacy_policy`}</a>{" "}
          |{" "}
          <a
            href="https://scmconnext.com/help-center-3/61b09e84e49b5a2cfdf1b5cc"
            className="cursor-pointer"
            target={"_blank"}
            rel="noreferrer"
          >{t`terms_and_conditions`}</a>{" "}
          |{" "}
          <a
            href="https://scmconnext.com/help-center-3/61bb01e6ff262ae97ea18498"
            className="cursor-pointer"
            target={"_blank"}
            rel="noreferrer"
          >{t`licensing_policy`}</a>
        </p>
      </div>
    </div>
  );
}

import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HeaderSignIn, PageLayout } from "src/components";
// import { notifyToast } from "src/constants/toast";
import { updateScreen } from "src/feature/update-account-infor/slice";
import MyAccount from "src/modules/account";
import { RootState } from "src/state/store";
import { getCookieFromReq } from "src/utils";
import { ModalUserSummaryInfo } from "src/components/user-summary";

export default function AccountInformationPage() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const { screen } = useSelector((state: RootState) => state.updateAccountInfor);

  const handleChangeScreen = (val: string) => {
    dispatch(updateScreen(val));
  };

  const handleClickBack = () => {
    if (screen === "otp") {
      return handleChangeScreen("phone");
    }
    if (!screen) {
      return router.back();
      // notifyToast("default", "Coming soon");
    }

    return handleChangeScreen("");
  };
  const title: string = useMemo(() => {
    if (screen === "infor") {
      return t`update_account_info`;
    }
    if (screen === "images") {
      return t`update_uploaded_documents`;
    }

    return t`account_info`;
  }, [screen, t]);

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`account_info`} />
      <main>
        <HeaderSignIn
          title={title}
          onClickBack={handleClickBack}
          userInfo={<ModalUserSummaryInfo showIconSetting />}
        />
        <PageLayout>
          <MyAccount />
        </PageLayout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie;
  const { cookies } = req;
  let token;
  if (cookie) {
    token = getCookieFromReq(cookie, "token") || cookies.token;
  }
  if (!token) {
    return {
      redirect: {
        permanent: true,
        destination: "/signin",
      },
    };
  }

  return {
    props: {},
  };
};

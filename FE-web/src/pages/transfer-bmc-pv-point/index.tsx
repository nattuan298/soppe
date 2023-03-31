import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { HeaderSignIn, PageLayout } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import { routeAccountBase, routeTransferBmcPvPointHistoryBase } from "src/constants/routes";
import axios from "src/lib/client/request";
import BMCPvPoint from "src/modules/bmc_pv_point";
import { MyOrderType } from "src/modules/my-orders";
import { getCookieFromReq } from "src/utils";

export default function TransferBMCPointPage(props: MyOrderType) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [showTransferForm, setshowTransferForm] = useState(false);

  const onClickHistory = () => {
    router.push(routeTransferBmcPvPointHistoryBase);
  };

  const onClickBack = () => {
    if (showTransferForm) {
      return setshowTransferForm(false);
    }
    router.push(routeAccountBase);
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`transfer_BMC_PV_point`} />
      <main>
        <HeaderSignIn
          title={t`transfer_BMC_PV_point`}
          iconHistory
          onClickHistory={onClickHistory}
          onClickBack={onClickBack}
        />
        <PageLayout>
          <BMCPvPoint
            {...props}
            showTransferForm={showTransferForm}
            setshowTransferForm={setshowTransferForm}
          />
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
        permanent: false,
        destination: "/signin",
      },
    };
  }

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  let orders: {} = [];
  let total: number = 0;

  try {
    const api = `${apiRoute.orders.listOrders}?transferBMC=true&page=1&pageSize=10`;
    const ress = await axios.get(api);

    orders = ress.data.data;
    total = ress.data.total;
  } catch (e) {}

  return {
    props: {
      orders,
      total,
    },
  };
};

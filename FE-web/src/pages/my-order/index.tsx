import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import MyOrders, { MyOrderType } from "src/modules/my-orders";
import { getCookieFromReq } from "src/utils";

export default function MyOrderPage(props: MyOrderType) {
  const { t } = useTranslation("common");
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`my-order`} />
      <main>
        <HeaderSignIn title={t`my-order`} />
        <PageLayout>
          <MyOrders {...props} />
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
    const ress = await axios.get(`${apiRoute.orders.listOrders}?page=1&pageSize=10`);
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

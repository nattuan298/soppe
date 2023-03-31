import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import OrderDetail from "src/modules/order-detail";
import { routeMyOrderBase } from "src/constants/routes";
import { getCookieFromReq } from "src/utils";
import { OrderDetailType } from "types/orders";
import { useRouter } from "next/router";

export default function OrderDetailPage({ order }: { order: OrderDetailType }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const onClickBack = () => {
    return router.push(routeMyOrderBase);
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`order_detail`} />
      <main>
        <HeaderSignIn title={t`order_detail`} onClickBack={onClickBack} />
        <PageLayout>
          <OrderDetail isOrderDetail order={order} />
        </PageLayout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
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
  let order: OrderDetailType | null = null;
  if (params) {
    try {
      const ress = await axios.get(`${apiRoute.orders.listOrders}/${params.id}`);

      order = ress.data;
    } catch (e) {
      console.error("Eror fetch api detail");
    }
  }

  if (order) {
    return {
      props: {
        order,
      },
    };
  }

  return {
    redirect: {
      permanent: true,
      destination: "/404",
    },
  };
};

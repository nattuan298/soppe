import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HeaderSignIn, PageLayout } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import { routeHomeUrl, routeMyOrderUrl } from "src/constants/routes";
import axios from "src/lib/client/request";
import OrderDetail from "src/modules/order-detail";
import { getCookieFromReq } from "src/utils";
import { OrderDetailType } from "types/orders";

export default function SignupPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetailType | undefined>();

  const { orderId } = router.query;

  const backStep = () => {
    router.push(routeMyOrderUrl);
  };

  useEffect(() => {
    if (order) {
      return;
    }
    if (!orderId) {
      router.push(routeHomeUrl);
    } else {
      try {
        const callApi = async () => {
          const response = await axios.get(`${apiRoute.orders.listOrders}/${orderId}`);
          setOrder(response.data);
        };

        callApi();
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`order_confirmation`} />
      <main>
        <HeaderSignIn title={t`order_confirmation`} onClickBack={backStep} />
        <PageLayout>
          <OrderDetail order={order} />
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

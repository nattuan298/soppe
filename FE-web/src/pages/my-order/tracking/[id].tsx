import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import TrackingOrder from "src/modules/my-orders/tracking-order";
import { getCookieFromReq } from "src/utils";
import axios from "src/lib/client/request";
import { OrderTrackingType } from "types/orders";
import { apiRoute } from "src/constants/apiRoutes";
import { useCallback, useEffect, useState } from "react";
import { routeMyOrderBase } from "src/constants/routes";
import { useRouter } from "next/router";

export default function TrackingOrderPage({ id }: { id?: string }) {
  const { t, lang } = useTranslation("common");
  const [tracking, setTracking] = useState<OrderTrackingType | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onClickBack = () => {
    return router.push(routeMyOrderBase);
  };

  const callAPI = useCallback(async () => {
    try {
      axios.defaults.headers.lang = lang;
      const ress = await axios.get(`${apiRoute.admin.tracking}/${id}`);
      setTracking(ress.data);
    } catch (e) {
      setError(true);
      console.error("Eror fetch api detail", e);
    }
  }, [id, lang]);

  useEffect(() => {
    callAPI();
  }, [callAPI]);

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`order_tracking`} />
      <main>
        <HeaderSignIn title={t`order_tracking`} onClickBack={onClickBack} />
        <PageLayout>
          <TrackingOrder tracking={tracking} isError={error} />
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
        permanent: true,
        destination: "/signin",
      },
    };
  }

  return {
    props: {
      id: params?.id,
    },
  };
};

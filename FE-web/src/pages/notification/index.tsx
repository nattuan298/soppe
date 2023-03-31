import { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { HeaderSignIn, LeftNavination, PageLayout } from "src/components";
import { getCookieFromReq } from "src/utils";
import ViewNotification from "src/modules/notification";
import {
  readNotification,
  readPageNotification,
} from "src/feature/notifications/notification.slice";

import {
  fetchCountNotificationUnread,
  fetchPageNotifications,
} from "src/feature/notifications/notification.action";
import { RootState } from "src/state/store";

export default function SecurityPage() {
  const { t } = useTranslation("common");
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const dispatch = useDispatch();

  const { notificationPage, loadingPage } = useSelector((state: RootState) => state.notification);

  const { data, total } = notificationPage;

  const router = useRouter();

  const handleBack = () => {
    router.push("/my-account");
  };

  const handleSearch = (value: string) => {
    if (keyword !== value.trim()) {
      setKeyword(value.trim());
      setPage(1);
    }
  };

  const handleChangeCategory = (value: string) => {
    if (value !== category) {
      setCategory(value);
      setPage(1);
    }
  };

  const handleReadNotification = async (id: string) => {
    const response = await readNotification(id);
    if (response.status === 204) {
      dispatch(readPageNotification(id));
      dispatch(fetchCountNotificationUnread());
    }
  };

  useEffect(() => {
    const fetchData = () => {
      const params = { page, pageSize: 20, category, keyword };
      dispatch(fetchPageNotifications(params));
    };
    fetchData();
  }, [dispatch, keyword, page, category]);

  const getMoreNotifications = async () => {
    setPage((page) => page + 1);
  };

  const hasMore = useMemo(() => data.length < total, [data, total]);

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`notification`} />
      <main>
        <HeaderSignIn
          search
          title={t`notification`}
          onClickBack={handleBack}
          handleSearch={handleSearch}
        />
        <PageLayout className="mx-auto w-full sm:w-1216 mb-8 sm:mt-6 flex relative">
          <div className="sm:w-1/4 sm:block hidden mr-6">
            <LeftNavination />
          </div>
          <div className="w-full max-w-950">
            <ViewNotification
              fulldetail
              category={category}
              hasMore={hasMore}
              notifications={data}
              loading={loadingPage}
              getMoreNotifications={getMoreNotifications}
              handleChangeCategory={handleChangeCategory}
              handleReadNotification={handleReadNotification}
            />
          </div>
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

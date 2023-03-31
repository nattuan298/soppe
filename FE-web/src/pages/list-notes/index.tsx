import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { getCookieFromReq } from "src/utils";
import { NoteListModule } from "src/modules/notes/notes-list/index";
import { routeAccountBase } from "src/constants/routes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNoteListDispatch } from "../../feature/notes/notes.actions";

export default function NoteList() {
  const my_date = new Date();
  const { t } = useTranslation("common");
  const router = useRouter();
  const [searchKey, setSearchKey] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(
    new Date(my_date.getFullYear(), my_date.getMonth(), 1),
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0, 23, 59, 59),
  );
  const [status, setStatus] = useState<string | undefined>("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getNoteListDispatch({
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        keyword: searchKey,
        status,
      }),
    );
  }, [dispatch, endDate, searchKey, startDate, status]);
  const handleBack = () => {
    router.push(routeAccountBase);
  };
  return (
    <div className="w-full">
      <NextSeo title={t`note`} />
      <main>
        <HeaderSignIn
          title={t`note`}
          onClickBack={handleBack}
          search
          handleSearch={(value) => setSearchKey(value)}
        />
        <PageLayout>
          <NoteListModule
            searchKey={searchKey}
            startDate={startDate}
            endDate={endDate}
            status={status}
            setSearchKey={setSearchKey}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setStatus={setStatus}
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

  return {
    props: {},
  };
};

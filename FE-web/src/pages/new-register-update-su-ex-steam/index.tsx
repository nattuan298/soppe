import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { HeaderSignIn, PageLayout } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import { notifyToast } from "src/constants/toast";
import axios from "src/lib/client/request";
import NewRegisterUpdateSuExSteam from "src/modules/ecommission/new-register-update-su-ex-steam";
import { generateArrayOfYears, getCookieFromReq } from "src/utils";
import { NewRegisterEachType } from "types/api-response-type";

const years = generateArrayOfYears();

export default function NewRegisterUpdateSuExSteamPage() {
  const { t } = useTranslation("common");
  const [year, selectYear] = useState(dayjs().get("year"));
  const [list, setList] = useState<NewRegisterEachType[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectDateRange = (val: number) => {
    selectYear(val);
  };

  useEffect(() => {
    const callAPI = async () => {
      setLoading(true);
      try {
        const api = `${apiRoute.members.newRegister}?key_search=${year}`;
        const res = await axios.get(api);

        setList(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const message = e.response?.data?.message;
        message && notifyToast("error", message);
      }
      setLoading(false);
    };
    callAPI();
  }, [year]);

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`new_register_update_su_ex_s_team`} />
      <main>
        <HeaderSignIn
          title={t`new_register_update_su_ex_s_team`}
          showSelectYear
          handleSelectYear={handleSelectDateRange}
          year={year}
          optionsYear={years}
        />
        <PageLayout>
          <NewRegisterUpdateSuExSteam list={list} loading={loading} />
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

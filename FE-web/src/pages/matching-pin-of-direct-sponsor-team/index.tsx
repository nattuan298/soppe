import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { HeaderSignIn, PageLayout } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import { notifyToast } from "src/constants/toast";
import axios from "src/lib/client/request";
import MakePinOfDirectSponsorTeam from "src/modules/ecommission/matching_pin_of_direct_sponsor_team";
import { generateArrayOfYears, getCookieFromReq } from "src/utils";
import { NewPinSponsorType } from "types/api-response-type";

const years = generateArrayOfYears();

export default function MakePinOfDirectSponsorTeamPage() {
  const { t } = useTranslation("common");
  const [year, selectYear] = useState(dayjs().get("year"));
  const [list, setList] = useState<NewPinSponsorType[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [header, setHeader] = useState<string[]>([]);

  const handleSelectDateRange = (val: number) => {
    selectYear(val);
  };

  useEffect(() => {
    const callAPI = async () => {
      setLoading(true);
      try {
        const api = `${apiRoute.members.matchingSponsor}?key_search=${year}`;
        const res = await axios.get(api);
        const data = res.data as NewPinSponsorType[];
        const headerRes = data.map((item) => item.posname);

        setList(res.data);
        setHeader(headerRes);
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
      <NextSeo title={t`matching_pin_of_direct_sponsor_team`} />
      <main>
        <HeaderSignIn
          title={t`matching_pin_of_direct_sponsor_team`}
          showSelectYear
          handleSelectYear={handleSelectDateRange}
          year={year}
          optionsYear={years}
        />
        <PageLayout>
          <MakePinOfDirectSponsorTeam list={list} loading={loading} header={header} />
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

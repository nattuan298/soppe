import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HeaderSignIn, PageLayout } from "src/components";
import { HelpCenter2 } from "src/modules/help-center/help-center-2";
import { fetchGetFAQList } from "../../feature/help-center/help-center-2/faqs.action";

export default function HelpCenter2Page() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const { id } = router.query;
  useEffect(() => {
    id && dispatch(fetchGetFAQList({ keyword: search.trim(), category: id }));
  }, [dispatch, search, id]);
  const handleBack = () => {
    router.push("/help-center-1");
  };
  const handleSearch = (value: string) => {
    setSearch(value);
  };
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`help-center`} />
      <main>
        <HeaderSignIn
          title={t`help-center`}
          onClickBack={handleBack}
          search
          handleSearch={handleSearch}
        />
        <PageLayout className="min-h-[647px] sm:min-h-0">
          <HelpCenter2 />
        </PageLayout>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

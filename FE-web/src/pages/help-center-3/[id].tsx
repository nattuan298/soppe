import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { HeaderSignIn, PageLayout } from "src/components";
import { HelpCenter3 } from "src/modules/help-center/help-center-3";
import { RootState } from "src/state/store";

export default function HelpCenter2Page() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { faqDetailData } = useSelector((state: RootState) => state.faqDetail);

  const handleBack = () => {
    faqDetailData?.category?._id && router.push(`/help-center-2/${faqDetailData.category?._id}`);
  };
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`help-center`} />
      <main>
        <HeaderSignIn title={t`help-center`} onClickBack={handleBack} />
        <PageLayout>
          <HelpCenter3 />
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

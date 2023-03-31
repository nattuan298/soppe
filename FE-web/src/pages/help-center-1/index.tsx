import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeHomeBase } from "src/constants/routes";
import { HelpCenter1 } from "src/modules/help-center/help-center-1";

export default function HelpCenter1Page() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeHomeBase);
  };
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`help-center`} />
      <main>
        <HeaderSignIn title={t`help-center`} onClickBack={handleBack} />
        <PageLayout>
          <HelpCenter1 />
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

import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeAddressBookBase } from "src/constants/routes";
import { AddressBookForm } from "src/modules/address-book/address-book-form";

export default function HelpCenter2Page() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeAddressBookBase);
  };
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`edit-address`} />
      <main>
        <HeaderSignIn title={t`edit-address`} onClickBack={handleBack} />

        <PageLayout>
          <AddressBookForm mode="edit" />
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

import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeAddressBookBase } from "src/constants/routes";
import { changeRedirectUrl } from "src/feature/user/slice";
import { AddressBookForm } from "src/modules/address-book/address-book-form";
import { RootState } from "src/state/store";

export default function ConfirmSCMPoint() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { urlRedirect } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleBack = () => {
    if (urlRedirect) {
      dispatch(changeRedirectUrl(""));
      return router.push(urlRedirect);
    }
    router.push(routeAddressBookBase);
  };
  return (
    <div className="w-full">
      <NextSeo title={t`add_new_address`} />
      <main>
        <HeaderSignIn title={t`add_new_address`} onClickBack={handleBack} />
        <PageLayout>
          <AddressBookForm mode="create" />
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

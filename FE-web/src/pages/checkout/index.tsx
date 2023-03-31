import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeHomeUrl } from "src/constants/routes";
import { clickBack } from "src/feature/checkout/slice";
import Checkout from "src/modules/checkout";
import { RootState } from "src/state/store";

export default function SignupPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const dispatch = useDispatch();

  const { mainStep } = useSelector((state: RootState) => state.checkout);

  const backStep = () => {
    if (mainStep === 0) {
      return router.back();
    }
    if (mainStep === 3) {
      router.push(routeHomeUrl);
      return;
    }
    dispatch(clickBack());
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={mainStep === 3 ? t`order_confirmation` : t`checkout`} />
      <main>
        <HeaderSignIn
          title={mainStep === 3 ? t`order_confirmation` : t`checkout`}
          onClickBack={backStep}
        />
        <PageLayout>
          <Checkout />
        </PageLayout>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

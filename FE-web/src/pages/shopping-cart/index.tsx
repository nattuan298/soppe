import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import ShoppingCart from "src/modules/shopping-cart";
import { useRouter } from "next/router";

export default function ShoppingCartPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const onClickBack = () => {
    return router.back();
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`shoppingCart`} />
      <main>
        <HeaderSignIn title={t`shoppingCart`} onClickBack={onClickBack} />
        <PageLayout>
          <ShoppingCart />
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

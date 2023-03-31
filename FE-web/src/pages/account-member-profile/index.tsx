import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import { AccountMemberProfile } from "src/modules/account-member-profile";

export default function AccountMemberProfilePage() {
  const { t } = useTranslation("common");

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`member-profile`} />
      <main>
        <HeaderSignIn
          classNameContainer="min-h-[125px] sm:min-h-0"
          title={t`member-profile`}
          hidden
        />
        <PageLayout>
          <div className="">
            <AccountMemberProfile />
          </div>
        </PageLayout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

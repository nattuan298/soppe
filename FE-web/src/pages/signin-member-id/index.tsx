import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useCallback, useState } from "react";
import { ClockBlack, LogoSuccessMore, Modal, PageLayout } from "src/components";
import { TopBarBack } from "src/components/topBarBack";
import { routeSigninBase } from "src/constants/routes";
import { SignInMemberIdForm } from "src/modules/auth";

export default function SigninMemberIdPage() {
  const { t } = useTranslation("common");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <div className="w-full">
      <NextSeo title={t`signin-member-id`} />
      <main>
        <TopBarBack url={routeSigninBase} />
        <PageLayout>
          <SignInMemberIdForm openModal={openModal} />
        </PageLayout>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          className="w-[355px] sm:w-96 h-auto rounded-2xl font-kanit"
        >
          <ul className="text-center">
            <li className="mt-6 mb-4 text-xl">{t`password_recovery`}</li>
            <li className="w-64 mx-auto text-sm mb-5">{t`please_contact_our_call`}</li>
            <LogoSuccessMore className="mx-auto mb-5" />
            <li className="flex flex-wrap justify-center mb-6">
              <img
                className="mr-1.5"
                alt="thailand flag"
                src="/assets/images/thailand_flag_icon.svg"
              />{" "}
              +66 (0) 2 - 511 - 5951
            </li>
            <li className="text-center mb-12 text-sm">
              <div className="items-center flex justify-center">
                <ClockBlack className="mr-2.5" />
                <p>{t`open`}</p>
              </div>
              <p>{t`wed`}</p>
            </li>
          </ul>
        </Modal>
      </main>
    </div>
  );
}
export async function getServerSideProps() {
  return {
    props: {},
  };
}

/* eslint-disable react/jsx-no-target-blank */
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingIndicator } from "src/components/animation/loading-indicator";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";

export default function ReferralLinkPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  // const ref = useRef<HTMLAnchorElement>(null);
  const [link, setLink] = useState<string>("");
  const { sponsorId, memberType, side } = router.query;
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      const callAPI = async () => {
        try {
          const res = await axios.get(
            `${apiRoute.members.generateDynamicLink}?memberType=${memberType}&side=${side}&sponsorId=${sponsorId}`,
          );
          setLink(res.data.shortLink);
          window.location.href = res.data.shortLink;
        } catch (e) {}
      };

      callAPI();
    } else {
      router.push(`/signup?sponsorId=${sponsorId}&memberType=${memberType}&side=${side}`);
    }
  }, [sponsorId, memberType, side, router]);

  // useEffect(() => {
  //   if (link && ref?.current) {
  //     ref.current?.click();
  //   }
  // }, [link, ref]);

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`invite_friend`} />
      <main className="h-96">
        {!link && (
          <div className="m-auto mt-12 flex items-center justify-center">
            <LoadingIndicator />
          </div>
        )}
        {/* <div className="mt-8 flex justify-center">
          <a ref={ref} href={link} className={`${!link ? "hidden" : ""}`}>
            Click to open
          </a>
        </div> */}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

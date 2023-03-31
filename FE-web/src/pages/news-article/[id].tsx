import { useMemo } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

import { BackIcon, PageLayout } from "src/components";
import ShareIcon from "src/components/svgs/share";
import axios from "src/lib/client/request";
import { NewsArticleModel } from "types/api-response-type";
import { Container } from "src/components/container";
import NewsBannerItem from "src/components/news-banners/news-banner-item";
import { notifyToast } from "src/constants/toast";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

const styleShare = {
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  padding: "6px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function NewsArcticlePage({ newsArcticle }: { newsArcticle: NewsArticleModel }) {
  const router = useRouter();
  const { t, lang } = useTranslation("common");
  const screen = useGetScreenWidth();
  const handleClickBack = () => {
    router.push("/news-article");
  };

  const handleClickShare = () => {
    if (window.location.href) {
      navigator.clipboard.writeText(window.location.href);
      notifyToast("default", "copy_success_article", t);
    }
  };

  const { content } = newsArcticle;
  const contentArticle = useMemo(() => {
    if (!content.en) {
      return content.th;
    }
    if (!content.th) {
      return content.en;
    }
    return lang === "en" ? content.en : content.th;
  }, [content, lang]);
  const heightBanner = useMemo(() => {
    if (screen === "Desktop") {
      return 600;
    }
    return 375;
  }, [screen]);
  return (
    <div className="w-full">
      <NextSeo title="News and Article" description="News and Article need for SEO" />
      <main className="w-full flex flex-wrap justify-center">
        <PageLayout>
          <div className="relative sm:pt-6 sm:pb-6 sm:max-w-[1216px] sm:w-[calc(100%-30px)] sm:mx-auto">
            <NewsBannerItem acticle={newsArcticle} height={heightBanner} />
            <div
              className="absolute top-10 left-10 opacity-80 sm:opacity-70 hover:cursor-pointer hover:opacity-80"
              onClick={handleClickBack}
            >
              <BackIcon />
            </div>
            <div
              className="absolute top-10 right-10 opacity-70 hover:cursor-pointer hover:opacity-80"
              onClick={handleClickShare}
            >
              <div style={styleShare}>
                <ShareIcon />
              </div>
            </div>
          </div>
          <Container>
            <div
              className="sm:py-6 mx-4 sm:mx-0 break-words	w-full text-brown mb-8 sm:mb-11"
              dangerouslySetInnerHTML={{
                __html: contentArticle || "",
              }}
            ></div>
          </Container>
        </PageLayout>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const { id } = params;
  let newsArcticle: NewsArticleModel | null = null;
  try {
    const respArticles = await axios.get(`/articles/${id}`);

    newsArcticle = respArticles.data;
  } catch (e) {
    console.error("Eror fetch api detail news: ", e);
  }

  if (newsArcticle) {
    return {
      props: {
        newsArcticle,
      },
    };
  }

  return {
    redirect: {
      permanent: true,
      destination: "/404",
    },
  };
}

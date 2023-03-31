import React, { useMemo } from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";

import { NewsActiclesBanner, PageLayout, SectionArcticleBanner } from "src/components";
import NoDataIcon from "src/components/svgs/no-data";
import { NewsArticleModel } from "types/api-response-type";
import { Container } from "src/components/container";
import axios from "src/lib/client/request";
import MoreArticles from "./more-articles";

interface PropsType {
  latestArticleSection: Array<NewsArticleModel>;
  tripPromotionSection: Array<NewsArticleModel>;
  trendingSection: Array<NewsArticleModel>;
}

export default function NewsArticlePage({
  latestArticleSection,
  tripPromotionSection,
  trendingSection,
}: PropsType) {
  const { t } = useTranslation("common");

  const existArticle = useMemo(() => {
    const existData = new Set(
      [...latestArticleSection, ...tripPromotionSection, ...trendingSection].map(({ _id }) => _id),
    );
    return [...existData];
  }, [latestArticleSection, trendingSection, tripPromotionSection]);

  if (
    latestArticleSection.length === 0 &&
    trendingSection.length === 0 &&
    tripPromotionSection.length === 0
  ) {
    return (
      <div className="w-full">
        <NextSeo title="News and Article" description="News and Article need for SEO" />
        <main className="w-full flex flex-wrap justify-center">
          <PageLayout>
            <Container>
              <div className="mt-40 mb-5 flex flex-col justify-center items-center">
                <NoDataIcon />
                <span className="mt-4">{t`no_data`}</span>
              </div>
            </Container>
          </PageLayout>
        </main>
      </div>
    );
  }
  return (
    <div className="w-full">
      <NextSeo title="News and Article" description="News and Article need for SEO" />
      <main className="w-full flex flex-wrap justify-center">
        <PageLayout>
          <div className="sm:pt-6 sm:pb-6 sm:max-w-[1216px] sm:w-[calc(100%-30px)] sm:mx-auto">
            <NewsActiclesBanner articles={latestArticleSection} />
          </div>
          <Container>
            <SectionArcticleBanner
              name={t`trip-promotion`}
              articles={tripPromotionSection}
              hasNextArrow
            />
            <SectionArcticleBanner
              name={t`trending-section`}
              articles={trendingSection}
              hasNextArrow
            />
            <MoreArticles existArticle={existArticle} />
          </Container>
        </PageLayout>
      </main>
    </div>
  );
}

const getTripPromotionArticles = async () => {
  let tripPromotionArticles = [];
  const now = new Date();
  try {
    const resp = await axios.get("/cats-article/travel-cats");
    if (!resp.data || resp.data.total === 0) {
      return [];
    }
    const category = resp.data;
    const respArticles = await axios.get(
      `/articles?page=1&pageSize=10&category=${category._id}&currentDate=${now.toISOString()}`,
    );
    // const respArticles = await axios.get(`/articles?page=1&pageSize=10&category=${category._id}`);
    tripPromotionArticles = respArticles.data.data;
  } catch (err) {}
  return tripPromotionArticles;
};

export const getServerSideProps: GetServerSideProps = async () => {
  let latestArticleSection = [];
  let trendingSection = [];

  const now = new Date();

  try {
    const resp = await axios.get(`/articles?page=1&pageSize=5&currentDate=${now.toISOString()}`);
    // const resp = await axios.get("/articles?page=1&pageSize=10");
    latestArticleSection = resp.data.data;
  } catch (err) {}

  const tripPromotionSection = await getTripPromotionArticles();

  try {
    const resp = await axios.get(
      `/articles?page=1&pageSize=10&currentDate=${now.toISOString()}&viewSort=true`,
    );
    // const resp = await axios.get("/articles?page=1&pageSize=10&viewSort=true");
    trendingSection = resp.data.data;
  } catch (err) {}

  // try {
  //   const resp = await axios.get(`/articles?page=1&pageSize=40&currentDate=${now.toISOString()}`);
  //   // const resp = await axios.get("/articles?page=1&pageSize=40");
  //   const data = resp.data.data as Array<NewsArticleModel>;
  //   const existData = new Set(
  //     [...latestArticleSection, ...tripPromotionSection, ...trendingSection].map(({ _id }) => _id),
  //   );
  //   moreArticlesSection = data.filter(({ _id }) => ![...existData].includes(_id)).slice(8);
  // } catch (err) {
  // }

  return {
    props: {
      latestArticleSection,
      tripPromotionSection,
      trendingSection,
    },
  };
};

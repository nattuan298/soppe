/* eslint-disable @typescript-eslint/no-explicit-any */
import orderBy from "lodash/orderBy";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { Fragment, useMemo } from "react";
import { BannerNoSSR, PageLayout, Products, SectionArcticleBanner, SeeAll } from "src/components";
import { Container } from "src/components/container";
import axios from "src/lib/client/request";

import { TemplateSection } from "src/modules/template-section";
import { getLocationBaseFromCookieSever, getMemberIDFromCookieSever } from "src/utils";
import { TemplateSections } from "types/api-response-type";
import useGetScreenWidth from "../hooks/useGetScreenWidth";

export default function Home({
  banners,
  products,
  articles,
  templateSections,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("common");
  const screen = useGetScreenWidth();
  const sectionsHome = useMemo(
    () => orderBy(templateSections, ["position"], ["asc"]),
    [templateSections],
  );
  console.log(products);
  return (
    <div className="w-full">
      <NextSeo
        title="SOPPE"
        description="Home desc need for SEO"
      />
      <main className="w-full flex flex-wrap justify-center">
        <PageLayout>
          <BannerNoSSR height={screen === "Desktop" ? 484 : 164} banners={banners} />
          <Container>

            {products.length > 0 && (
              <>
                <SeeAll
                  isFlashSale={false}
                  titleText={t`more_from_our_store`}
                  link="/products-listing"
                />
                <Products products={products} />{" "}
              </>
            )}
          </Container>
        </PageLayout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let banners = {};
  let products = []; // more from our store session
  const templateSections: never[] = [];
  const articles: never[] = [];

  const cookie = req.headers.cookie;
  const locationBase = getLocationBaseFromCookieSever(cookie);
  const memberIdCookies = getMemberIDFromCookieSever(cookie);
  try {
    const resp = await axios.get(`/banners?countryCode=${locationBase}`);
    banners = resp.data;
  } catch (err) {}

  try {
    const resp = await axios.get("/products?page=1&pageSize=10");
    products = resp.data.data;
  } catch (err: any) {
    console.log(err);
  }

  // try {
  //   const url = `/admin/home-templates/sections-list?countryCode=${locationBase}`;
  //   const resp = await axios.get(url);
  //   templateSections = resp.data;
  // } catch (err: any) {}

  // try {
  //   const now = new Date();
  //   const resp = await axios.get(`/articles?page=1&pageSize=10&currentDate=${now.toISOString()}`);
  //   // const resp = await axios.get("/articles?page=1&pageSize=10");
  //   articles = resp.data.data;
  // } catch (err) {}

  return {
    props: {
      banners,
      articles,
      products,
      templateSections,
    },
  };
};

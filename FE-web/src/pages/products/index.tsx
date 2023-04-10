import React from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import axios from "src/lib/client/request";
// import Link from "next/link";
import { Banner, Container, PageLayout, Products, SeeAll } from "src/components";

import { BannersType, ProductsType } from "types/api-response-type";
import { getLocationBaseFromCookieSever } from "src/utils";

export default function Home({
  banners,
  products,
}: {
  banners: BannersType;
  products: ProductsType;
}) {
  return (
    <div className="w-full">
      <NextSeo title="Home" description="Home desc need for SEO" />
      <main className="w-full flex flex-wrap justify-center">
        <PageLayout>
          <Banner height={484} banners={banners}></Banner>
          <Container>
            <SeeAll link="" isFlashSale={false} iconSrc="" titleText="Products" />
            <Products products={products} />
          </Container>
        </PageLayout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let banners = [];
  let products = []; // more from our store session
  try {
    const resp = await axios.get("/banners");
    banners = resp.data;
  } catch (err) {
    //
  }

  const cookie = req.headers.cookie;
  const locationBase = getLocationBaseFromCookieSever(cookie);

  try {
    const resp = await axios.get("/products?page=1&pageSize=10");
    products = resp.data.data;
  } catch (err) {
    //
  }

  return {
    props: {
      banners,
      products,
    },
  };
};

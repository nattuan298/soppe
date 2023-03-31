/* eslint-disable react/jsx-no-target-blank */
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PageLayout } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import { useLocationBase } from "src/hooks";
import axios from "src/lib/client/request";
import ProductDetail from "src/modules/product-detail";
import { RootState } from "src/state/store";
import { getLocationBaseFromCookieSever, getRandomProducts } from "src/utils";
import { ProductType } from "types/api-response-type";

export default function ProductDetailPage({
  productDetail,
  productCode,
}: {
  productDetail: ProductType;
  productCode: string;
}) {
  const [relatedProducts, setrelatedProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType>(productDetail);
  const { locationBase } = useLocationBase();
  const { userInfor } = useSelector((state: RootState) => state.user);
  // const ref = useRef<HTMLAnchorElement>(null);
  const [, setLink] = useState<string>("");
  const [, setIsMobile] = useState<boolean>(false);

  // get relatedProducts
  useEffect(() => {
    const getData = async () => {
      setrelatedProducts([]);
      const listProductRes = await axios.get(
        `${apiRoute.products.searchListProduct}?page=1&pageSize=100&countryCode=${locationBase}&category=${productDetail?.categoryId}&place=PRODUCT_LISTING`,
      );

      const data = listProductRes.data?.data || [];
      const dataLength = data.length;
      let result = data;

      if (dataLength > 5) {
        result = getRandomProducts({ products: data, number: 5 });
      }

      setrelatedProducts(result);
    };

    getData();
  }, [productDetail, locationBase]);

  useEffect(() => {
    setProduct(productDetail);
  }, [productDetail]);

  useEffect(() => {
    const callAPI = async (memberId: string) => {
      try {
        const res = await axios.get(
          `${apiRoute.products.getProductDetail}?countryCode=${locationBase}&productCode=${productCode}&memberId=${memberId}`,
        );

        const newProps = {
          isFavourite: res.data?.isFavourite || false,
          favouriteId: res.data?.favouriteId || null,
        };

        setProduct((preState) => ({ ...preState, ...newProps }));
      } catch (e) {
        console.error("Eror fetch api detail", e);
      }
    };

    if (productCode && userInfor) {
      callAPI(userInfor.memberId);
    }
  }, [productCode, locationBase, userInfor]);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      setIsMobile(true);
      const callAPI = async () => {
        try {
          const res = await axios.get(
            `${apiRoute.products.generateDynamicLink}?productCode=${productCode}&type=PRODUCT_DETAIL`,
          );
          setLink(res.data.shortLink);
        } catch (e) {}
      };

      callAPI();
    }
  }, [productCode]);

  // useEffect(() => {
  //   if (link && ref.current) {
  //     ref.current.click();
  //   }
  // }, [link]);

  // if (isMobile) {
  //   return (
  //     <main className="h-96">
  //       {!link && (
  //         <div className="m-auto mt-12 flex items-center justify-center">
  //           <LoadingIndicator />
  //         </div>
  //       )}

  //       <div className="mt-8 flex justify-center">
  //         {link && (
  //           <a ref={ref} href={link}>
  //             Click to open
  //           </a>
  //         )}
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={productDetail.productName} />
      <main>
        <PageLayout>
          <ProductDetail
            productDetail={product}
            relatedProducts={relatedProducts}
            setProduct={setProduct}
          />
        </PageLayout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params, query }) => {
  const id = params?.id;
  let productDetail: ProductType | null = null;
  const cookie = req.headers.cookie;
  const locationBase = getLocationBaseFromCookieSever(cookie);

  try {
    const ress = await axios.get(
      `${apiRoute.products.getProductDetail}?countryCode=${
        locationBase || query.locationBase
      }&productCode=${id}`,
    );

    productDetail = ress.data;
  } catch (e) {
    // console.error("Eror fetch api detail", e);
  }

  if (productDetail) {
    return {
      props: {
        productDetail,
        productCode: id,
      },
    };
  }

  return {
    redirect: {
      permanent: true,
      destination: "/404",
    },
  };
};

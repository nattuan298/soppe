import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import axiosCutome from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { ProductsType } from "types/api-response-type";
import { PageLayout, Products } from "src/components";
import NoDataIcon from "src/components/svgs/no-data";
import useTranslation from "next-translate/useTranslation";
import { Cookies } from "react-cookie";
import { CircularProgress } from "@material-ui/core";

export default function SectionProductList({ id }: { id: String }) {
  const { t } = useTranslation("common");
  const [products, setProducts] = useState<ProductsType>([]);
  const cookies = new Cookies();
  const member = cookies.get("member");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const callAPI = async () => {
      let response = null;
      if (member?.memberId) {
        response = await axiosCutome.get(
          `${apiRoute.templateSections.sectionItem}/${id}?memberId=${member.memberId}`,
        );
      } else {
        response = await axiosCutome.get(`${apiRoute.templateSections.sectionItemLink}/${id}`);
      }
      if (response && response.data && response.data.data) {
        setLoading(false);
        setProducts(response.data.data);
      }
    };
    callAPI();
  }, [id, member?.memberId]);

  return (
    <div className="w-full">
      <main className="w-full flex flex-wrap justify-center">
        <PageLayout className="mx-auto w-1216 my-8">
          {products.length === 0 ? (
            <div className="mt-12 mb-5 flex flex-col justify-center items-center">
              {!loading && (
                <>
                  <div>
                    <NoDataIcon />
                  </div>
                  <span className="mt-4">{t`no_data`}</span>
                </>
              )}
              {loading && (
                <div className="flex items-center justify-center w-full h-full">
                  <CircularProgress />
                </div>
              )}
            </div>
          ) : (
            <Products products={products} />
          )}
        </PageLayout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params && params.id) {
    const { id } = params;
    // try {
    //   const response = await axios.get(`${apiRoute.templateSections.sectionItem}/${params.id}`);
    //   if (response.data) {
    //     const products = response.data.data || [];
    //     return {
    //       props: {
    //         products,
    //       },
    //     };
    //   }
    // } catch (e) {}
    return {
      props: {
        id,
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
